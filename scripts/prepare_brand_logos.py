#!/usr/bin/env python3
"""Deterministically recover transparent official logos from flat composites.

The supplied artwork is never redrawn. Opaque source pixels are preserved, while
antialiased boundary pixels are de-matted against their known white or black
background using the nearest fully opaque source color.
"""

from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


BACKGROUND_DISTANCE = 2
EROSION_SIZE = 9
SAFE_MARGIN = 24


def foreground_mask(rgb: np.ndarray, background: int) -> np.ndarray:
    distance = np.max(np.abs(rgb.astype(np.int16) - background), axis=2)
    return distance > BACKGROUND_DISTANCE


def opaque_interior(mask: np.ndarray) -> np.ndarray:
    matte = Image.fromarray((mask * 255).astype(np.uint8), mode="L")
    return np.asarray(matte.filter(ImageFilter.MinFilter(EROSION_SIZE))) == 255


def nearest_interior_colors(rgb: np.ndarray, mask: np.ndarray, background: int) -> np.ndarray:
    """Propagate exact nearby opaque colors through only the antialiased edge."""
    interior = opaque_interior(mask)
    height, width = mask.shape
    source_y = np.full((height, width), -1, dtype=np.int32)
    source_x = np.full((height, width), -1, dtype=np.int32)
    queue: deque[tuple[int, int]] = deque()

    for y, x in np.argwhere(interior):
        source_y[y, x] = y
        source_x[y, x] = x
        queue.append((y, x))

    neighbors = ((-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1))
    while queue:
        y, x = queue.popleft()
        for dy, dx in neighbors:
            ny, nx = y + dy, x + dx
            if 0 <= ny < height and 0 <= nx < width and mask[ny, nx] and source_y[ny, nx] < 0:
                source_y[ny, nx] = source_y[y, x]
                source_x[ny, nx] = source_x[y, x]
                queue.append((ny, nx))

    # Very thin official letter strokes may not survive the conservative
    # erosion. Recover each such connected component from its highest-contrast
    # source pixels, then propagate those exact colors through the component.
    remaining = mask & (source_y < 0)
    visited = np.zeros_like(mask)
    distance = np.max(np.abs(rgb.astype(np.int16) - background), axis=2)
    for start_y, start_x in np.argwhere(remaining):
        if visited[start_y, start_x]:
            continue
        component: list[tuple[int, int]] = []
        component_queue = deque([(int(start_y), int(start_x))])
        visited[start_y, start_x] = True
        while component_queue:
            y, x = component_queue.popleft()
            component.append((y, x))
            for dy, dx in neighbors:
                ny, nx = y + dy, x + dx
                if 0 <= ny < height and 0 <= nx < width and remaining[ny, nx] and not visited[ny, nx]:
                    visited[ny, nx] = True
                    component_queue.append((ny, nx))

        strongest = max(distance[y, x] for y, x in component)
        if strongest < 48:
            for y, x in component:
                mask[y, x] = False
            continue
        recovery_queue: deque[tuple[int, int]] = deque()
        for y, x in component:
            if distance[y, x] >= strongest - 1:
                source_y[y, x] = y
                source_x[y, x] = x
                recovery_queue.append((y, x))
        while recovery_queue:
            y, x = recovery_queue.popleft()
            for dy, dx in neighbors:
                ny, nx = y + dy, x + dx
                if 0 <= ny < height and 0 <= nx < width and remaining[ny, nx] and source_y[ny, nx] < 0:
                    source_y[ny, nx] = source_y[y, x]
                    source_x[ny, nx] = source_x[y, x]
                    recovery_queue.append((ny, nx))

    colors = np.zeros_like(rgb)
    active = np.where(mask)
    colors[active] = rgb[source_y[active], source_x[active]]
    return colors


def dematte(rgb: np.ndarray, background: int) -> tuple[np.ndarray, np.ndarray]:
    mask = foreground_mask(rgb, background)
    colors = nearest_interior_colors(rgb, mask, background)

    observed = rgb.astype(np.float32) - float(background)
    foreground = colors.astype(np.float32) - float(background)
    denominator = np.sum(foreground * foreground, axis=2)
    numerator = np.sum(observed * foreground, axis=2)
    alpha = np.divide(numerator, denominator, out=np.zeros_like(numerator), where=denominator > 0)
    alpha = np.clip(alpha, 0.0, 1.0)
    alpha[opaque_interior(mask)] = 1.0
    alpha[~mask] = 0.0
    if background == 0:
        # The dark source contains no legitimate near-black foreground: its
        # wordmark is white and its mark is green. Remove residual black matte
        # samples without touching either official foreground color family.
        black_matte = np.max(colors, axis=2) < 90
        alpha[black_matte] = 0.0
        mask[black_matte] = False
    alpha[alpha < (1.0 / 255.0)] = 0.0

    rgba = np.zeros((*rgb.shape[:2], 4), dtype=np.uint8)
    rgba[:, :, :3] = colors
    rgba[:, :, 3] = np.rint(alpha * 255.0).astype(np.uint8)
    rgba[rgba[:, :, 3] == 0, :3] = 0
    return rgba, mask


def crop_bounds(mask: np.ndarray, margin: int) -> tuple[int, int, int, int]:
    ys, xs = np.where(mask)
    if not len(xs):
        raise RuntimeError("No foreground artwork was detected.")
    height, width = mask.shape
    return (
        max(0, int(xs.min()) - margin),
        max(0, int(ys.min()) - margin),
        min(width, int(xs.max()) + 1 + margin),
        min(height, int(ys.max()) + 1 + margin),
    )


def composite_error(original: np.ndarray, rgba: np.ndarray, background: int, mask: np.ndarray) -> tuple[float, float]:
    alpha = rgba[:, :, 3:4].astype(np.float32) / 255.0
    reconstructed = rgba[:, :, :3].astype(np.float32) * alpha + float(background) * (1.0 - alpha)
    error = np.abs(reconstructed - original.astype(np.float32))[mask]
    return float(error.mean()), float(np.percentile(error, 99))


def make_qa_sheet(light_logo: Image.Image, dark_logo: Image.Image, output: Path) -> None:
    backgrounds = [("White", "#ffffff"), ("Cream", "#fbf7ee"), ("Forest", "#153828"), ("Near black", "#0b110d")]
    cell_width, cell_height = 520, 350
    sheet = Image.new("RGB", (cell_width * 4, cell_height * 2), "white")
    draw = ImageDraw.Draw(sheet)

    for row, (name, logo) in enumerate((("Light-surface asset", light_logo), ("Dark-surface asset", dark_logo))):
        for column, (surface, color) in enumerate(backgrounds):
            cell = Image.new("RGBA", (cell_width, cell_height), color)
            fitted = logo.copy()
            fitted.thumbnail((450, 275), Image.Resampling.LANCZOS)
            position = ((cell_width - fitted.width) // 2, (cell_height - fitted.height) // 2 + 10)
            cell.alpha_composite(fitted, position)
            sheet.paste(cell.convert("RGB"), (column * cell_width, row * cell_height))
            label_color = "#17221b" if surface in {"White", "Cream"} else "#fffaf0"
            draw.text((column * cell_width + 14, row * cell_height + 12), f"{name} · {surface}", fill=label_color)

    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--light-source", required=True)
    parser.add_argument("--dark-source", required=True)
    parser.add_argument("--out-dir", required=True)
    parser.add_argument("--qa-sheet")
    args = parser.parse_args()

    light_source = np.asarray(Image.open(args.light_source).convert("RGB"))
    dark_source = np.asarray(Image.open(args.dark_source).convert("RGB"))
    if light_source.shape != dark_source.shape:
        raise RuntimeError("The supplied official logo variants must share the same dimensions.")

    light_rgba, light_mask = dematte(light_source, 255)
    dark_rgba, dark_mask = dematte(dark_source, 0)
    bounds = crop_bounds(light_mask | dark_mask, SAFE_MARGIN)

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    light_path = out_dir / "one-small-seed-logo-light-surface.png"
    dark_path = out_dir / "one-small-seed-logo-dark-surface.png"
    light_image = Image.fromarray(light_rgba, mode="RGBA").crop(bounds)
    dark_image = Image.fromarray(dark_rgba, mode="RGBA").crop(bounds)
    light_image.save(light_path, optimize=True)
    dark_image.save(dark_path, optimize=True)

    light_mean, light_p99 = composite_error(light_source, light_rgba, 255, light_mask)
    dark_mean, dark_p99 = composite_error(dark_source, dark_rgba, 0, dark_mask)
    print(f"Crop bounds: {bounds}")
    print(f"Output dimensions: {light_image.width}x{light_image.height}")
    print(f"Light-source reconstruction error: mean={light_mean:.3f}, p99={light_p99:.3f}")
    print(f"Dark-source reconstruction error: mean={dark_mean:.3f}, p99={dark_p99:.3f}")
    print(f"Wrote {light_path}")
    print(f"Wrote {dark_path}")

    if args.qa_sheet:
        make_qa_sheet(light_image, dark_image, Path(args.qa_sheet))
        print(f"Wrote {args.qa_sheet}")


if __name__ == "__main__":
    main()

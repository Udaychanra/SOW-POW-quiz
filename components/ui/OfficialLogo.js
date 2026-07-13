import Image from "next/image";

const logoAssets = {
  dark: "/brand/one-small-seed-logo-dark-surface.png",
  light: "/brand/one-small-seed-logo-light-surface.png",
};

export default function OfficialLogo({
  surface = "dark",
  priority = false,
  className = "",
  sizes = "96px",
}) {
  return (
    <Image
      src={logoAssets[surface] || logoAssets.dark}
      alt="One Small Seed"
      width={1279}
      height={860}
      preload={priority}
      loading="eager"
      sizes={sizes}
      className={className}
    />
  );
}

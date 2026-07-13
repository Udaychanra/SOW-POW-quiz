const iconShell = (stage, label, paths) => `
  <svg class="stage-icon stage-icon--${stage}" viewBox="0 0 120 120" role="img" aria-labelledby="stage-icon-${stage}-title" xmlns="http://www.w3.org/2000/svg">
    <title id="stage-icon-${stage}-title">${label}</title>
    <circle cx="60" cy="60" r="48" fill="#F7F3EB" stroke="#E8DFD1" stroke-width="2" />
    <g fill="none" stroke="#1F4D3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      ${paths}
    </g>
  </svg>`;

export const STAGE_ICONS = {
  0: iconShell(0, "Prepared soil with a resting seed", `
    <path d="M28 76c11-8 53-8 64 0" />
    <path d="M34 84c14-6 38-6 52 0" stroke="#C8A96B" />
    <path d="M60 71c-8-5-9-15 0-20 9 5 8 15 0 20Z" />`),
  1: iconShell(1, "Protected roots and shield", `
    <path d="M60 28c8 7 17 9 25 10v18c0 18-10 29-25 36-15-7-25-18-25-36V38c8-1 17-3 25-10Z" />
    <path d="M60 43v35M60 55l-12-8M60 62l13-9M60 70l-10 9M60 71l10 8" stroke="#C8A96B" />`),
  2: iconShell(2, "House and strong foundation", `
    <path d="M28 56 60 30l32 26" />
    <path d="M36 53v31h48V53" />
    <path d="M52 84V65h16v19" stroke="#C8A96B" />
    <path d="M30 91h60" />`),
  3: iconShell(3, "Water droplet feeding roots", `
    <path d="M60 24c-9 13-17 23-17 34a17 17 0 0 0 34 0c0-11-8-21-17-34Z" stroke="#C8A96B" />
    <path d="M60 75v17M60 82l-12 10M60 82l12 10M60 88l-6 7M60 88l6 7" />`),
  4: iconShell(4, "Shield protecting the harvest", `
    <path d="M60 27c9 8 19 10 28 11v18c0 19-11 30-28 37-17-7-28-18-28-37V38c9-1 19-3 28-11Z" />
    <path d="M60 74V45M60 53c-8 0-13-5-14-11 8 0 13 4 14 11ZM60 61c8 0 13-5 14-11-8 0-13 4-14 11ZM60 69c-8 0-13-5-14-11 8 0 13 4 14 11Z" stroke="#C8A96B" />`),
  5: iconShell(5, "Elegant open gates", `
    <path d="M25 91V39h25v52M70 91V39h25v52" />
    <path d="M50 45 32 53v32l18 6M70 45l18 8v32l-18 6" stroke="#C8A96B" />
    <path d="M56 88h8" />`),
  6: iconShell(6, "Legacy book, quill, and mature tree", `
    <path d="M28 82c12-4 22-2 32 5 10-7 20-9 32-5V43c-12-4-22-2-32 5-10-7-20-9-32-5v39Z" />
    <path d="M60 48v39" stroke="#C8A96B" />
    <path d="M67 69c11-7 17-18 17-31-13 4-21 13-22 27M66 66l15-18" />`),
};

export function getStageIcon(stageNumber) {
  return STAGE_ICONS[stageNumber] ?? STAGE_ICONS[0];
}

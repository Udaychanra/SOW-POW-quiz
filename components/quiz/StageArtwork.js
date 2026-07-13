const landscapeLabels = [
  "Prepared ground with a resting seed",
  "Protected soil with early roots",
  "A home supported by a strong foundation",
  "Water nourishing a growing rooted tree",
  "A mature tree protected for the harvest",
  "Open gates leading toward wider opportunity",
  "A mature legacy tree sending seeds forward",
];

function LandscapeTree({ x = 330, y = 164, mature = false }) {
  const scale = mature ? 1.18 : .86;
  return <g className="landscape-tree" transform={`translate(${x} ${y}) scale(${scale})`}><path className="landscape-trunk" d="M0 3V-54m0 22-20-18m20 8 24-24"/><g className="landscape-canopy"><circle cx="-26" cy="-63" r="25"/><circle cx="0" cy="-79" r="31"/><circle cx="28" cy="-62" r="27"/><circle cx="1" cy="-50" r="30"/></g><path className="landscape-roots" d="M0 2c-13 7-24 11-37 13M0 2c12 7 26 11 42 13M0 2l-7 17M0 2l9 17"/></g>;
}

function StageScene({ stage }) {
  if (stage === 0) return <g className="landscape-scene landscape-scene--seed"><path className="landscape-soil-line" d="M118 164c83-25 182-23 282 1M150 181c72-18 164-18 236 0"/><g className="landscape-resting-seed" transform="translate(259 156) rotate(-18)"><path d="M0 0c-13-8-15-22-2-29 13 8 15 21 2 29Z"/><path d="M-1-24v19"/></g><path className="landscape-gold-line" d="M246 190c10-6 20-6 30 0"/></g>;
  if (stage === 1) return <g className="landscape-scene landscape-scene--secure"><path className="landscape-soil-line" d="M110 165c96-23 200-23 300 0"/><path className="landscape-roots" d="M260 151v42m0-26-32 24m32-17 34 20m-34-9-12 17m12-17 13 18"/><path className="landscape-shield" d="M260 72c26 22 49 24 69 29v36c0 40-25 64-69 81-44-17-69-41-69-81v-36c20-5 43-7 69-29Z"/><g className="landscape-lock" transform="translate(260 118)"><rect x="-17" y="-3" width="34" height="27" rx="6"/><path d="M-10-3v-9a10 10 0 0 1 20 0v9M0 7v8"/></g></g>;
  if (stage === 2) return <g className="landscape-scene landscape-scene--home"><path className="landscape-foundation" d="M156 177h209M177 190h168"/><g className="landscape-house" transform="translate(260 164)"><path className="landscape-roof" d="m-74-51 74-57 74 57"/><path d="M-57-60V7H57v-67M-16 7v-42h32V7M-42-34h18v19h-18M25-34h18v19H25"/></g><path className="landscape-roots" d="M260 171v28m0-14-42 17m42-17 42 17m-42-6-17 15m17-15 17 15"/></g>;
  if (stage === 3) return <g className="landscape-scene landscape-scene--water"><LandscapeTree x={315} y={170}/><g className="landscape-drop" transform="translate(165 96)"><path d="M0-34c-21 29-31 44-31 61a31 31 0 0 0 62 0C31 10 21-5 0-34Z"/><path d="M-17 27c3 10 9 16 18 18"/></g><g className="landscape-ripple" transform="translate(165 170)"><ellipse rx="51" ry="10"/><ellipse rx="31" ry="6"/></g><path className="landscape-water-line" d="M180 173c43 8 69 5 102-2"/></g>;
  if (stage === 4) return <g className="landscape-scene landscape-scene--harvest"><LandscapeTree x={270} y={174} mature/><path className="landscape-shield landscape-shield--harvest" d="M270 56c43 31 80 33 109 42v43c0 35-29 58-109 83-80-25-109-48-109-83V98c29-9 66-11 109-42Z"/><g className="landscape-harvest" transform="translate(405 165)"><path d="M0 0v-36m0 10c-14 0-23-9-25-21 15 0 23 8 25 21Zm0-7c14 0 23-9 25-21-15 0-23 8-25 21Z"/></g></g>;
  if (stage === 5) return <g className="landscape-scene landscape-scene--gates"><path className="landscape-open-path" d="M260 214c-26-33-35-61-24-84 8-17 19-31 24-52 5 21 16 35 24 52 11 23 2 51-24 84Z"/><g className="landscape-gate landscape-gate-left" transform="translate(181 170)"><path d="M0 24V-62h44v86M44-49 12-37v49l32 12"/></g><g className="landscape-gate landscape-gate-right" transform="translate(295 170)"><path d="M44 24V-62H0v86M0-49l32 12v49L0 24"/></g><path className="landscape-gold-line" d="M204 195c38-11 74-11 112 0"/><circle className="landscape-distant-tree" cx="260" cy="70" r="22"/><path className="landscape-distant-trunk" d="M260 91v27"/></g>;
  return <g className="landscape-scene landscape-scene--legacy"><LandscapeTree x={260} y={176} mature/><path className="landscape-book" d="M68 180c54-16 101-11 145 18 44-29 91-34 145-18v31c-54-16-101-11-145 18-44-29-91-34-145-18v-31ZM213 198v31"/><g className="landscape-legacy-seeds"><path d="M352 73c-10-7-12-18-2-24 10 6 12 17 2 24Z"/><path d="M392 99c-8-6-10-15-2-20 9 5 10 14 2 20Z"/><path d="M421 62c-7-5-8-13-1-17 7 4 8 12 1 17Z"/></g><path className="landscape-gold-line" d="M355 76c28 4 45 2 65-11"/></g>;
}

export default function StageArtwork({ stage }) {
  const safeStage = Math.max(0, Math.min(6, Number(stage) || 0));
  const titleId = `stage-landscape-${safeStage}-title`;
  return (
    <div className={`results-emoji stage-landscape-frame stage-landscape-frame--${safeStage}`}>
      <svg className={`stage-landscape stage-landscape--${safeStage}`} viewBox="0 0 520 230" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{landscapeLabels[safeStage]}</title>
        <defs><linearGradient id={`stage-sky-${safeStage}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fffdf8"/><stop offset="1" stopColor="#f2eadc"/></linearGradient><linearGradient id={`stage-path-${safeStage}`} x1="0" x2="1"><stop offset="0" stopColor="#ddc48d"/><stop offset="1" stopColor="#fbf7ee"/></linearGradient></defs>
        <rect width="520" height="230" rx="18" fill={`url(#stage-sky-${safeStage})`}/>
        <circle className="landscape-sun" cx="427" cy="46" r="23"/>
        <path className="landscape-hill landscape-hill--back" d="M0 143c85-54 170-48 255-6 88 44 174 41 265-18v111H0V143Z"/>
        <path className="landscape-hill landscape-hill--front" d="M0 177c86-37 168-29 254 8 92 39 179 28 266-18v63H0v-53Z"/>
        <path className="landscape-base-path" d="M232 230c34-32 47-57 38-78-8-18-22-27-20-47" stroke={`url(#stage-path-${safeStage})`}/>
        <StageScene stage={safeStage}/>
      </svg>
    </div>
  );
}

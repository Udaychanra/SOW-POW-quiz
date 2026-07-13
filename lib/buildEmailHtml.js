import { PARTS, PARTS_ORDER, getStageByNumber } from "../quizData.js";

/**
 * Builds luxury HTML for SOW POW stage result emails (server-side only).
 * @param {object} payload - Output from prepareEmailPayload()
 * @returns {string}
 */
export function buildEmailHtml(payload) {
  const canonicalStage = getStageByNumber(payload.stage?.num);
  const firstName = escapeHtml(payload.recipient?.firstName || "Friend");
  const stageName = escapeHtml(canonicalStage.name);
  const phase = escapeHtml(canonicalStage.phase);
  const stageNum = canonicalStage.num;
  const range = escapeHtml(canonicalStage.range);
  const headline = escapeHtml(payload.content?.headline || "");
  const description = escapeHtml(payload.content?.description || "");
  const focus = escapeHtml(payload.content?.focus || "");
  const episode = escapeHtml(payload.content?.episode || "");
  const episodeUrl = normalizeUrl(payload.content?.episodeLink);
  const episodeLinkLabel = escapeHtml(
    payload.content?.episodeLink?.replace(/^https?:\/\//, "") || "youtube.com/@1smallseed"
  );
  const directionalPriority = escapeHtml(payload.content?.directionalPriority || "");
  const fiveParts = PARTS_ORDER.map((partKey) => {
    const status = canonicalStage.fivePartsStatuses[partKey];
    const label = status === "priority" ? "Focus Here" : status === "active" ? "Active" : "Building";
    return `${PARTS[partKey].icon} ${PARTS[partKey].label} — ${PARTS[partKey].desc}: ${label}`;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your SOW POW Stage</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F3EB;font-family:Manrope,'Segoe UI',Helvetica,Arial,sans-serif;color:#1B1B1B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F7F3EB;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#FDFBF7;border-radius:28px;overflow:hidden;box-shadow:0 24px 64px rgba(27,27,27,0.06);">
          <tr>
            <td style="background:linear-gradient(135deg,#1F4D3A 0%,#163828 100%);padding:36px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#D4BC8A;">One Small Seed</p>
              <h1 style="margin:0;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:32px;font-weight:600;line-height:1.2;color:#F7F3EB;">${firstName}, your SOW POW stage awaits.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#C8A96B;">${phase} · Stage ${stageNum} · ${range}</p>
              <h2 style="margin:0 0 8px;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:26px;font-weight:600;color:#1F4D3A;">${stageName}</h2>
              <p style="margin:0 0 24px;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:20px;font-style:italic;line-height:1.4;color:#1B1B1B;">${headline}</p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#1B1B1B;">${description}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;background-color:#F0E9DE;border-radius:18px;border-left:4px solid #C8A96B;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#1F4D3A;">Your focus this week</p>
                    <p style="margin:0;font-size:14px;line-height:1.65;color:#1B1B1B;">${focus}</p>
                    ${directionalPriority ? `<p style="margin:14px 0 0;font-size:14px;line-height:1.65;color:#1B1B1B;"><strong>Directional priority:</strong> ${directionalPriority}</p>` : ""}
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6B6B6B;">Your Five Parts Picture</p>
              <p style="margin:0 0 24px;font-size:14px;line-height:1.75;color:#1B1B1B;">${fiveParts.map(escapeHtml).join("<br />")}</p>
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6B6B6B;">Recommended listening</p>
              <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#1F4D3A;">${episode}</p>
              <a href="${episodeUrl}" style="font-size:14px;color:#C8A96B;text-decoration:underline;">${episodeLinkLabel}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;text-align:center;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#6B6B6B;">Follow <a href="https://youtube.com/@1smallseed" style="color:#1F4D3A;font-weight:600;text-decoration:none;">@1smallseed</a> for everything that comes next.</p>
              <p style="margin:16px 0 0;font-size:11px;color:#6B6B6B;">© One Small Seed · SOW POW Framework</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeUrl(url) {
  if (!url || typeof url !== "string") {
    return "https://youtube.com/@1smallseed";
  }
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

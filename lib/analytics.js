const ALLOWED_METADATA = new Set([
  "page",
  "section",
  "label",
  "card_id",
  "topic_slug",
  "video_id",
  "video_position",
  "destination_type",
  "device_category",
  "destination",
  "status",
]);

export const ANALYTICS_PROVIDER_STATUS = "disabled-no-approved-provider";

function sanitizeMetadata(metadata) {
  if (!metadata || typeof metadata !== "object") return {};

  return Object.fromEntries(Object.entries(metadata).flatMap(([key, value]) => {
    if (!ALLOWED_METADATA.has(key)) return [];
    if (!["string", "number", "boolean"].includes(typeof value)) return [];
    const cleanValue = typeof value === "string" ? value.slice(0, 120) : value;
    return [[key, cleanValue]];
  }));
}

export function trackEvent(eventName, metadata = {}) {
  try {
    if (typeof window === "undefined" || typeof eventName !== "string" || !/^[a-z0-9_]{3,80}$/.test(eventName)) return;

    const provider = window.__oneSmallSeedAnalytics;
    if (!provider || typeof provider.track !== "function") return;

    provider.track(eventName, sanitizeMetadata(metadata));
  } catch {
    // Analytics must never interrupt navigation, forms or rendering.
  }
}

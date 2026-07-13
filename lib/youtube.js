import "server-only";

export const YOUTUBE_CHANNEL_ID = "UCTgDuyIY5ZgZpacONJcMIWw";
export const YOUTUBE_CHANNEL_URL = "https://youtube.com/@1smallseed?si=BfWLRPS93nc_bKVl";
export const YOUTUBE_REVALIDATE_SECONDS = 21600;

const API_BASE = "https://www.googleapis.com/youtube/v3";
let warnedAboutMissingKey = false;
let warnedAboutApiFailure = false;

function getApiKey() {
  const key = process.env.YOUTUBE_API_KEY?.trim();
  if (!key && !warnedAboutMissingKey) {
    warnedAboutMissingKey = true;
    console.warn("[One Small Seed] YOUTUBE_API_KEY is not configured; the Resources page will show its safe YouTube fallback.");
  }
  return key || null;
}

async function youtubeRequest(resource, parameters, apiKey) {
  const url = new URL(`${API_BASE}/${resource}`);
  for (const [name, value] of Object.entries(parameters)) url.searchParams.set(name, String(value));
  url.searchParams.set("key", apiKey);
  const response = await fetch(url, { next: { revalidate: YOUTUBE_REVALIDATE_SECONDS, tags: ["one-small-seed-youtube"] } });
  if (!response.ok) throw new Error(`YouTube Data API returned status ${response.status}`);
  return response.json();
}

export async function getChannelUploadsPlaylistId(apiKey = getApiKey()) {
  if (!apiKey) return null;
  const data = await youtubeRequest("channels", { part: "contentDetails", id: YOUTUBE_CHANNEL_ID }, apiKey);
  const channel = data.items?.[0];
  if (!channel || channel.id !== YOUTUBE_CHANNEL_ID) throw new Error("The configured YouTube channel could not be verified.");
  return channel.contentDetails?.relatedPlaylists?.uploads || null;
}

function selectThumbnail(thumbnails = {}) {
  for (const quality of ["maxres", "standard", "high", "medium", "default"]) {
    if (thumbnails[quality]?.url) return thumbnails[quality].url;
  }
  return "/site/youtube-fallback.svg";
}

function summarizeDescription(value = "", maximum = 220) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= maximum) return clean;
  const shortened = clean.slice(0, maximum);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > 140 ? boundary : maximum).trim()}…`;
}

export function normalizeYouTubeVideo(item) {
  const snippet = item?.snippet || {};
  const id = item?.contentDetails?.videoId || snippet?.resourceId?.videoId;
  if (!id || !snippet.title || ["Private video", "Deleted video"].includes(snippet.title)) return null;
  return {
    id,
    title: snippet.title,
    description: summarizeDescription(snippet.description),
    publishedAt: item.contentDetails?.videoPublishedAt || snippet.publishedAt,
    thumbnailUrl: selectThumbnail(snippet.thumbnails),
    videoUrl: `https://www.youtube.com/watch?v=${id}`,
    channelTitle: snippet.channelTitle || "1 Small Seed",
  };
}

export async function getLatestChannelVideos() {
  const apiKey = getApiKey();
  if (!apiKey) return { videos: [], uploadsPlaylistId: null };
  try {
    const uploadsPlaylistId = await getChannelUploadsPlaylistId(apiKey);
    if (!uploadsPlaylistId) throw new Error("The uploads playlist was not returned by YouTube.");
    const data = await youtubeRequest("playlistItems", { part: "snippet,contentDetails", playlistId: uploadsPlaylistId, maxResults: 6 }, apiKey);
    const videos = (data.items || []).map(normalizeYouTubeVideo).filter(Boolean).slice(0, 6);
    return { videos, uploadsPlaylistId };
  } catch {
    if (!warnedAboutApiFailure) {
      warnedAboutApiFailure = true;
      console.warn("[One Small Seed] YouTube uploads could not be refreshed; the Resources page will show its safe fallback.");
    }
    return { videos: [], uploadsPlaylistId: null };
  }
}

export function formatYouTubeDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

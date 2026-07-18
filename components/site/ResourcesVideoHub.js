import { formatYouTubeDate, getLatestChannelVideos } from "../../lib/youtube.js";
import ResourcesTopicExplorer from "./ResourcesTopicExplorer.js";

export default async function ResourcesVideoHub() {
  const { videos } = await getLatestChannelVideos();
  const preparedVideos = videos.map((video) => ({
    ...video,
    description: video.description.replace(/\[cite:\s*\d+\]/gi, "").replace(/\s+/g, " ").trim(),
    publishedLabel: formatYouTubeDate(video.publishedAt),
  }));

  return <ResourcesTopicExplorer videos={preparedVideos} />;
}

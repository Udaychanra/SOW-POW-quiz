"use client";

import { useEffect } from "react";
import { trackEvent } from "../../lib/analytics.js";

const DATASET_METADATA = {
  analyticsPage: "page",
  analyticsSection: "section",
  analyticsLabel: "label",
  analyticsCardId: "card_id",
  analyticsTopicSlug: "topic_slug",
  analyticsVideoId: "video_id",
  analyticsVideoPosition: "video_position",
  analyticsDestinationType: "destination_type",
  analyticsDestination: "destination",
  analyticsStatus: "status",
};

export default function AnalyticsEvents() {
  useEffect(() => {
    function trackClick(event) {
      const target = event.target instanceof Element ? event.target.closest("[data-analytics-event]") : null;
      if (!target) return;

      const metadata = {};
      Object.entries(DATASET_METADATA).forEach(([datasetKey, metadataKey]) => {
        if (target.dataset[datasetKey]) metadata[metadataKey] = target.dataset[datasetKey];
      });
      trackEvent(target.dataset.analyticsEvent, metadata);
    }

    document.addEventListener("click", trackClick, { capture: true });
    return () => document.removeEventListener("click", trackClick, { capture: true });
  }, []);

  return null;
}

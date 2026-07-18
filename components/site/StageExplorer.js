"use client";

import { useState } from "react";
import { stages } from "../../content/site-content.js";
import { trackEvent } from "../../lib/analytics.js";
import FrameworkIcon from "./FrameworkIcon.js";
import IconMedallion from "./IconMedallion.js";
import styles from "./site.module.css";

const themes = [
  "Clarify the ground before building.",
  "Create stability that future decisions can rely on.",
  "Build the structure that supports ownership and growth.",
  "Develop systems that support liquidity and momentum.",
  "Protect what has already been built.",
  "Create access and systems beyond one person.",
  "Prepare what should continue beyond you.",
];

export default function StageExplorer() {
  const [openStage, setOpenStage] = useState(null);

  const toggleStage = (stageNumber) => {
    if (openStage !== stageNumber) trackEvent("sow_method_stage_expanded", { page: "sow_method", card_id: `stage-${stageNumber}` });
    setOpenStage(openStage === stageNumber ? null : stageNumber);
  };

  return (
    <div className={styles.stageExplorer}>
      {stages.map((stage, index) => {
        const isOpen = openStage === stage.number;
        const triggerId = `sow-stage-trigger-${stage.number}`;
        const panelId = `sow-stage-panel-${stage.number}`;

        return (
          <article className={`${styles.stageExplorerItem}${isOpen ? ` ${styles.stageExplorerItemOpen}` : ""}`} key={stage.number}>
            <h3>
              <button
                id={triggerId}
                type="button"
                className={styles.stageExplorerTrigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleStage(stage.number)}
              >
                <IconMedallion tone={index % 2 ? "gold" : "sage"} size="small">
                  <FrameworkIcon name={stage.icon} label="" />
                </IconMedallion>
                <span className={styles.stageExplorerLabel}>
                  <small>Stage {stage.number}</small>
                  <strong>{stage.name}</strong>
                  <span>{themes[index]}</span>
                </span>
                <span className={styles.stageExplorerChevron} aria-hidden="true">+</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={styles.stageExplorerPanel}
              hidden={!isOpen}
            >
              <p>{stage.short}</p>
              <small>Educational overview only. Your assessment result provides a more relevant starting point than self-diagnosis.</small>
            </div>
          </article>
        );
      })}
    </div>
  );
}

import AnalyticsEvents from "../../components/site/AnalyticsEvents.js";
import SiteFooter from "../../components/site/SiteFooter.js";
import SiteHeader from "../../components/site/SiteHeader.js";
import SitePageTransition from "../../components/site/SitePageTransition.js";
import styles from "../../components/site/site.module.css";

export default function SiteLayout({ children }) {
  return (
    <div className={styles.shell}>
      <AnalyticsEvents />
      <a className={styles.skipLink} href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" className={styles.main} tabIndex="-1"><SitePageTransition>{children}</SitePageTransition></main>
      <SiteFooter />
    </div>
  );
}

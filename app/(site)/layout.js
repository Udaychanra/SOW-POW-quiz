import SiteFooter from "../../components/site/SiteFooter.js";
import SiteHeader from "../../components/site/SiteHeader.js";
import SitePageTransition from "../../components/site/SitePageTransition.js";
import styles from "../../components/site/site.module.css";

export default function SiteLayout({ children }) {
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.main}><SitePageTransition>{children}</SitePageTransition></main>
      <SiteFooter />
    </div>
  );
}

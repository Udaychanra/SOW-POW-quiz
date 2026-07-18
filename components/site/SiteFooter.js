import Link from "next/link";
import SiteLogo from "./SiteLogo.js";
import styles from "./site.module.css";

const groups = [
  ["Explore", [["Home", "/"], ["SOW Method", "/sow-method"], ["SOW POW Quiz", "/sow-pow-quiz"], ["Resources", "/resources"], ["About", "/about"]]],
  ["Work With Us", [["Services", "/licensed-services"], ["Contact", "/contact"]]],
  ["Legal", [["Disclosures", "/disclosures"]]],
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}><SiteLogo surface="dark" className={styles.footerLogo} /><p>Educational guidance for clearer financial questions, thoughtful protection and decisions that consider the next generation.</p></div>
        {groups.map(([title, links]) => <div key={title} className={styles.footerGroup}><h2>{title}</h2>{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>)}
      </div>
      <div className={styles.footerBottom}>Educational content only. Licensed services are available only where properly licensed.</div>
    </footer>
  );
}

/**
 * About page — mobile navigation only (no quiz logic).
 */
(function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener("click", function () {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  siteNav.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  });
})();

// Navbar scroll behavior - transparent at top, solid when scrolled
const header = document.querySelector(".site-header");
const heroSection = document.querySelector(".hero-section");

function updateNavbar() {
  if (!header) return;
  const currentScroll = window.pageYOffset;
  if (currentScroll > 0) {
    header.classList.remove("in-hero");
    header.classList.add("scrolled");
  } else {
    header.classList.add("in-hero");
    header.classList.remove("scrolled");
  }
}

if (header) {
  if (!heroSection) {
    header.classList.remove("in-hero");
    header.classList.add("scrolled");
  } else {
    updateNavbar();
    window.addEventListener("scroll", updateNavbar);
  }
}

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
    closeDropdown();
  });
}

// All Pages dropdown
const dropdownTrigger = document.querySelector(".nav-dropdown-trigger");
const dropdown = document.getElementById("nav-dropdown");

function openDropdown() {
  if (!dropdown || !dropdownTrigger) return;
  dropdown.classList.add("is-open");
  dropdownTrigger.setAttribute("aria-expanded", "true");
}

function closeDropdown() {
  if (!dropdown || !dropdownTrigger) return;
  dropdown.classList.remove("is-open");
  dropdownTrigger.setAttribute("aria-expanded", "false");
}

if (dropdownTrigger && dropdown) {
  dropdownTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains("is-open");
    if (isOpen) closeDropdown();
    else openDropdown();
  });

  document.addEventListener("click", () => closeDropdown());
  dropdown.addEventListener("click", (e) => e.stopPropagation());

  dropdown.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeDropdown();
      if (header && header.classList.contains("nav-open")) header.classList.remove("nav-open");
    });
  });
}

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (header && header.classList.contains("nav-open")) header.classList.remove("nav-open");
  });
});

// Footer dropdowns: desktop always open, mobile accordion (one open at a time)
const footerDropdowns = document.querySelectorAll(".footer-dropdown");
const FOOTER_DROPDOWN_BREAKPOINT = 768;

function updateFooterDropdowns() {
  if (!footerDropdowns.length) return;
  const isDesktop = window.innerWidth > FOOTER_DROPDOWN_BREAKPOINT;
  footerDropdowns.forEach((el) => {
    if (isDesktop) {
      el.setAttribute("open", "");
    } else {
      el.removeAttribute("open");
    }
  });
}

if (footerDropdowns.length) {
  updateFooterDropdowns();
  window.addEventListener("resize", updateFooterDropdowns);

  footerDropdowns.forEach((details) => {
    details.addEventListener("toggle", () => {
      if (window.innerWidth > FOOTER_DROPDOWN_BREAKPOINT) return;
      if (details.open) {
        footerDropdowns.forEach((other) => {
          if (other !== details) other.removeAttribute("open");
        });
      }
    });
  });
}

// Scroll-triggered fade-in sections
const fadeSections = document.querySelectorAll(".fade-section");

if ("IntersectionObserver" in window && fadeSections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
        else entry.target.classList.remove("is-visible");
      });
    },
    { threshold: 0.2 }
  );
  fadeSections.forEach((section) => observer.observe(section));
} else {
  fadeSections.forEach((section) => section.classList.add("is-visible"));
}

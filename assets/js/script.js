document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = document.querySelectorAll("[data-nav] a");
const copyButton = document.querySelector("[data-copy-email]");
const copyFeedback = document.querySelector("[data-copy-feedback]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeNavigation() {
  navToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
  navToggle.setAttribute("aria-expanded", String(willOpen));
  nav.classList.toggle("is-open", willOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeNavigation));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

const revealElements = document.querySelectorAll("[data-reveal]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

copyButton?.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  if (!email) return;

  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = "Email berhasil disalin.";
  } catch {
    copyFeedback.textContent = `Salin email ini: ${email}`;
  }

  window.setTimeout(() => {
    copyFeedback.textContent = "";
  }, 3500);
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

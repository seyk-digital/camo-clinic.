const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion) {
  document.documentElement.classList.add("motion-ready");

  const revealTargets = document.querySelectorAll(
    ".intro-copy, .intro-aside, .section-heading, .procedure-card, .materials-photo, .materials-copy, .story-aside, .story-copy, .approach-title, .approach-items article, .contact > *",
  );
  revealTargets.forEach((element) => element.setAttribute("data-reveal", ""));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);
  let progressTicking = false;
  const updateProgress = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
    progressTicking = false;
  };
  window.addEventListener("scroll", () => {
    if (!progressTicking) {
      window.requestAnimationFrame(updateProgress);
      progressTicking = true;
    }
  }, { passive: true });
  updateProgress();
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      menuButton.focus();
    }
  });
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

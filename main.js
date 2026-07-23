// ============================================================
// BINGE BAKERY — shared behaviour
// ============================================================

// Loader: hides after ~1.7s or on window load, whichever is later (capped ~2s)
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    const hide = () => loader.classList.add("done");
    const minTimer = new Promise(res => setTimeout(res, 1500));
    const pageReady = new Promise(res => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", res, { once: true });
    });
    Promise.race([
      Promise.all([minTimer, pageReady]),
      new Promise(res => setTimeout(res, 2000)) // hard cap
    ]).then(hide);
  }

  // Nav toggle (mobile)
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("nav.primary-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("is-open");
      links.classList.toggle("open");
      document.body.style.overflow = links.classList.contains("open") ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        toggle.classList.remove("is-open");
        links.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  // Footer year
  document.querySelectorAll(".year").forEach(el => (el.textContent = new Date().getFullYear()));
});

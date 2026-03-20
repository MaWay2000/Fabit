const revealItems = document.querySelectorAll("[data-reveal]");
const hero = document.querySelector(".hero");
const footerYear = document.getElementById("footerYear");

function setupReveal() {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealInView = (item) => {
    const rect = item.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16
    }
  );

  revealItems.forEach((item) => {
    if (revealInView(item)) {
      item.classList.add("is-visible");
      return;
    }

    observer.observe(item);
  });
}

function setupHeroGlow() {
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    hero.style.setProperty("--pointer-x", `${x}%`);
    hero.style.setProperty("--pointer-y", `${y}%`);
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.removeProperty("--pointer-x");
    hero.style.removeProperty("--pointer-y");
  });
}

function setFooterYear() {
  if (!footerYear) {
    return;
  }

  footerYear.textContent = String(new Date().getFullYear());
}

setupReveal();
setupHeroGlow();
setFooterYear();

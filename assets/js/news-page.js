(() => {
  const items = [...document.querySelectorAll("[data-news-reveal]")];
  if (!items.length) return;

  items.forEach((item, index) => {
    item.classList.add("news-reveal");
    item.style.setProperty("--news-reveal-delay", `${Math.min(index % 4, 3) * 65}ms`);
  });

  const showAll = () => items.forEach(item => item.classList.add("is-visible"));
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

  items.forEach(item => observer.observe(item));
})();
(() => {
  const navButtons = Array.from(document.querySelectorAll(".nav-btn"));
  const scrollButtons = Array.from(document.querySelectorAll("[data-scroll]"));
  const searchInput = document.getElementById("moduleSearch");
  const panels = Array.from(document.querySelectorAll(".panel"));
  const tabs = Array.from(document.querySelectorAll(".tab-btn"));
  const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

  const sections = navButtons
    .map((button) => document.querySelector(button.dataset.scroll))
    .filter(Boolean);

  function normalizeText(value) {
    return (value || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function safeQuery(selector) {
    try {
      return document.querySelector(selector);
    } catch {
      return null;
    }
  }

  function setActiveNav(selector) {
    navButtons.forEach((button) => {
      const active = button.dataset.scroll === selector;
      button.classList.toggle("active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function scrollToTarget(selector, updateHash = true) {
    const target = safeQuery(selector);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNav(selector);

    if (updateHash && history.replaceState) {
      history.replaceState(null, "", selector);
    }
  }

  function bindScrollButtons() {
    scrollButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        scrollToTarget(button.dataset.scroll);
      });
    });
  }

  function bindSearch() {
    if (!searchInput) return;
    searchInput.setAttribute("autocomplete", "off");

    searchInput.addEventListener("input", (event) => {
      const query = normalizeText(event.target.value);

      navButtons.forEach((button) => {
        const haystack = normalizeText(`${button.textContent} ${button.dataset.tags || ""}`);
        button.classList.toggle("hidden", query && !haystack.includes(query));
      });
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        searchInput.value = "";
        navButtons.forEach((button) => button.classList.remove("hidden"));
        searchInput.blur();
      }
    });
  }

  function bindTabs() {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((item) => item.classList.toggle("active", item === tab));
        tabPanels.forEach((panel) => panel.classList.toggle("active", panel.id === target));
      });
    });
  }

  function bindObserver() {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        setActiveNav(`#${visible[0].target.id}`);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.05, 0.25, 0.45] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function revealPanels() {
    panels.forEach((panel, index) => {
      panel.style.opacity = "0";
      panel.style.transform = "translateY(10px)";
      setTimeout(() => {
        panel.style.transition = "opacity .45s ease, transform .45s ease";
        panel.style.opacity = "1";
        panel.style.transform = "translateY(0)";
      }, 35 * index);
    });
  }

  function initDeepLink() {
    const hash = window.location.hash;
    if (hash && safeQuery(hash)) {
      setTimeout(() => scrollToTarget(hash, false), 100);
    } else if (navButtons[0]) {
      setActiveNav(navButtons[0].dataset.scroll);
    }
  }

  function initKeyboard() {
    document.addEventListener("keydown", (event) => {
      const target = document.activeElement;
      const typing = target && ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (typing) return;

      if (event.key === "/" && searchInput) {
        event.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  function init() {
    bindScrollButtons();
    bindSearch();
    bindTabs();
    bindObserver();
    initDeepLink();
    initKeyboard();
    revealPanels();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


(function () {
  const body = document.body;
  if (!body) return;

  const storageKey = "mindfulfit-theme";
  const button = document.querySelector("[data-theme-toggle]");
  if (!button) return;

  const iconNode = button.querySelector(".theme-toggle__icon");
  const labelNode = button.querySelector(".theme-toggle__label");

  const applyTheme = (theme) => {
    body.dataset.theme = theme;
    const isLight = theme === "light";
    button.setAttribute("aria-pressed", String(isLight));
    if (iconNode) iconNode.textContent = isLight ? "☀" : "☾";
    if (labelNode) labelNode.textContent = isLight ? "Light mode" : "Dark mode";
  };

  const savedTheme = localStorage.getItem(storageKey);
  applyTheme(savedTheme === "light" ? "light" : "dark");

  button.addEventListener("click", () => {
    const nextTheme = body.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });
})();

(() => {
  "use strict";
  const gate = document.getElementById("meridian-gate");
  if (!gate) throw new Error("WP003A_GATE_MISSING");
  const heading = document.createElement("h2");
  heading.textContent = "Loader OK";
  const detail = document.createElement("p");
  detail.textContent = "wp003a-v1 · Kiểm tra UTF-8: tiếng Việt — ✓";
  gate.replaceChildren(heading, detail);
  gate.dataset.wp003aRevision = "wp003a-v1";
  gate.dataset.wp003aComplete = "true";
})();

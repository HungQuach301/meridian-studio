(() => {
  "use strict";

  const repository = "HungQuach301/meridian-studio";
  const path = "pipeline/state.json";
  const revision = "wp004-v1";
  const shaPattern = /^[a-f0-9]{40}$/;
  const gate = document.getElementById("meridian-gate");
  const sourceCommit = document.getElementById("meridian-ref")?.value.trim();
  const codeBlob = document.getElementById("meridian-blob")?.value.trim();
  if (!gate || !shaPattern.test(sourceCommit ?? "") || !shaPattern.test(codeBlob ?? "")) {
    throw new Error("WP003_BOOT_SOURCE");
  }
  if (gate.dataset.wp003Mounted === "true") throw new Error("WP003_ALREADY_MOUNTED");

  const maxStateBytes = 1024 * 1024;
  const maxEnvelopeBytes = 2 * 1024 * 1024;
  const timeoutMs = 15000;
  // These values describe the existing Engine contract, not channel content.
  const stages = new Set(["S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S09.5",
    "S10", "S11", "S11.5", "S12", "S13", "S14a", "S14b", "S14c", "S14d", "done"]);
  const statuses = new Set(["idle", "running", "awaiting-gate", "blocked", "failed", "done"]);
  const messages = {
    INPUT: "Nhập token chỉ Contents read vào Settings. Chưa gửi request.",
    ENVIRONMENT: "Môi trường chưa đủ khả năng đọc và kiểm tra dữ liệu. Chưa gửi request.",
    FETCH: "Không tải được state hoặc redirect bị chặn. Chưa đủ bằng chứng kết luận CORS/CSP.",
    TIMEOUT: "Hết 15 giây đọc state. Không tự gửi lại request.",
    RESPONSE: "Phản hồi không đúng file, đường dẫn, encoding hoặc kích thước.",
    SIZE: "Phản hồi vượt giới hạn tải: state 1 MiB, phần bọc API 2 MiB.",
    DECODE: "Base64 hoặc UTF-8 của state không hợp lệ.",
    INTEGRITY: "Bytes state không khớp blob SHA trong phản hồi GitHub.",
    JSON: "Nội dung state không phải JSON hợp lệ.",
    DATA: "Các trường dùng cho giao diện không phù hợp contract pipeline state.",
    CANCELLED: "Phiên đọc đã kết thúc. Không tự gửi lại request.",
    INTERNAL: "Không hoàn tất được lượt đọc. Dừng và đối chiếu bằng chứng.",
  };
  const fail = (code) => { throw new Error(code); };
  const element = (tag, text, id) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (id) node.id = id;
    return node;
  };
  const app = element("section", undefined, "meridian-cockpit");
  app.setAttribute("aria-label", "Cockpit Meridian");
  const style = element("style", [
    "#meridian-cockpit { margin-top: 1rem; }",
    "#meridian-cockpit .wp003-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: .75rem; }",
    "#meridian-cockpit .wp003-summary > div { padding: .75rem; border: 1px solid; border-radius: .35rem; }",
    "#meridian-cockpit dd { margin: .35rem 0 0; overflow-wrap: anywhere; }",
    "#meridian-cockpit dt { font-weight: 600; }",
    "#meridian-cockpit .wp003-table { overflow-x: auto; }",
    "#meridian-cockpit table { border-collapse: collapse; width: 100%; }",
    "#meridian-cockpit th, #meridian-cockpit td { border-bottom: 1px solid; padding: .65rem .4rem; text-align: left; overflow-wrap: anywhere; }",
    "#meridian-cockpit caption { text-align: left; font-weight: 600; padding: .5rem 0; }",
    "#meridian-cockpit details { margin: 1rem 0; }",
    "#meridian-cockpit summary { cursor: pointer; }",
    "#meridian-cockpit pre { font-size: .85rem; }",
    "#meridian-cockpit button:disabled { cursor: default; }",
  ].join("\n"));
  const heading = element("h2", "Meridian Studio · Cockpit");
  const subtitle = element("p", revision + " · Đọc snapshot và gửi một hello khi được duyệt.");
  const status = element("p", "Giao diện sẵn sàng. Chưa tải dữ liệu.", "wp003-status");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  app.dataset.state = "WP003_READY";

  const settings = element("details");
  settings.open = true;
  const settingsTitle = element("summary", "Settings · Đọc state");
  const form = element("form", undefined, "wp003-state-form");
  form.setAttribute("autocomplete", "off");
  const instructions = element("p", "Nhập lại token chỉ Contents read của Meridian. Token chỉ dùng trong bộ nhớ cho một lượt đọc đã được duyệt.");
  const label = element("label", "Token đọc state");
  label.setAttribute("for", "wp003-state-token");
  const tokenInput = element("input", undefined, "wp003-state-token");
  tokenInput.type = "password";
  tokenInput.setAttribute("autocomplete", "off");
  tokenInput.spellcheck = false;
  tokenInput.value = "";
  const button = element("button", "Đọc state");
  button.type = "submit";
  form.append(instructions, label, tokenInput, button);
  settings.append(settingsTitle, form);

  const summary = element("dl");
  summary.className = "wp003-summary";
  const monthly = element("dd", "Chưa tải dữ liệu", "wp003-monthly-spend");
  const updated = element("dd", "Chưa tải dữ liệu", "wp003-updated-at");
  for (const [title, value] of [["Chi phí tháng (USD)", monthly], ["Cập nhật theo state", updated]]) {
    const card = element("div");
    card.append(element("dt", title), value);
    summary.append(card);
  }
  const tableContainer = element("div");
  tableContainer.className = "wp003-table";
  const table = element("table");
  const caption = element("caption", "Episode · Chưa tải dữ liệu");
  const tableHead = element("thead");
  const headerRow = element("tr");
  for (const title of ["ID episode", "Stage", "Status", "Chi phí (USD)"]) {
    const cell = element("th", title);
    cell.scope = "col";
    headerRow.append(cell);
  }
  tableHead.append(headerRow);
  const tableBody = element("tbody", undefined, "wp003-episodes");
  const placeholder = (text) => {
    const row = element("tr");
    const cell = element("td", text);
    cell.colSpan = 4;
    row.append(cell);
    tableBody.replaceChildren(row);
  };
  placeholder("Chưa tải dữ liệu");
  table.append(caption, tableHead, tableBody);
  tableContainer.append(table);

  const source = element("details");
  const sourceTitle = element("summary", "Nguồn snapshot và bằng chứng lượt đọc");
  const binding = element("pre", "Repository: " + repository + "\nCommit: " + sourceCommit +
    "\nBlob Cockpit: " + codeBlob + "\nState: " + path);
  const evidence = element("pre", "Chưa gửi request đọc state.", "wp003-evidence");
  evidence.setAttribute("aria-label", "Bằng chứng không chứa token");
  source.append(sourceTitle, binding, evidence);
  app.append(style, heading, subtitle, status, settings, summary, tableContainer, source);
  gate.replaceChildren(app);

  const setStatus = (code, text) => {
    app.dataset.state = code;
    status.textContent = code + ": " + text;
  };
  const report = (row) => { evidence.textContent += JSON.stringify(row) + "\n"; };
  const hex = (buffer) => Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
  const has = (value, key) => Object.hasOwn(value, key);
  const money = (value) => value === undefined ? "Chưa có dữ liệu" :
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  function validTimestamp(value) {
    if (typeof value !== "string") return false;
    const match = /^(\d{4})-(\d{2})-(\d{2})[tT\s](\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:[zZ]|([+-])(\d{2})(?::?(\d{2}))?)$/.exec(value);
    if (!match) return false;
    const [, yearText, monthText, dayText, hourText, minuteText, secondText, sign, zoneHourText, zoneMinuteText] = match;
    const [year, month, day, hour, minute, second] = [yearText, monthText, dayText, hourText, minuteText, secondText].map(Number);
    const zoneHour = Number(zoneHourText ?? 0);
    const zoneMinute = Number(zoneMinuteText ?? 0);
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month < 1 || month > 12 || day < 1 || day > days[month - 1] ||
        hour > 23 || minute > 59 || second > 60 || zoneHour > 23 || zoneMinute > 59) return false;
    const offset = (sign === "-" ? -1 : 1) * (zoneHour * 60 + zoneMinute);
    const utcMinute = ((hour * 60 + minute - offset) % 1440 + 1440) % 1440;
    return second < 60 || utcMinute === 1439;
  }

  // Validate only the displayed projection; repository CI remains the full schema validator.
  function validateDisplay(data) {
    if (!object(data) || !has(data, "updatedAt") || !validTimestamp(data.updatedAt) ||
        !has(data, "episodes") || !Array.isArray(data.episodes)) fail("DATA");
    if (has(data, "monthlySpendUsd") && (typeof data.monthlySpendUsd !== "number" || !Number.isFinite(data.monthlySpendUsd))) fail("DATA");
    for (const episode of data.episodes) {
      if (!object(episode) || !has(episode, "episodeId") || typeof episode.episodeId !== "string" ||
          !has(episode, "stage") || !stages.has(episode.stage) || !has(episode, "status") || !statuses.has(episode.status)) fail("DATA");
      if (has(episode, "spendUsd") && (typeof episode.spendUsd !== "number" || !Number.isFinite(episode.spendUsd))) fail("DATA");
    }
  }

  async function readEnvelope(response, signal) {
    if (!response.body || typeof response.body.getReader !== "function") fail("RESPONSE");
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8", { fatal: true });
    let bytesRead = 0;
    let text = "";
    let complete = false;
    try {
      while (true) {
        const chunk = await reader.read();
        if (signal.aborted) fail("TIMEOUT");
        if (chunk.done) break;
        if (!(chunk.value instanceof Uint8Array)) fail("RESPONSE");
        bytesRead += chunk.value.byteLength;
        if (bytesRead > maxEnvelopeBytes) fail("SIZE");
        try { text += decoder.decode(chunk.value, { stream: true }); } catch { fail("RESPONSE"); }
      }
      try { text += decoder.decode(); } catch { fail("RESPONSE"); }
      complete = true;
    } finally {
      if (!complete) { try { await reader.cancel(); } catch { /* Do not expose stream errors. */ } }
      reader.releaseLock();
    }
    try { return JSON.parse(text); } catch { fail("RESPONSE"); }
  }

  async function decodeState(file) {
    if (!object(file) || file.type !== "file" || file.path !== path || file.encoding !== "base64" ||
        !shaPattern.test(file.sha ?? "") || !Number.isInteger(file.size) || file.size < 1 || typeof file.content !== "string") fail("RESPONSE");
    if (file.size > maxStateBytes || file.content.length > maxEnvelopeBytes) fail("SIZE");
    const encoded = file.content.replace(/\s/g, "");
    if (encoded.length > 4 * Math.ceil(maxStateBytes / 3)) fail("SIZE");
    if (encoded.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) fail("DECODE");
    let bytes;
    let text;
    try {
      const decoded = atob(encoded);
      if (btoa(decoded) !== encoded) fail("DECODE");
      bytes = Uint8Array.from(decoded, (character) => character.charCodeAt(0));
      // Reject a leading BOM before decoding can hide bytes outside updatedAt.
      if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) fail("DECODE");
      text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch { fail("DECODE"); }
    if (bytes.length !== file.size) fail("RESPONSE");
    const header = new TextEncoder().encode("blob " + bytes.length + "\0");
    const gitBytes = new Uint8Array(header.length + bytes.length);
    gitBytes.set(header);
    gitBytes.set(bytes, header.length);
    const blob = hex(await crypto.subtle.digest("SHA-1", gitBytes));
    if (blob !== file.sha) fail("INTEGRITY");
    const sha256 = hex(await crypto.subtle.digest("SHA-256", bytes));
    let data;
    try { data = JSON.parse(text); } catch { fail("JSON"); }
    validateDisplay(data);
    return { data, blob, sha256, bytes: bytes.length, text };
  }

  function renderState(data) {
    const rows = document.createDocumentFragment();
    for (const episode of data.episodes) {
      const row = element("tr");
      for (const value of [episode.episodeId, episode.stage, episode.status, money(episode.spendUsd)]) row.append(element("td", value));
      rows.append(row);
    }
    const time = element("time", data.updatedAt);
    time.dateTime = data.updatedAt;
    monthly.textContent = money(data.monthlySpendUsd);
    updated.replaceChildren(time);
    caption.textContent = "Episode · " + data.episodes.length;
    if (data.episodes.length === 0) placeholder("Chưa có episode");
    else tableBody.replaceChildren(rows);
  }

  let initialSnapshot = null;
  let dispatchAttempted = false;
  let dispatchAccepted = false;
  let resultAttempted = false;
  let requestId = "";
  let dispatchController = null;
  let resultController = null;
  const api = "https://api.github.com/repos/" + repository;
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  const operationMessages = {
    INPUT: "Thiếu token hoặc SHA hợp lệ. Chưa gửi request.",
    ENVIRONMENT: "Môi trường chưa đủ khả năng thực hiện. Chưa gửi request.",
    MAIN_RESPONSE: "Phản hồi main không hợp lệ. Chưa gửi POST.",
    MAIN_MOVED: "Main khác commit mã đã duyệt. Chưa gửi POST; dừng và đối soát lại.",
    RESULT_COMMIT: "Commit kết quả không khớp SHA, parent nguồn, bot, message hoặc phạm vi một file state.",
    RESULT_BLOB: "Blob state không khớp file trong commit kết quả.",
    RESULT_DELTA: "Kết quả không chỉ đổi updatedAt hoặc timestamp không tăng. Giữ bảng snapshot nguồn.",
    FETCH: "Request thất bại hoặc redirect bị chặn. Chưa đủ bằng chứng kết luận CORS/CSP.",
    TIMEOUT: "Hết 15 giây cho thao tác. Không tự gửi lại request.",
    CANCELLED: "Phiên đã kết thúc. Không tự gửi lại request.",
    INTERNAL: "Không hoàn tất thao tác. Dừng và đối chiếu bằng chứng.",
  };
  const dispatchPanel = element("section", undefined, "wp004-dispatch-panel");
  dispatchPanel.setAttribute("aria-label", "Gửi hello đã được duyệt");
  const dispatchStatus = element("p", "Đọc snapshot nguồn trước khi gửi hello.", "wp004-dispatch-status");
  dispatchStatus.setAttribute("role", "status");
  dispatchStatus.setAttribute("aria-live", "polite");
  dispatchPanel.dataset.state = "WP004_NEEDS_SNAPSHOT";
  const dispatchForm = element("form", undefined, "wp004-dispatch-form");
  dispatchForm.setAttribute("autocomplete", "off");
  const dispatchLabel = element("label", "Token dispatch riêng · chỉ Meridian, Contents read and write");
  dispatchLabel.setAttribute("for", "wp004-dispatch-token");
  const dispatchTokenInput = element("input", undefined, "wp004-dispatch-token");
  dispatchTokenInput.type = "password";
  dispatchTokenInput.setAttribute("autocomplete", "off");
  dispatchTokenInput.spellcheck = false;
  dispatchTokenInput.disabled = true;
  const dispatchButton = element("button", "Gửi hello · một lần", "wp004-dispatch-button");
  dispatchButton.type = "submit";
  dispatchButton.disabled = true;
  dispatchForm.append(dispatchLabel, dispatchTokenInput, dispatchButton);
  const dispatchEvidence = element("pre", "Chưa gửi request.", "wp004-dispatch-evidence");
  dispatchEvidence.setAttribute("aria-label", "Bằng chứng dispatch không chứa token");
  dispatchPanel.append(element("h3", "Gửi hello"), element("p",
    "Chỉ bấm sau phê duyệt lượt thật. Một hello yêu cầu GitHub Actions ghi heartbeat, chỉ đổi updatedAt; không tạo episode hoặc gọi provider."),
    element("pre", "Repository: " + repository + "\nMain phải bằng: " + sourceCommit),
    dispatchStatus, dispatchForm, dispatchEvidence);

  const resultPanel = element("section", undefined, "wp004-result-panel");
  resultPanel.setAttribute("aria-label", "Đọc kết quả heartbeat");
  resultPanel.dataset.state = "WP004_WAITING_DISPATCH";
  const resultStatus = element("p", "Chưa gửi hello hoặc chưa có HTTP 204.", "wp004-result-status");
  resultStatus.setAttribute("role", "status");
  resultStatus.setAttribute("aria-live", "polite");
  const resultForm = element("form", undefined, "wp004-result-form");
  resultForm.setAttribute("autocomplete", "off");
  const resultShaLabel = element("label", "Commit heartbeat H do agent đã đối soát với request ID");
  resultShaLabel.setAttribute("for", "wp004-result-sha");
  const resultShaInput = element("input", undefined, "wp004-result-sha");
  resultShaInput.type = "text";
  resultShaInput.maxLength = 40;
  resultShaInput.spellcheck = false;
  resultShaInput.setAttribute("autocomplete", "off");
  resultShaInput.disabled = true;
  const resultTokenLabel = element("label", "Token đọc kết quả · chỉ Contents read");
  resultTokenLabel.setAttribute("for", "wp004-result-token");
  const resultTokenInput = element("input", undefined, "wp004-result-token");
  resultTokenInput.type = "password";
  resultTokenInput.spellcheck = false;
  resultTokenInput.setAttribute("autocomplete", "off");
  resultTokenInput.disabled = true;
  const resultButton = element("button", "Đọc kết quả · một lần", "wp004-result-button");
  resultButton.type = "submit";
  resultButton.disabled = true;
  resultForm.append(resultShaLabel, resultShaInput, resultTokenLabel, resultTokenInput, resultButton);
  const resultEvidence = element("pre", "Chưa đọc kết quả.", "wp004-result-evidence");
  resultEvidence.setAttribute("aria-label", "Bằng chứng kết quả không chứa token");
  resultPanel.append(element("h3", "Đọc kết quả heartbeat"), element("p",
    "Giữ trang mở. Agent kiểm run nhận, request ID và commit trên GitHub rồi cung cấp H. Nhập H và token đọc riêng; không reload hoặc gửi lại hello."),
    resultStatus, resultForm, resultEvidence);
  app.append(dispatchPanel, resultPanel);

  const setOperation = (panel, node, code, text) => {
    panel.dataset.state = "WP004_" + code;
    node.textContent = "WP004_" + code + ": " + text;
  };
  const operationReport = (node, row) => { node.textContent += JSON.stringify(row) + "\n"; };
  const tokenValid = (token) => token.length > 0 && /^[\x21-\x7e]+$/.test(token);
  const readyEnvironment = () => window.isSecureContext && window.crypto?.subtle &&
    typeof fetch === "function" && typeof AbortController === "function" &&
    typeof TextEncoder === "function" && typeof TextDecoder === "function" &&
    typeof atob === "function" && typeof btoa === "function";
  const assertActive = (signal) => {
    if (!active) fail("CANCELLED");
    if (signal.aborted) fail("TIMEOUT");
  };
  const safeOperationError = (error, signal) => {
    const code = !active ? "CANCELLED" : signal.aborted ? "TIMEOUT" : error instanceof Error ? error.message : "INTERNAL";
    return /^HTTP_[1-5][0-9]{2}$/.test(code) || has(operationMessages, code) || has(messages, code) ? code : "INTERNAL";
  };
  const operationErrorText = (code) => /^HTTP_/.test(code) ?
    "GitHub trả HTTP không đạt. Dừng và đối chiếu lịch sử; không tự đổi quyền hoặc gửi lại." :
    operationMessages[code] ?? messages[code] ?? operationMessages.INTERNAL;

  async function getOperationJson(url, token, signal, output, step) {
    let response;
    try {
      assertActive(signal);
      try {
        const pending = fetch(url, {
          method: "GET", mode: "cors", credentials: "omit", cache: "no-store", redirect: "error", referrerPolicy: "no-referrer",
          headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" }, signal,
        });
        token = "";
        response = await pending;
      } catch { fail(signal.aborted ? "TIMEOUT" : "FETCH"); }
      assertActive(signal);
      if (!Number.isInteger(response.status) || response.status < 100 || response.status > 599) fail("RESPONSE");
      operationReport(output, { step, httpStatus: response.status });
      if (response.status !== 200) fail("HTTP_" + response.status);
      let value;
      try { value = await readEnvelope(response, signal); }
      catch (error) {
        assertActive(signal);
        if (error instanceof Error && ["SIZE", "RESPONSE"].includes(error.message)) throw error;
        fail("RESPONSE");
      }
      assertActive(signal);
      return value;
    } finally { token = ""; }
  }

  // JSON.parse has validated syntax. Locate only the root timestamp string token;
  // compare all other source text verbatim, including unknown fields and numbers.
  function timestampSpan(text) {
    let depth = 0;
    const spans = [];
    const afterSpace = (start) => { while (/\s/.test(text[start] ?? "") && start < text.length) start++; return start; };
    const stringEnd = (start) => {
      let end = start + 1;
      while (end < text.length) {
        if (text[end] === "\\") { end += 2; continue; }
        if (text[end] === '"') return end + 1;
        end++;
      }
      fail("RESULT_DELTA");
    };
    for (let index = 0; index < text.length; index++) {
      const character = text[index];
      if (character === "{" || character === "[") depth++;
      else if (character === "}" || character === "]") depth--;
      else if (character === '"') {
        const end = stringEnd(index);
        const colon = afterSpace(end);
        if (depth === 1 && text[colon] === ":" && JSON.parse(text.slice(index, end)) === "updatedAt") {
          const start = afterSpace(colon + 1);
          if (text[start] !== '"') fail("RESULT_DELTA");
          spans.push({ start, end: stringEnd(start) });
        }
        index = end - 1;
      }
    }
    if (spans.length !== 1) fail("RESULT_DELTA");
    return spans[0];
  }

  function verifyResultDelta(before, after) {
    const oldSpan = timestampSpan(before.text);
    const newSpan = timestampSpan(after.text);
    const oldTime = Date.parse(before.data.updatedAt);
    const newTime = Date.parse(after.data.updatedAt);
    if (!Number.isFinite(oldTime) || !Number.isFinite(newTime) || newTime <= oldTime ||
        before.text.slice(0, oldSpan.start) !== after.text.slice(0, newSpan.start) ||
        before.text.slice(oldSpan.end) !== after.text.slice(newSpan.end)) fail("RESULT_DELTA");
  }

  function resultCommitBlob(commit, resultSha) {
    const bot = (identity) => object(identity) && identity.name === "github-actions[bot]" &&
      identity.email === "41898282+github-actions[bot]@users.noreply.github.com";
    if (!object(commit) || commit.sha !== resultSha || !Array.isArray(commit.parents) || commit.parents.length !== 1 ||
        commit.parents[0]?.sha !== sourceCommit || !object(commit.commit) || commit.commit.message !== "chore: heartbeat" ||
        !bot(commit.commit.author) || !bot(commit.commit.committer) || !Array.isArray(commit.files) || commit.files.length !== 1) fail("RESULT_COMMIT");
    const file = commit.files[0];
    if (!object(file) || file.filename !== path || file.status !== "modified" ||
        has(file, "previous_filename") || typeof file.sha !== "string" || file.sha.length !== 40 || !shaPattern.test(file.sha)) fail("RESULT_COMMIT");
    return file.sha;
  }

  dispatchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!active || !initialSnapshot || dispatchAttempted) { dispatchTokenInput.value = ""; return; }
    let token = dispatchTokenInput.value.trim();
    dispatchTokenInput.value = "";
    if (!tokenValid(token)) {
      token = "";
      setOperation(dispatchPanel, dispatchStatus, "INPUT", operationMessages.INPUT);
      return;
    }
    if (!readyEnvironment() || typeof crypto.randomUUID !== "function") {
      token = "";
      setOperation(dispatchPanel, dispatchStatus, "ENVIRONMENT", operationMessages.ENVIRONMENT);
      return;
    }
    try { requestId = crypto.randomUUID(); } catch { requestId = ""; }
    if (typeof requestId !== "string" || requestId.length !== 36 || !uuidPattern.test(requestId)) {
      token = "";
      setOperation(dispatchPanel, dispatchStatus, "ENVIRONMENT", operationMessages.ENVIRONMENT);
      return;
    }
    dispatchAttempted = true;
    dispatchTokenInput.disabled = true;
    dispatchButton.disabled = true;
    dispatchPanel.setAttribute("aria-busy", "true");
    dispatchEvidence.textContent = "";
    operationReport(dispatchEvidence, { repository, sourceCommit, codeBlob, revision, requestId, requestNumber: 1, startedAt: new Date().toISOString() });
    setOperation(dispatchPanel, dispatchStatus, "CHECKING_MAIN", "Đang đối chiếu main trước POST...");
    dispatchController = new AbortController();
    const signal = dispatchController.signal;
    signal.addEventListener("abort", () => { token = ""; }, { once: true });
    const timer = setTimeout(() => dispatchController?.abort(), timeoutMs);
    let postStarted = false;
    let httpStatus = null;
    let outcome = "WP004_INTERNAL";
    try {
      const main = await getOperationJson(api + "/git/ref/heads/main", token, signal, dispatchEvidence, "main");
      if (!object(main) || main.ref !== "refs/heads/main" || !object(main.object) || main.object.type !== "commit" ||
          typeof main.object.sha !== "string" || main.object.sha.length !== 40 || !shaPattern.test(main.object.sha)) fail("MAIN_RESPONSE");
      if (main.object.sha !== sourceCommit) fail("MAIN_MOVED");
      assertActive(signal);
      setOperation(dispatchPanel, dispatchStatus, "SENDING", "Đang gửi đúng một hello...");
      postStarted = true;
      operationReport(dispatchEvidence, { step: "dispatch", eventType: "hello", expectedSha: sourceCommit, requestId });
      let response;
      try {
        const pending = fetch(api + "/dispatches", {
          method: "POST", mode: "cors", credentials: "omit", cache: "no-store", redirect: "error", referrerPolicy: "no-referrer",
          headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "Content-Type": "application/json" },
          body: JSON.stringify({ event_type: "hello", client_payload: { expected_sha: sourceCommit, source: "cockpit", request_id: requestId } }), signal,
        });
        token = "";
        response = await pending;
      } catch { fail(signal.aborted ? "TIMEOUT" : "FETCH"); }
      finally { token = ""; }
      assertActive(signal);
      if (!Number.isInteger(response.status) || response.status < 100 || response.status > 599) fail("RESPONSE");
      httpStatus = response.status;
      operationReport(dispatchEvidence, { step: "dispatch", httpStatus });
      if (httpStatus !== 204) fail("HTTP_" + httpStatus);
      dispatchAccepted = true;
      resultShaInput.disabled = false;
      resultTokenInput.disabled = false;
      resultButton.disabled = false;
      outcome = "WP004_DISPATCH_ACCEPTED";
      setOperation(dispatchPanel, dispatchStatus, "DISPATCH_ACCEPTED", "HTTP 204: đã gửi, chờ agent đối soát run nhận và commit. Đây chưa phải nghiệm thu heartbeat.");
      setOperation(resultPanel, resultStatus, "WAITING_RESULT", "Đợi agent cung cấp commit H khớp request ID " + requestId + ".");
    } catch (error) {
      const code = safeOperationError(error, signal);
      const unknown = postStarted && httpStatus === null;
      outcome = unknown ? "WP004_DISPATCH_UNKNOWN" : "WP004_" + code;
      operationReport(dispatchEvidence, { errorCode: code, postStarted });
      setOperation(dispatchPanel, dispatchStatus, unknown ? "DISPATCH_UNKNOWN" : code, unknown ?
        "POST đã bắt đầu nhưng chưa xác định kết quả. Agent cần đọc lịch sử; không bấm lại, reload để thử thêm hoặc đổi quyền." : operationErrorText(code));
    } finally {
      token = "";
      dispatchTokenInput.value = "";
      clearTimeout(timer);
      dispatchController?.abort();
      dispatchController = null;
      dispatchPanel.setAttribute("aria-busy", "false");
      operationReport(dispatchEvidence, { outcome, finishedAt: new Date().toISOString() });
    }
  });

  resultForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!active || !initialSnapshot || !dispatchAccepted || resultAttempted) { resultTokenInput.value = ""; return; }
    let token = resultTokenInput.value.trim();
    resultTokenInput.value = "";
    const resultSha = resultShaInput.value.trim();
    if (!tokenValid(token) || resultSha.length !== 40 || !shaPattern.test(resultSha) ||
        resultSha === sourceCommit || resultSha === "0".repeat(40)) {
      token = "";
      setOperation(resultPanel, resultStatus, "INPUT", operationMessages.INPUT);
      return;
    }
    if (!readyEnvironment()) {
      token = "";
      setOperation(resultPanel, resultStatus, "ENVIRONMENT", operationMessages.ENVIRONMENT);
      return;
    }
    resultAttempted = true;
    resultShaInput.disabled = true;
    resultTokenInput.disabled = true;
    resultButton.disabled = true;
    resultPanel.setAttribute("aria-busy", "true");
    resultEvidence.textContent = "";
    operationReport(resultEvidence, { repository, sourceCommit, codeBlob, revision, requestId, resultCommit: resultSha, requestNumber: 1, startedAt: new Date().toISOString() });
    setOperation(resultPanel, resultStatus, "RESULT_LOADING", "Đang kiểm commit và state kết quả...");
    resultController = new AbortController();
    const signal = resultController.signal;
    signal.addEventListener("abort", () => { token = ""; }, { once: true });
    const timer = setTimeout(() => resultController?.abort(), timeoutMs);
    let outcome = "WP004_INTERNAL";
    try {
      const commit = await getOperationJson(api + "/commits/" + resultSha, token, signal, resultEvidence, "commit");
      const expectedBlob = resultCommitBlob(commit, resultSha);
      assertActive(signal);
      const pending = getOperationJson(api + "/contents/" + path + "?ref=" + resultSha, token, signal, resultEvidence, "state");
      token = "";
      const file = await pending;
      if (!object(file) || file.sha !== expectedBlob) fail("RESULT_BLOB");
      const result = await decodeState(file);
      assertActive(signal);
      verifyResultDelta(initialSnapshot, result);
      assertActive(signal);
      renderState(result.data);
      binding.textContent = "Repository: " + repository + "\nCommit mã / snapshot ban đầu M: " + sourceCommit +
        "\nBlob Cockpit: " + codeBlob + "\nKết quả đang hiển thị H: " + resultSha + "\nState: " + path;
      sourceTitle.textContent = "Nguồn mã, snapshot ban đầu và kết quả heartbeat";
      setStatus("WP004_RESULT_LOADED", "Bảng đang hiển thị kết quả heartbeat tại commit " + resultSha + ".");
      operationReport(resultEvidence, { parent: sourceCommit, verifiedStateBlob: result.blob, stateSha256: result.sha256,
        stateBytes: result.bytes, episodeCount: result.data.episodes.length, beforeUpdatedAt: initialSnapshot.data.updatedAt, updatedAt: result.data.updatedAt });
      outcome = "WP004_RESULT_LOADED";
      setOperation(resultPanel, resultStatus, "RESULT_LOADED", "Đã đọc H; chỉ updatedAt thay đổi. Đối chiếu thêm bằng chứng run nhận trước nghiệm thu.");
    } catch (error) {
      const code = safeOperationError(error, signal);
      outcome = "WP004_" + code;
      setOperation(resultPanel, resultStatus, code, operationErrorText(code));
    } finally {
      token = "";
      resultTokenInput.value = "";
      clearTimeout(timer);
      resultController?.abort();
      resultController = null;
      resultPanel.setAttribute("aria-busy", "false");
      operationReport(resultEvidence, { outcome, finishedAt: new Date().toISOString() });
    }
  });

  window.addEventListener("pagehide", () => {
    dispatchTokenInput.value = "";
    resultTokenInput.value = "";
    for (const control of [dispatchTokenInput, dispatchButton, resultShaInput, resultTokenInput, resultButton]) control.disabled = true;
    dispatchController?.abort();
    resultController?.abort();
  });

  let attempted = false;
  let active = true;
  let controller = null;
  window.addEventListener("pagehide", () => {
    active = false;
    tokenInput.value = "";
    tokenInput.disabled = true;
    button.disabled = true;
    if (controller) controller.abort();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (attempted || !active) { tokenInput.value = ""; return; }
    let token = tokenInput.value.trim();
    tokenInput.value = "";
    if (!token || !/^[\x21-\x7e]+$/.test(token)) {
      token = "";
      setStatus("WP003_INPUT", messages.INPUT);
      return;
    }
    if (!window.isSecureContext || !window.crypto?.subtle || typeof fetch !== "function" ||
        typeof TextEncoder !== "function" || typeof TextDecoder !== "function" ||
        typeof AbortController !== "function" || typeof atob !== "function" || typeof btoa !== "function") {
      token = "";
      setStatus("WP003_ENVIRONMENT", messages.ENVIRONMENT);
      return;
    }
    attempted = true;
    tokenInput.disabled = true;
    button.disabled = true;
    app.setAttribute("aria-busy", "true");
    evidence.textContent = "";
    report({ repository, path, sourceCommit, codeBlob, revision, requestNumber: 1, startedAt: new Date().toISOString() });
    setStatus("WP003_STATE_LOADING", "Đang đọc snapshot tại commit đã chọn...");
    controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => controller?.abort(), timeoutMs);
    let outcome = "WP003_INTERNAL";
    try {
      const url = "https://api.github.com/repos/" + repository + "/contents/" + path + "?ref=" + sourceCommit;
      let response;
      try {
        const pending = fetch(url, {
          method: "GET", mode: "cors", credentials: "omit", cache: "no-store", redirect: "error", referrerPolicy: "no-referrer",
          headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" }, signal,
        });
        token = "";
        response = await pending;
      } catch { fail(signal.aborted ? "TIMEOUT" : "FETCH"); }
      finally { token = ""; }
      if (signal.aborted) fail("TIMEOUT");
      if (!Number.isInteger(response.status) || response.status < 100 || response.status > 599) fail("RESPONSE");
      report({ httpStatus: response.status });
      if (response.status !== 200) fail("HTTP_" + response.status);
      let file;
      try { file = await readEnvelope(response, signal); }
      catch (error) {
        if (signal.aborted) fail("TIMEOUT");
        if (error instanceof Error && ["SIZE", "RESPONSE"].includes(error.message)) throw error;
        fail("RESPONSE");
      }
      const result = await decodeState(file);
      if (!active) fail("CANCELLED");
      if (signal.aborted) fail("TIMEOUT");
      renderState(result.data);
      initialSnapshot = result;
      dispatchTokenInput.disabled = false;
      dispatchButton.disabled = false;
      setOperation(dispatchPanel, dispatchStatus, "READY", "Snapshot nguồn đã đọc. Chỉ gửi hello sau phê duyệt riêng.");
      report({ verifiedStateBlob: result.blob, stateSha256: result.sha256, stateBytes: result.bytes, episodeCount: result.data.episodes.length });
      outcome = "WP003_STATE_LOADED";
      setStatus(outcome, "Đã đọc snapshot: " + result.data.episodes.length + " episode.");
      settings.open = false;
    } catch (error) {
      const code = !active ? "CANCELLED" : signal.aborted ? "TIMEOUT" : error instanceof Error ? error.message : "INTERNAL";
      const http = /^HTTP_[1-5][0-9]{2}$/.test(code);
      const safeCode = http || has(messages, code) ? code : "INTERNAL";
      outcome = "WP003_" + safeCode;
      setStatus(outcome, http ? "GitHub không trả HTTP 200. Kiểm truy cập/path/ref; không tự đổi quyền hoặc thử lại." : messages[safeCode]);
    } finally {
      token = "";
      tokenInput.value = "";
      clearTimeout(timer);
      controller?.abort();
      controller = null;
      app.setAttribute("aria-busy", "false");
      report({ outcome, finishedAt: new Date().toISOString() });
    }
  });

  // The loader checks these legacy attributes after 250 ms; they acknowledge UI boot only.
  gate.dataset.wp003Mounted = "true";
  gate.dataset.wp003aRevision = revision;
  gate.dataset.wp003aComplete = "true";
})();

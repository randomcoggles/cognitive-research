const readyDomains = atlasDomains.filter(domain => domain.status === "ready");
const masteryLabels = ["Unknown", "Aware", "Understand", "Apply", "Analyze", "Teach", "Expert"];
const storagePrefix = "atlas-cognition:";
const notesStorageKey = `${storagePrefix}notes`;
const exportFormat = "atlas-cognition-learning-data";
const exportVersion = 1;
const noteTypes = ["comment", "question", "task", "custom"];

const noteViewIcons = {
  list: '<svg class="note-view-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2.5 4h.01M2.5 8h.01M2.5 12h.01M6 4h7.5M6 8h7.5M6 12h7.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  add: '<svg class="note-view-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3.2v9.6M3.2 8h9.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
};

function getDomainFromPage() {
  return document.body.dataset.domain
    ? atlasDomains.find(domain => domain.id === document.body.dataset.domain)
    : null;
}

function getStoredResult(domainId) {
  try {
    return JSON.parse(localStorage.getItem(`${storagePrefix}${domainId}`));
  } catch {
    return null;
  }
}

function setStoredResult(domainId, value) {
  localStorage.setItem(`${storagePrefix}${domainId}`, JSON.stringify(value));
}

function getStoredNotes() {
  try {
    const stored = JSON.parse(localStorage.getItem(notesStorageKey) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error("Could not read Atlas notes.", error);
    return [];
  }
}

function setStoredNotes(notes) {
  localStorage.setItem(notesStorageKey, JSON.stringify(notes));
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `note-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown date"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function noteTypeLabel(note) {
  return note.type === "custom" ? note.customType : note.type;
}

function masteryForScore(score) {
  if (score >= 100) return 4;
  if (score >= 80) return 3;
  if (score >= 60) return 2;
  if (score > 0) return 1;
  return 0;
}

// Domain pages live at /<id>/index.html so each domain owns a folder. The explicit
// filename (rather than a bare directory URL) keeps links working when the site is
// opened from the filesystem, where directory URLs do not resolve.
function domainHref(domain) {
  return domain.status === "ready" ? Atlas.url(`${domain.id}/index.html`) : Atlas.url("index.html#roadmap");
}

function domainSectionHref(domain, section) {
  return domain.status === "ready" ? Atlas.url(`${domain.id}/index.html#${section}`) : Atlas.url("index.html#roadmap");
}

function renderShell() {
  const activeDomain = getDomainFromPage();
  const activePage = document.body.dataset.page;
  const topbar = document.querySelector("#topbar");
  topbar.innerHTML = `
    <button class="icon-button menu-button" type="button" id="menu-button" aria-label="Open domain navigation" aria-expanded="false">☰</button>
    <a class="brand" href="${Atlas.url("index.html")}">
      <span class="brand-mark">AC</span>
      <span class="brand-text">Atlas of Cognition</span>
    </a>
    <div class="top-actions">
      <a class="plain-button" href="${Atlas.url("index.html#explore")}">Explore</a>
      <a class="plain-button" href="${Atlas.url("graph.html")}" ${activePage === "graph" ? 'aria-current="page"' : ""}>Graph</a>
      <a class="plain-button" href="${Atlas.url("paths.html")}" ${activePage === "paths" ? 'aria-current="page"' : ""}>Paths</a>
      <a class="plain-button" href="${Atlas.url("profile.html")}" ${activePage === "profile" ? 'aria-current="page"' : ""}>Profile</a>
      <a class="plain-button" href="${Atlas.url("dashboard.html")}" ${activePage === "dashboard" ? 'aria-current="page"' : ""}>Dashboard</a>
      <button class="icon-button" type="button" id="theme-button" aria-label="Switch color theme" title="Switch color theme">◐</button>
    </div>`;

  const sidebar = document.querySelector("#sidebar");
  sidebar.innerHTML = `
    <p class="nav-label">Domains</p>
    <nav class="domain-nav" aria-label="Cognitive domains">
      ${atlasDomains.map(domain => `
        <a href="${domainHref(domain)}" ${activeDomain?.id === domain.id ? 'aria-current="page"' : ""}>
          <span>${domain.number} · ${domain.shortName}</span>
          <span class="nav-status ${domain.status}">${domain.status === "ready" ? "Live" : "Later"}</span>
        </a>`).join("")}
    </nav>
    <div class="sidebar-progress">
      <p class="nav-label">Your local progress</p>
      <div class="progress-track"><div class="progress-fill" id="sidebar-progress-fill"></div></div>
      <p id="sidebar-progress-text">No assessments completed yet.</p>
      <a class="sidebar-dashboard-link" href="${Atlas.url("dashboard.html")}">Open learning dashboard →</a>
    </div>`;

  document.querySelector("#menu-button").addEventListener("click", event => {
    const open = sidebar.classList.toggle("open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
    event.currentTarget.setAttribute("aria-label", open ? "Close domain navigation" : "Open domain navigation");
  });
  sidebar.addEventListener("click", event => {
    if (event.target.closest("a")) {
      sidebar.classList.remove("open");
      document.querySelector("#menu-button").setAttribute("aria-expanded", "false");
    }
  });

  const savedTheme = localStorage.getItem(`${storagePrefix}theme`);
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  document.querySelector("#theme-button").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(`${storagePrefix}theme`, next);
  });
  updateProgress();
}

function updateProgress() {
  const completed = readyDomains
    .map(domain => getStoredResult(domain.id))
    .filter(result => result?.completed);
  const percent = Math.round(completed.length / readyDomains.length * 100);
  document.querySelector("#sidebar-progress-fill").style.width = `${percent}%`;
  document.querySelector("#sidebar-progress-text").textContent = completed.length
    ? `${completed.length} of ${readyDomains.length} domain assessments completed.`
    : "No assessments completed yet.";
}

function renderSearch() {
  const input = document.querySelector("#atlas-search");
  if (!input) return;
  const results = document.querySelector("#search-results");
  const records = atlasDomains.flatMap(domain => {
    const domainRecords = [
      { title: domain.name, kind: "Domain", detail: domain.purpose, href: domainHref(domain), ready: domain.status === "ready" },
      ...domain.concepts.map(([title, detail]) => ({
        title,
        kind: `${domain.shortName} concept`,
        detail,
        href: domainSectionHref(domain, "capabilities"),
        ready: domain.status === "ready"
      }))
    ];
    // A page that did not load this domain's data file still renders its metadata.
    if (domain.status !== "ready" || !domain.failures) return domainRecords;
    return [
      ...domainRecords,
      ...domain.failures.map(([title, detail]) => ({
        title,
        kind: `${domain.shortName} failure mode`,
        detail,
        href: domainSectionHref(domain, "failures"),
        ready: true
      })),
      ...(domain.mappings || []).flatMap(([humanFunction, tool, aiExtension, guardrail]) => [
        {
          title: tool,
          kind: `Tool supporting ${humanFunction}`,
          detail: guardrail,
          href: domainSectionHref(domain, "mapping"),
          ready: true
        },
        {
          title: aiExtension,
          kind: `AI extension for ${humanFunction}`,
          detail: guardrail,
          href: domainSectionHref(domain, "mapping"),
          ready: true
        }
      ]),
      ...(domain.relations || []).map(title => ({
        title,
        kind: `${domain.shortName} relationship`,
        detail: `Connected to ${domain.name}.`,
        href: domainSectionHref(domain, "relationships"),
        ready: true
      }))
    ];
  });
  const close = () => results.classList.remove("visible");
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      close();
      results.replaceChildren();
      return;
    }
    const matches = records
      .filter(record => `${record.title} ${record.kind} ${record.detail}`.toLowerCase().includes(query))
      .slice(0, 12);
    results.innerHTML = matches.length
      ? matches.map(record => `
          <a class="search-result" href="${record.href}">
            <strong>${record.title}</strong>
            <span>${record.kind} · ${record.ready ? "Available now" : "Planned"} — ${record.detail}</span>
          </a>`).join("")
      : '<div class="search-result"><strong>No results</strong><span>Try a concept, failure mode, tool, or domain.</span></div>';
    results.classList.add("visible");
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".search-panel")) close();
  });
}

function renderHome() {
  document.querySelector("#domain-grid").innerHTML = atlasDomains.map(domain => {
    const result = getStoredResult(domain.id);
    return `
      <a class="domain-card ${domain.status}" href="${domainHref(domain)}" style="--domain-color:${domain.color}">
        <span class="domain-number">DOMAIN ${domain.number} · ${domain.status === "ready" ? "AVAILABLE" : "PLANNED"}</span>
        <h3>${domain.name}</h3>
        <p>${domain.purpose}</p>
        <div class="concept-list">
          ${domain.concepts.slice(0, 4).map(([name]) => `<span class="concept-chip">${name}</span>`).join("")}
          ${domain.concepts.length > 4 ? `<span class="concept-chip">+${domain.concepts.length - 4} more</span>` : ""}
        </div>
        <footer>
          <span>${domain.concepts.length} capabilities</span>
          <span>${result?.completed ? `${result.score}% · ${masteryLabels[result.mastery]}` : domain.status === "ready" ? "Assessment available →" : "Later release"}</span>
        </footer>
      </a>`;
  }).join("");

  const completed = readyDomains
    .map(domain => ({ domain, result: getStoredResult(domain.id) }))
    .filter(entry => entry.result?.completed);
  const average = completed.length
    ? Math.round(completed.reduce((sum, entry) => sum + entry.result.score, 0) / completed.length)
    : 0;
  document.querySelector("#home-progress").innerHTML = `
    <strong>${completed.length}/${readyDomains.length}</strong>
    <p>Release 1 domain assessments completed${completed.length ? ` · ${average}% average score` : ""}.</p>
    <div class="progress-track"><div class="progress-fill" style="width:${completed.length / readyDomains.length * 100}%"></div></div>`;
  renderSearch();
}

function renderDomain() {
  const domain = getDomainFromPage();
  if (!domain) return;
  document.documentElement.style.setProperty("--domain-color", domain.color);
  document.title = `${domain.name} · Atlas of Cognition`;
  document.querySelector("#breadcrumb-current").textContent = domain.name;
  document.querySelector("#domain-hero").innerHTML = `
    <div>
      <p class="eyebrow">Domain ${domain.number} · Release 1</p>
      <h1>${domain.name}</h1>
      <p>${domain.purpose}</p>
    </div>
    <aside class="domain-meta">
      <strong>${domain.concepts.length}</strong>
      <span>capabilities in this domain</span>
      <p>${domain.quiz.length} assessment questions · progress stored only in this browser</p>
      <nav class="domain-lens-links">
        <a class="plain-button" href="${Atlas.url(`${domain.id}/reader.html`)}">Reader lens</a>
        <a class="plain-button" href="${Atlas.url(`${domain.id}/creator.html`)}">Creator lens</a>
        <a class="plain-button" href="${Atlas.url(`${domain.id}/quiz.html`)}">Question bank</a>
      </nav>
    </aside>`;
  document.querySelector("#capability-grid").innerHTML = domain.concepts.map(([name, description]) => `
    <article class="capability"><h3><a href="${conceptHref({ id: slugify(name) })}">${name}</a></h3><p>${description}</p></article>`).join("");
  document.querySelector("#objective-list").innerHTML = domain.objectives.map(objective => `<li>${objective}</li>`).join("");
  document.querySelector("#example-grid").innerHTML = domain.examples.map(([context, example]) => `
    <article class="panel example-card"><span class="example-context">${context}</span><p>${example}</p></article>`).join("");
  document.querySelector("#mapping-body").innerHTML = domain.mappings.map(row => `
    <tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("");
  document.querySelector("#failure-grid").innerHTML = domain.failures.map(([name, description]) => `
    <article class="failure"><strong>${name}</strong><p>${description}</p></article>`).join("");
  document.querySelector("#relationship-map").innerHTML = [
    `<span class="relationship-node current">${domain.name}</span>`,
    ...domain.relations.map(relation => `<span class="relationship-node">${relation}</span>`)
  ].join("");
  renderSectionNotes(domain);
  renderQuiz(domain);
  renderNextPrevious(domain);
}


function renderGraph() {
  const svg = document.querySelector("#graph-svg");
  const size = 2500;
  const center = size / 2;
  const ns = "http://www.w3.org/2000/svg";
  const make = (tag, attrs, parent) => {
    const el = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    (parent || svg).appendChild(el);
    return el;
  };
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  const edgeLayer = make("g", { class: "graph-edges" });
  const nodeLayer = make("g", {});
  const positions = new Map();
  const nodes = new Map();

  atlasDomains.forEach((domain, domainIndex) => {
    const angle = (domainIndex / atlasDomains.length) * Math.PI * 2 - Math.PI / 2;
    const hub = { x: center + Math.cos(angle) * 950, y: center + Math.sin(angle) * 950 };
    positions.set(`d:${domain.id}`, hub);
    const group = make("g", { class: `graph-node domain ${domain.status}`, tabindex: 0, role: "link", "aria-label": domain.name }, nodeLayer);
    make("circle", { cx: hub.x, cy: hub.y, r: 26, fill: domain.color }, group);
    const label = make("text", { x: hub.x, y: hub.y + 52, "text-anchor": "middle", class: "domain-label" }, group);
    label.textContent = domain.shortName;
    group.addEventListener("click", () => { location.href = domainHref(domain); });
    group.addEventListener("keydown", event => { if (event.key === "Enter") location.href = domainHref(domain); });
    nodes.set(`d:${domain.id}`, group);

    domain.concepts.forEach(([name], conceptIndex) => {
      const concept = allConcepts.find(entry => entry.domain === domain && entry.index === conceptIndex);
      const a = (conceptIndex / domain.concepts.length) * Math.PI * 2 + angle;
      const point = { x: hub.x + Math.cos(a) * 125, y: hub.y + Math.sin(a) * 125 };
      positions.set(`c:${concept.id}`, point);
      const cg = make("g", { class: "graph-node concept", tabindex: 0, role: "link", "aria-label": name }, nodeLayer);
      make("line", { x1: hub.x, y1: hub.y, x2: point.x, y2: point.y, class: "graph-spoke" }, edgeLayer);
      make("circle", { cx: point.x, cy: point.y, r: 7, fill: domain.color }, cg);
      const text = make("text", { x: point.x + Math.cos(a) * 12, y: point.y + Math.sin(a) * 12 + 4, "text-anchor": Math.cos(a) >= 0 ? "start" : "end" }, cg);
      text.textContent = name;
      cg.addEventListener("click", () => { location.href = conceptHref(concept); });
      cg.addEventListener("keydown", event => { if (event.key === "Enter") location.href = conceptHref(concept); });
      nodes.set(`c:${concept.id}`, cg);
    });
  });

  const links = [];
  atlasDomains.forEach(domain => (domain.relations || []).forEach(label => {
    const target = resolveRelation(label);
    if (!target) return;
    const from = `d:${domain.id}`;
    const to = target.kind === "concept" ? `c:${target.concept.id}` : `d:${target.domain.id}`;
    if (from === to) return;
    const a = positions.get(from);
    const b = positions.get(to);
    const path = make("path", { d: `M${a.x},${a.y} Q${center},${center} ${b.x},${b.y}`, class: "graph-link", stroke: domain.color }, edgeLayer);
    links.push({ from, to, path });
  }));

  const highlight = key => {
    svg.classList.toggle("dimmed", Boolean(key));
    nodes.forEach(node => node.classList.remove("hot"));
    links.forEach(link => link.path.classList.remove("hot"));
    if (!key) return;
    nodes.get(key)?.classList.add("hot");
    links.filter(link => link.from === key || link.to === key).forEach(link => {
      link.path.classList.add("hot");
      nodes.get(link.from)?.classList.add("hot");
      nodes.get(link.to)?.classList.add("hot");
    });
  };
  nodes.forEach((node, key) => {
    node.addEventListener("mouseenter", () => highlight(key));
    node.addEventListener("mouseleave", () => highlight(null));
    node.addEventListener("focus", () => highlight(key));
    node.addEventListener("blur", () => highlight(null));
  });
  const focus = new URLSearchParams(location.search).get("focus");
  if (focus && nodes.has(`c:${focus}`)) highlight(`c:${focus}`);
  document.querySelector("#graph-count").textContent = `${atlasDomains.length} domains · ${allConcepts.length} capabilities · ${links.length} cross-links`;
}

const learningPaths = [
  { id: "productivity", name: "Productivity Path", summary: "Protect focus, hold the right information, and steer toward goals.", steps: ["Attention", "Working Memory", "Planning", "Executive Control"] },
  { id: "leadership", name: "Leadership Path", summary: "Understand people, decide well, and regulate your own reactions.", steps: ["Perspective Taking", "Decision Making", "Strategic Thinking", "Emotional Regulation"] },
  { id: "software", name: "Software Engineering Path", summary: "Model systems, spot patterns, and find root causes.", steps: ["Systems Thinking", "Mental Models", "Pattern Recognition", "Root Cause Analysis"] },
  { id: "ai", name: "AI Practitioner Path", summary: "Think about thinking, reason carefully, and extend cognition with AI.", steps: ["Metacognition", "Reasoning", "Mental Models", "Human ↔ AI Cognition"] }
];
const levelsStorageKey = `${storagePrefix}levels`;

function getConceptLevels() {
  try {
    return JSON.parse(localStorage.getItem(levelsStorageKey)) || {};
  } catch {
    return {};
  }
}

function setConceptLevel(id, level) {
  const levels = getConceptLevels();
  if (level > 0) levels[id] = level; else delete levels[id];
  localStorage.setItem(levelsStorageKey, JSON.stringify(levels));
}

// A step is a concept (self-rated level), a domain (quiz mastery), or missing from the Atlas (null).
function stepState(name) {
  const target = resolveRelation(name);
  if (!target) return { name, href: null, level: null };
  if (target.kind === "concept") return { name, href: target.href, level: getConceptLevels()[target.concept.id] || 0 };
  return { name, href: target.href, level: getStoredResult(target.domain.id)?.mastery || 0, domain: target.domain };
}

const appliedLevel = 3;

function renderPaths() {
  document.querySelector("#paths-root").innerHTML = learningPaths.map(path => {
    const steps = path.steps.map(stepState);
    const done = steps.filter(step => step.level >= appliedLevel).length;
    return `
      <article class="panel path-card">
        <h2>${path.name}</h2>
        <p>${path.summary}</p>
        <div class="progress-track"><div class="progress-fill" style="width:${done / steps.length * 100}%"></div></div>
        <p class="path-count">${done} of ${steps.length} steps at “${masteryLabels[appliedLevel]}” or higher</p>
        <ol class="path-steps">${steps.map(step => `
          <li>${step.href ? `<a href="${step.href}">${step.name}</a>` : `<span title="Not in the Atlas yet">${step.name}</span>`}
            <span class="path-level">${step.level === null ? "Planned" : masteryLabels[step.level]}</span></li>`).join("")}
        </ol>
      </article>`;
  }).join("");
}

function renderProfile() {
  const levels = getConceptLevels();
  const rated = Object.entries(levels)
    .map(([id, level]) => ({ concept: allConcepts.find(entry => entry.id === id), level }))
    .filter(entry => entry.concept);
  const results = readyDomains.map(domain => ({ domain, result: getStoredResult(domain.id) }));
  const taken = results.filter(entry => entry.result?.completed);
  const chip = (href, text, extra = "") => `<a class="relationship-node" href="${href}">${text}${extra}</a>`;
  const strengths = [
    ...rated.filter(entry => entry.level >= 4).map(entry => chip(conceptHref(entry.concept), entry.concept.name, ` · ${masteryLabels[entry.level]}`)),
    ...taken.filter(entry => entry.result.mastery >= 3).map(entry => chip(domainHref(entry.domain), entry.domain.shortName, ` · quiz ${entry.result.score}%`))
  ];
  const growth = [
    ...rated.filter(entry => entry.level <= 2).map(entry => chip(conceptHref(entry.concept), entry.concept.name, ` · ${masteryLabels[entry.level]}`)),
    ...taken.filter(entry => entry.result.score < 60).map(entry => chip(domainHref(entry.domain), entry.domain.shortName, ` · quiz ${entry.result.score}%`))
  ];
  const next = [];
  results.filter(entry => !entry.result?.completed || entry.result.score < 80).forEach(entry => next.push({
    href: domainSectionHref(entry.domain, "assessment"),
    text: entry.result?.completed ? `Retake the ${entry.domain.shortName} assessment` : `Take the ${entry.domain.shortName} assessment`,
    why: entry.result?.completed ? `Last score ${entry.result.score}%.` : "No result recorded yet."
  }));
  learningPaths.forEach(path => {
    const step = path.steps.map(stepState).find(entry => entry.href && entry.level < appliedLevel);
    if (step) next.push({ href: step.href, text: `${path.name}: ${step.name}`, why: `Next step below “${masteryLabels[appliedLevel]}”.` });
  });
  const list = items => items.length ? `<div class="relationship-map">${items.join("")}</div>` : "<p>Nothing here yet.</p>";
  const hasData = rated.length || taken.length;
  document.querySelector("#profile-root").innerHTML = `
    ${hasData ? "" : `<p class="panel">Your profile builds from two inputs: the level you set on each <a href="${Atlas.url("graph.html")}">concept page</a> and your domain assessment results. Both are stored only in this browser.</p>`}
    <div class="profile-stats">
      <div class="panel"><strong>${rated.length}</strong><p>concepts self-rated</p></div>
      <div class="panel"><strong>${taken.length}/${readyDomains.length}</strong><p>domain assessments taken</p></div>
    </div>
    <section class="panel"><h2>Strengths</h2><p class="section-intro">Concepts you rate Analyze or higher, and domains with an Apply-level quiz result.</p>${list(strengths)}</section>
    <section class="panel"><h2>Growth areas</h2><p class="section-intro">Concepts you rate Understand or lower, and domains with a quiz score under 60%.</p>${list(growth)}</section>
    <section class="panel"><h2>Recommended next</h2>
      <ul class="recommend-list">${next.slice(0, 6).map(item => `<li><a href="${item.href}">${item.text}</a> <span>${item.why}</span></li>`).join("") || "<li>You're caught up on every path and assessment.</li>"}</ul>
    </section>
    <p class="section-intro">Self-ratings and quiz scores support reflection; they are not psychological measurements.</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderShell();
  const page = document.body.dataset.page;
  const domain = getDomainFromPage();
  if (page === "paths") renderPaths();
  if (page === "profile") renderProfile();
  if (page === "concept") renderConcept();
  if (page === "graph") renderGraph();
  if (page === "home") renderHome();
  if (page === "domain") renderDomain();
  if (page === "dashboard") renderDashboard();
  if (page === "reader" && domain) renderReaderLens(domain);
  if (page === "creator" && domain) renderCreatorLens(domain);
  if (page === "bank" && domain) {
    renderBankQuiz(domain, new URLSearchParams(location.search).get("mode") === "practice" ? "practice" : "assessment");
  }
});

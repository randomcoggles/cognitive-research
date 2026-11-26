// Renders the reader and creator lenses for a domain.
// Lens content lives in data/domains/<id>/reader.js and creator.js.

function getLens(domainId, kind) {
  return Atlas.data.lenses?.[domainId]?.[kind] || null;
}

function renderLensPrinciples(principles) {
  return principles.map((principle, index) => `
    <article class="lens-principle">
      <h3><span class="lens-index">${index + 1}</span>${escapeHtml(principle.title)}</h3>
      <p>${escapeHtml(principle.body)}</p>
      <p class="lens-do"><strong>Do this:</strong> ${escapeHtml(principle.do)}</p>
    </article>`).join("");
}

function renderLensPitfalls(pitfalls) {
  return `<div class="failure-grid">${pitfalls.map(([name, text]) => `
    <article class="failure"><strong>${escapeHtml(name)}</strong><p>${escapeHtml(text)}</p></article>`).join("")}</div>`;
}

function renderLensExample(example) {
  return `
    <div class="lens-example">
      <p class="eyebrow">${escapeHtml(example.context)}</p>
      <div class="lens-example-pair">
        <article class="panel lens-before"><h3>Before</h3><p>${escapeHtml(example.before)}</p></article>
        <article class="panel lens-after"><h3>After</h3><p>${escapeHtml(example.after)}</p></article>
      </div>
    </div>`;
}

function renderReaderLens(domain) {
  const lens = getLens(domain.id, "reader");
  const root = document.querySelector("#lens-root");
  if (!root) return;
  if (!lens) {
    root.innerHTML = `<section class="panel"><h1>Reader lens not written yet</h1>
      <p>This domain does not have reader-lens content yet. <a href="${domainHref(domain)}">Back to ${escapeHtml(domain.name)}</a>.</p></section>`;
    return;
  }
  document.title = `${lens.title} · ${domain.name} · Atlas of Cognition`;
  root.innerHTML = `
    <nav class="breadcrumb"><a href="${Atlas.url("index.html")}">Atlas</a><span>/</span><a href="${domainHref(domain)}">${escapeHtml(domain.name)}</a><span>/</span><span>Reader lens</span></nav>
    <section class="domain-hero lens-hero">
      <div>
        <p class="eyebrow">Reader lens · ${escapeHtml(domain.shortName)}</p>
        <h1>${escapeHtml(lens.title)}</h1>
        <p>${escapeHtml(lens.standfirst)}</p>
      </div>
    </section>
    <section class="section">
      <div class="section-header"><div><p class="eyebrow">What to understand</p><h2>Five things that change how you read</h2></div></div>
      <div class="lens-principles">${renderLensPrinciples(lens.principles)}</div>
    </section>
    <section class="section">
      <div class="section-header"><div><p class="eyebrow">What to do</p><h2>Practices</h2></div></div>
      <div class="panel"><ol class="objective-list">${lens.practices.map(item => `<li><span>${escapeHtml(item)}</span></li>`).join("")}</ol></div>
    </section>
    <section class="section">
      <div class="section-header"><div><p class="eyebrow">What goes wrong</p><h2>Common reader mistakes</h2></div></div>
      ${renderLensPitfalls(lens.pitfalls)}
    </section>
    <section class="section">
      <div class="section-header"><div><p class="eyebrow">Worked contrast</p><h2>The same task, done badly and well</h2></div></div>
      ${renderLensExample(lens.example)}
    </section>
    <nav class="lens-switch">
      <a class="plain-button" href="${Atlas.url(`${domain.id}/creator.html`)}">Switch to the creator lens →</a>
      <a class="plain-button" href="${Atlas.url(`${domain.id}/quiz.html`)}">Practise the reader lens →</a>
    </nav>`;
}

function renderCreatorLens(domain) {
  const lens = getLens(domain.id, "creator");
  const root = document.querySelector("#lens-root");
  if (!root) return;
  if (!lens) {
    root.innerHTML = `<section class="panel"><h1>Creator lens not written yet</h1>
      <p>This domain does not have creator-lens content yet. <a href="${domainHref(domain)}">Back to ${escapeHtml(domain.name)}</a>.</p></section>`;
    return;
  }
  document.title = `${lens.title} · ${domain.name} · Atlas of Cognition`;
  const mapping = lens.protocolMapping;
  root.innerHTML = `
    <nav class="breadcrumb"><a href="${Atlas.url("index.html")}">Atlas</a><span>/</span><a href="${domainHref(domain)}">${escapeHtml(domain.name)}</a><span>/</span><span>Creator lens</span></nav>
    <section class="domain-hero lens-hero">
      <div>
        <p class="eyebrow">Creator lens · ${escapeHtml(domain.shortName)}</p>
        <h1>${escapeHtml(lens.title)}</h1>
        <p>${escapeHtml(lens.standfirst)}</p>
      </div>
    </section>
    <section class="section">
      <div class="section-header"><div><p class="eyebrow">What to understand</p><h2>Design principles</h2></div></div>
      <div class="lens-principles">${renderLensPrinciples(lens.principles)}</div>
    </section>
    ${mapping ? `
    <section class="section">
      <div class="section-header"><div><p class="eyebrow">Protocol mapping</p><h2>Where this shows up in the reader-support protocol</h2>
        <p class="section-intro">${escapeHtml(mapping.note)}</p></div></div>
      <div class="mapping-table-wrap"><table class="mapping-table">
        <thead><tr><th>Phase</th><th>Protocol step</th><th>Why it matters here</th></tr></thead>
        <tbody>${mapping.steps.map(([phase, step, why]) => `<tr><td>${escapeHtml(phase)}</td><td>${escapeHtml(step)}</td><td>${escapeHtml(why)}</td></tr>`).join("")}</tbody>
      </table></div>
    </section>` : ""}
    <section class="section">
      <div class="section-header"><div><p class="eyebrow">Before you publish</p><h2>Checklist</h2></div></div>
      <div class="panel"><ul class="lens-checklist">${lens.checklist.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
    </section>
    <section class="section">
      <div class="section-header"><div><p class="eyebrow">What goes wrong</p><h2>Common design mistakes</h2></div></div>
      ${renderLensPitfalls(lens.pitfalls)}
    </section>
    <section class="section">
      <div class="section-header"><div><p class="eyebrow">Worked contrast</p><h2>The same content, designed badly and well</h2></div></div>
      ${renderLensExample(lens.example)}
    </section>
    <nav class="lens-switch">
      <a class="plain-button" href="${Atlas.url(`${domain.id}/reader.html`)}">Switch to the reader lens →</a>
      <a class="plain-button" href="${Atlas.url(`${domain.id}/quiz.html`)}">Practise the creator lens →</a>
    </nav>`;
}

// Narrative annotation exercise engine.
// Data lives in data/domains/<id>/annotation.js as Atlas.data.annotations[<id>].
//
// Shape:
//   { title, standfirst, constructs: { key: {label, definition, confusable[]} },
//     decoys: [label], stories: { id: { title, paragraphs: [[string | {id, answer, text}]] } } }

var annotationState = null;

function annotationStorageKey(domainId) {
  return `${storagePrefix}annotation:${domainId}`;
}

function loadAnnotationState(domainId) {
  try {
    const saved = JSON.parse(localStorage.getItem(annotationStorageKey(domainId)) || "null");
    if (saved && saved.assignments) return saved;
  } catch (error) { /* corrupt storage is not fatal */ }
  return { story: null, assignments: {}, evaluated: {}, revealed: {} };
}

function saveAnnotationState(domainId, state) {
  try { localStorage.setItem(annotationStorageKey(domainId), JSON.stringify(state)); } catch (error) { /* ignore */ }
}

function annotationSegments(data, storyId) {
  const out = [];
  data.stories[storyId].paragraphs.forEach(parts => {
    parts.forEach(part => { if (typeof part === "object") out.push(part); });
  });
  return out;
}

function annotationLabel(data, key) {
  if (key === "none") return "No event here";
  return data.constructs[key] ? data.constructs[key].label : key;
}

function annotationScore(data, storyId, assignments) {
  const s = { hits: 0, targets: 0, falseAlarms: 0, decoys: 0, misses: 0, rejections: 0, skipped: 0 };
  annotationSegments(data, storyId).forEach(seg => {
    const assigned = assignments[seg.id] || null;
    if (seg.answer === "none") {
      s.decoys++;
      if (assigned === "none") s.rejections++;
      else if (!assigned) s.skipped++;
      else s.falseAlarms++;
    } else {
      s.targets++;
      if (assigned === seg.answer) s.hits++;
      else s.misses++;
    }
  });
  return s;
}

function renderAnnotation(domain) {
  const data = Atlas.data.annotations?.[domain.id];
  const root = document.querySelector("#annotation-root");
  if (!root) return;

  if (!data) {
    root.innerHTML = `<section class="panel"><h1>No annotation exercise yet</h1>
      <p>This domain does not have a narrative annotation exercise. <a href="${domainHref(domain)}">Back to ${escapeHtml(domain.name)}</a>.</p></section>`;
    return;
  }

  const storyIds = Object.keys(data.stories);
  const state = loadAnnotationState(domain.id);
  if (!state.story || !data.stories[state.story]) state.story = storyIds[0];
  annotationState = state;

  document.title = `${data.title} · ${domain.name} · Atlas of Cognition`;

  root.innerHTML = `
    <nav class="breadcrumb"><a href="${Atlas.url("index.html")}">Atlas</a><span>/</span><a href="${domainHref(domain)}">${escapeHtml(domain.name)}</a><span>/</span><span>Narrative annotation</span></nav>
    <section class="domain-hero lens-hero">
      <div>
        <p class="eyebrow">Practice · ${escapeHtml(domain.shortName)}</p>
        <h1>${escapeHtml(data.title)}</h1>
        <p>${escapeHtml(data.standfirst)}</p>
      </div>
    </section>
    <div class="story-tabs" role="tablist" aria-label="Choose a story">
      ${storyIds.map(id => `<button class="story-tab" role="tab" data-story="${escapeHtml(id)}">
        ${escapeHtml(data.stories[id].title)} <span class="tab-meta" data-progress="${escapeHtml(id)}"></span>
      </button>`).join("")}
    </div>
    <section class="section">
      <div class="instructions">
        <p><strong>How this works.</strong> Click a tag button to label the passage that follows it. The passage describes an <em>action</em> — you decide which capability, if any, it shows.</p>
        <p><strong>Two ways to say "nothing here".</strong> <em>No event here</em> is a claim: you assert the passage is not this domain's business. <em>Skip</em> means you are unsure and do not want to guess. Only the first can count as a false alarm.</p>
        <p><strong>Definitions appear after you commit.</strong> That is deliberate — the point is to recognise the behaviour, not to match a definition to a label.</p>
      </div>
      <div class="story" id="annotation-story" role="tabpanel"></div>
    </section>
    <section class="section">
      <div class="controls">
        <button class="primary-button" id="annotation-evaluate" type="button">Evaluate</button>
        <button class="plain-button" id="annotation-reveal" type="button">Reveal answers</button>
        <button class="plain-button" id="annotation-reset" type="button">Reset this story</button>
      </div>
      <div class="score-panel" id="annotation-score">
        <div class="score-grid" id="annotation-grid"></div>
        <div class="verdict" id="annotation-verdict"></div>
        <ul class="confusion-list" id="annotation-confusions"></ul>
      </div>
    </section>
    <nav class="lens-switch">
      <a class="plain-button" href="${Atlas.url(`${domain.id}/tools.html`)}">Tool selection exercise →</a>
      <a class="plain-button" href="${Atlas.url(`${domain.id}/quiz.html`)}">Take the assessment →</a>
    </nav>`;

  const storyEl = root.querySelector("#annotation-story");
  const popover = document.querySelector("#annotation-popover");
  let activeId = null;

  function renderStory() {
    const story = data.stories[state.story];
    const assignments = state.assignments[state.story] || {};
    const evaluated = state.evaluated[state.story];
    const revealed = state.revealed[state.story];

    storyEl.innerHTML = "";
    story.paragraphs.forEach(parts => {
      const p = document.createElement("p");
      parts.forEach(part => {
        if (typeof part === "string") { p.appendChild(document.createTextNode(part)); return; }

        const seg = document.createElement("span");
        seg.className = "segment";
        seg.dataset.id = part.id;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tag-trigger";
        btn.dataset.id = part.id;
        btn.setAttribute("aria-haspopup", "listbox");
        btn.setAttribute("aria-expanded", "false");
        const assigned = assignments[part.id];
        const shown = assigned ? annotationLabel(data, assigned) : "Tag";
        btn.setAttribute("aria-label", `Label this passage${assigned ? " — currently " + shown : ""}`);
        btn.innerHTML = `<svg class="icon-tag" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg><span class="trigger-text">${escapeHtml(shown)}</span>`;
        if (assigned) btn.classList.add("tagged");

        seg.appendChild(btn);
        seg.appendChild(document.createTextNode(" " + part.text));
        p.appendChild(seg);

        if (evaluated || revealed) seg.appendChild(buildAnnotationFeedback(data, part, assigned));
      });
      storyEl.appendChild(p);
    });

    root.querySelectorAll(".story-tab").forEach(tab => {
      tab.setAttribute("aria-selected", String(tab.dataset.story === state.story));
    });
    updateAnnotationProgress();
    renderAnnotationScore();
  }

  function buildAnnotationFeedback(data, part, assigned) {
    const fb = document.createElement("span");
    const isTarget = part.answer !== "none";
    const correct = assigned === part.answer;

    if (isTarget) {
      const c = data.constructs[part.answer];
      if (correct) {
        fb.className = "feedback correct";
        fb.innerHTML = `<span class="fb-head">✓ ${escapeHtml(c.label)}</span><span class="fb-def">${escapeHtml(c.definition)}</span>`;
      } else {
        fb.className = "feedback wrong";
        const head = !assigned
          ? `✗ Not labelled — this is ${c.label}`
          : `✗ You chose ${annotationLabel(data, assigned)} — this is ${c.label}`;
        fb.innerHTML = `<span class="fb-head">${escapeHtml(head)}</span><span class="fb-def">${escapeHtml(c.definition)}</span>${annotationConfusionNote(data, assigned, part.answer)}`;
      }
    } else if (assigned === "none") {
      fb.className = "feedback correct";
      fb.innerHTML = `<span class="fb-head">✓ Correctly left alone</span><span class="fb-def">This passage is cognitive but not ${escapeHtml(data.domainNoun || "this domain")}.</span>`;
    } else if (!assigned) {
      fb.className = "feedback rejected";
      fb.innerHTML = `<span class="fb-head">— Skipped</span><span class="fb-def">No event here. Skipping is not penalised as a false alarm.</span>`;
    } else {
      fb.className = "feedback rejected";
      fb.innerHTML = `<span class="fb-head">⚠ False alarm — you labelled this ${escapeHtml(annotationLabel(data, assigned))}</span><span class="fb-def">This passage is cognitive but not ${escapeHtml(data.domainNoun || "this domain")}. Labelling everything is the failure mode this exercise catches.</span>`;
    }
    return fb;
  }

  function annotationConfusionNote(data, chosen, actual) {
    if (!chosen || chosen === "none" || !data.constructs[chosen]) return "";
    const a = data.constructs[chosen];
    const b = data.constructs[actual];
    const related = (a.confusable || []).includes(actual) || (b.confusable || []).includes(chosen);
    if (!related) return "";
    return `<span class="fb-confusion"><strong>Common confusion:</strong> ${escapeHtml(a.label)} vs ${escapeHtml(b.label)} — ${escapeHtml(a.definition)} <em>Compare with:</em> ${escapeHtml(b.definition)}</span>`;
  }

  function openPopover(trigger) {
    activeId = trigger.dataset.id;
    const current = (state.assignments[state.story] || {})[activeId] || null;
    popover.innerHTML = "";

    popover.appendChild(groupLabel("Capabilities"));
    Object.keys(data.constructs).forEach(key => {
      popover.appendChild(option(key, data.constructs[key].label, current === key, false));
    });

    if (data.decoys && data.decoys.length) {
      popover.appendChild(separator());
      popover.appendChild(groupLabel("Other systems (never correct)"));
      data.decoys.forEach(label => popover.appendChild(option("decoy:" + label, label, false, true)));
    }

    popover.appendChild(separator());
    popover.appendChild(option("none", "No event here", current === "none", false));
    popover.appendChild(option("skip", "Skip — not sure", false, true));

    popover.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
    positionAnnotationPopover(trigger);
    const first = popover.querySelector(".popover-item");
    if (first) first.focus();
  }

  function groupLabel(text) {
    const el = document.createElement("div");
    el.className = "popover-group";
    el.textContent = text;
    return el;
  }

  function separator() {
    const el = document.createElement("div");
    el.className = "popover-sep";
    return el;
  }

  function option(value, label, selected, special) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "popover-item" + (special ? " special" : "");
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", String(selected));
    btn.dataset.value = value;
    btn.textContent = label;
    btn.addEventListener("click", () => choose(value));
    return btn;
  }

  function choose(value) {
    if (!activeId) return;
    const assignments = state.assignments[state.story] || (state.assignments[state.story] = {});
    if (value === "skip") delete assignments[activeId];
    else if (value.indexOf("decoy:") === 0) assignments[activeId] = value.slice(6);
    else assignments[activeId] = value;

    state.evaluated[state.story] = false;
    state.revealed[state.story] = false;
    saveAnnotationState(domain.id, state);
    closeAnnotationPopover();
    renderStory();
  }

  function closeAnnotationPopover() {
    popover.classList.remove("open");
    root.querySelectorAll(".tag-trigger[aria-expanded='true']").forEach(t => t.setAttribute("aria-expanded", "false"));
    activeId = null;
  }

  function positionAnnotationPopover(trigger) {
    const rect = trigger.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const viewW = document.documentElement.clientWidth;
    const viewH = document.documentElement.clientHeight;

    popover.style.left = "0px";
    popover.style.top = "0px";
    const w = popover.offsetWidth;
    const h = popover.offsetHeight;

    let left = rect.left + scrollX;
    let top = rect.bottom + scrollY + 8;
    if (left + w > scrollX + viewW - 10) left = scrollX + viewW - w - 10;
    if (left < 10) left = 10;
    if (top + h > scrollY + viewH - 10) top = rect.top + scrollY - h - 8;
    if (top < scrollY + 10) top = scrollY + 10;

    popover.style.left = left + "px";
    popover.style.top = top + "px";
  }

  function renderAnnotationScore() {
    const panel = root.querySelector("#annotation-score");
    const evaluated = state.evaluated[state.story];
    const revealed = state.revealed[state.story];
    if (!evaluated && !revealed) { panel.classList.remove("visible"); return; }

    const s = annotationScore(data, state.story, state.assignments[state.story] || {});
    panel.classList.add("visible");
    root.querySelector("#annotation-grid").innerHTML = [
      scoreCell("Hits", `${s.hits} / ${s.targets}`, s.hits === s.targets ? "good" : ""),
      scoreCell("Misses", `${s.misses} / ${s.targets}`, s.misses === 0 ? "good" : "bad"),
      scoreCell("False alarms", `${s.falseAlarms} / ${s.decoys}`, s.falseAlarms === 0 ? "good" : "bad"),
      scoreCell("Correct rejections", `${s.rejections} / ${s.decoys}`, s.rejections === s.decoys ? "good" : "")
    ].join("");
    root.querySelector("#annotation-verdict").innerHTML = annotationVerdict(s);
    root.querySelector("#annotation-confusions").innerHTML = annotationConfusionList();
  }

  function scoreCell(label, value, cls) {
    return `<div class="score-cell ${cls}"><span class="label">${label}</span><span class="value">${value}</span></div>`;
  }

  function annotationVerdict(s) {
    const precision = s.hits + s.falseAlarms > 0 ? Math.round(s.hits / (s.hits + s.falseAlarms) * 100) : 0;
    if (s.hits === s.targets && s.falseAlarms === 0) {
      return "<strong>Clean pass.</strong> Every event found, nothing over-labelled. Try the other story — the same capabilities appear in a different setting.";
    }
    if (s.falseAlarms > s.hits) {
      return `<strong>Over-labelling.</strong> You are finding this domain's capabilities in passages that belong to another system. Precision is ${precision}%. Ask of each passage: is this <em>control</em>, or merely <em>processing</em>?`;
    }
    if (s.misses > s.hits) {
      return "<strong>Under-labelling.</strong> Most events went unmarked. Look for passages where the character chooses, suppresses, reorders, or corrects.";
    }
    return `<strong>Partial.</strong> ${s.hits} of ${s.targets} found, ${s.falseAlarms} false alarm${s.falseAlarms === 1 ? "" : "s"}. Precision is ${precision}%. Review the definitions under each passage.`;
  }

  function annotationConfusionList() {
    const assignments = state.assignments[state.story] || {};
    const rows = [];
    annotationSegments(data, state.story).forEach(seg => {
      const assigned = assignments[seg.id];
      if (!assigned || assigned === seg.answer || seg.answer === "none") return;
      if (!data.constructs[assigned]) return;
      const a = data.constructs[assigned];
      const b = data.constructs[seg.answer];
      const related = (a.confusable || []).includes(seg.answer) || (b.confusable || []).includes(assigned);
      if (!related) return;
      rows.push(`<li><span class="pair">${escapeHtml(a.label)} → ${escapeHtml(b.label)}</span><br>${escapeHtml(a.definition)}<br><em>${escapeHtml(b.definition)}</em></li>`);
    });
    return rows.join("");
  }

  function updateAnnotationProgress() {
    Object.keys(data.stories).forEach(id => {
      const el = root.querySelector(`[data-progress="${id}"]`);
      if (!el) return;
      const done = state.evaluated[id] || state.revealed[id];
      const s = annotationScore(data, id, state.assignments[id] || {});
      el.textContent = done ? `${s.hits}/${s.targets}` : "";
    });
  }

  // ---- events ----
  document.addEventListener("click", event => {
    if (!popover.classList.contains("open")) return;
    if (popover.contains(event.target)) return;
    if (event.target.closest && event.target.closest(".tag-trigger")) return;
    closeAnnotationPopover();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") { closeAnnotationPopover(); return; }
    if (!popover.classList.contains("open")) return;
    const items = [...popover.querySelectorAll(".popover-item")];
    const idx = items.indexOf(document.activeElement);
    if (event.key === "ArrowDown") { event.preventDefault(); items[Math.min(idx + 1, items.length - 1)].focus(); }
    if (event.key === "ArrowUp") { event.preventDefault(); items[Math.max(idx - 1, 0)].focus(); }
  });

  storyEl.addEventListener("click", event => {
    const trigger = event.target.closest(".tag-trigger");
    if (!trigger) return;
    event.stopPropagation();
    if (popover.classList.contains("open") && activeId === trigger.dataset.id) closeAnnotationPopover();
    else { closeAnnotationPopover(); openPopover(trigger); }
  });

  root.querySelectorAll(".story-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      closeAnnotationPopover();
      state.story = tab.dataset.story;
      saveAnnotationState(domain.id, state);
      renderStory();
    });
  });

  root.querySelector("#annotation-evaluate").addEventListener("click", () => {
    state.evaluated[state.story] = true;
    state.revealed[state.story] = false;
    saveAnnotationState(domain.id, state);
    renderStory();
  });

  root.querySelector("#annotation-reveal").addEventListener("click", () => {
    state.revealed[state.story] = true;
    state.evaluated[state.story] = false;
    saveAnnotationState(domain.id, state);
    renderStory();
  });

  root.querySelector("#annotation-reset").addEventListener("click", () => {
    state.assignments[state.story] = {};
    state.evaluated[state.story] = false;
    state.revealed[state.story] = false;
    saveAnnotationState(domain.id, state);
    closeAnnotationPopover();
    renderStory();
  });

  renderStory();
}

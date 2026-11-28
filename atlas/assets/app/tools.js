// Tool-selection exercise, generated from a domain's own Human ↔ Tool ↔ AI mappings.
// Each mapping row is [humanFunction, externalTool, aiExtension, guardrail].
// The exercise asks: given a situation, which function is being extended, and what
// is the guardrail? It turns the read-only mapping table into something you can fail.

var toolState = null;

function toolStorageKey(domainId) {
  return `${storagePrefix}tools:${domainId}`;
}

function loadToolState(domainId) {
  try {
    const saved = JSON.parse(localStorage.getItem(toolStorageKey(domainId)) || "null");
    if (saved && saved.answers) return saved;
  } catch (error) { /* ignore */ }
  return { answers: {}, checked: false };
}

function saveToolState(domainId, state) {
  try { localStorage.setItem(toolStorageKey(domainId), JSON.stringify(state)); } catch (error) { /* ignore */ }
}

// Builds one question per mapping row: a situation, four candidate functions,
// and a follow-up asking for the guardrail.
// The answer is tracked by value, not by index, so shuffling cannot desynchronise it.
function buildToolQuestions(domain) {
  const rows = domain.mappings || [];
  if (rows.length < 2) return [];

  return rows.map((row, index) => {
    const [fn, tool, ai, guardrail] = row;
    const others = rows.filter((_, i) => i !== index).map(r => r[0]);
    const options = shuffleDeterministic([fn, ...others.slice(0, 3)], index + 1);
    const guardrailOptions = shuffleDeterministic(
      [guardrail, ...rows.filter((_, i) => i !== index).map(r => r[3]).slice(0, 2)],
      index + 11
    );
    return {
      id: `tool-${index}`,
      function: fn,
      tool,
      ai,
      guardrail,
      options,
      answerValue: fn,
      guardrailOptions,
      guardrailValue: guardrail
    };
  });
}

function shuffleDeterministic(list, seed) {
  const out = [...list];
  let state = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function renderToolExercise(domain) {
  const root = document.querySelector("#tools-root");
  if (!root) return;

  const questions = buildToolQuestions(domain);
  if (!questions.length) {
    root.innerHTML = `<section class="panel"><h1>No tool mapping yet</h1>
      <p>This domain does not have Human ↔ Tool ↔ AI mappings. <a href="${domainHref(domain)}">Back to ${escapeHtml(domain.name)}</a>.</p></section>`;
    return;
  }

  const state = loadToolState(domain.id);
  toolState = state;
  document.title = `Tool selection · ${domain.name} · Atlas of Cognition`;

  root.innerHTML = `
    <nav class="breadcrumb"><a href="${Atlas.url("index.html")}">Atlas</a><span>/</span><a href="${domainHref(domain)}">${escapeHtml(domain.name)}</a><span>/</span><span>Tool selection</span></nav>
    <section class="domain-hero lens-hero">
      <div>
        <p class="eyebrow">Practice · ${escapeHtml(domain.shortName)}</p>
        <h1>Extend the function without confusing the tool for the mind</h1>
        <p>Each situation describes a tool doing work for a person. Name the human function being extended, then name the guardrail that keeps the tool honest.</p>
      </div>
    </section>
    <section class="section">
      <div class="instructions">
        <p><strong>Why this is harder than it looks.</strong> A tool that extends a function also creates a new failure mode. Naming the function is the easy half; naming the guardrail is the half that matters.</p>
      </div>
      <form class="quiz" id="tools-form">
        ${questions.map((q, i) => renderToolQuestion(q, i)).join("")}
      </form>
    </section>
    <section class="section">
      <div class="controls">
        <button class="primary-button" id="tools-check" type="button">Check answers</button>
        <button class="plain-button" id="tools-reset" type="button">Clear answers</button>
      </div>
      <div class="score-panel" id="tools-score">
        <div class="score-grid" id="tools-grid"></div>
        <div class="verdict" id="tools-verdict"></div>
      </div>
    </section>
    <nav class="lens-switch">
      <a class="plain-button" href="${Atlas.url(`${domain.id}/annotation.html`)}">Narrative annotation →</a>
      <a class="plain-button" href="${Atlas.url(`${domain.id}/quiz.html`)}">Take the assessment →</a>
    </nav>`;

  const form = root.querySelector("#tools-form");

  root.querySelector("#tools-check").addEventListener("click", () => {
    let fnCorrect = 0;
    let guardCorrect = 0;

    questions.forEach((q, i) => {
      const fieldset = form.querySelector(`[data-q="${i}"]`);
      const fnPick = fieldset.querySelector(`input[name="fn-${i}"]:checked`);
      const guardPick = fieldset.querySelector(`input[name="guard-${i}"]:checked`);
      const fnOk = fnPick && q.options[Number(fnPick.value)] === q.answerValue;
      const guardOk = guardPick && q.guardrailOptions[Number(guardPick.value)] === q.guardrailValue;
      if (fnOk) fnCorrect++;
      if (guardOk) guardCorrect++;

      const fb = fieldset.querySelector(".feedback");
      fb.className = `feedback visible ${fnOk && guardOk ? "correct" : "incorrect"}`;
      fb.innerHTML = [
        `<span class="fb-head">${fnOk ? "✓" : "✗"} Function: ${escapeHtml(q.function)}</span>`,
        `<span class="fb-def">Tool: ${escapeHtml(q.tool)} · AI: ${escapeHtml(q.ai)}</span>`,
        `<span class="fb-confusion"><strong>Guardrail:</strong> ${escapeHtml(q.guardrail)}</span>`
      ].join("");
    });

    const total = questions.length * 2;
    const score = Math.round((fnCorrect + guardCorrect) / total * 100);
    const panel = root.querySelector("#tools-score");
    panel.classList.add("visible");
    root.querySelector("#tools-grid").innerHTML = [
      cell("Functions named", `${fnCorrect} / ${questions.length}`, fnCorrect === questions.length ? "good" : ""),
      cell("Guardrails named", `${guardCorrect} / ${questions.length}`, guardCorrect === questions.length ? "good" : ""),
      cell("Overall", `${score}%`, score >= 80 ? "good" : score < 50 ? "bad" : "")
    ].join("");
    root.querySelector("#tools-verdict").innerHTML = score >= 80
      ? "<strong>Strong.</strong> You can separate the function from the tool and name what the tool costs. That distinction is the whole point of this section."
      : "<strong>Review the mapping table.</strong> The function is what the person does; the tool is what carries part of it; the guardrail is what the tool cannot do for you.";
  });

  root.querySelector("#tools-reset").addEventListener("click", () => {
    form.reset();
    form.querySelectorAll(".feedback").forEach(fb => { fb.className = "feedback"; fb.innerHTML = ""; });
    root.querySelector("#tools-score").classList.remove("visible");
  });
}

function renderToolQuestion(q, index) {
  return `
    <fieldset class="question" data-q="${index}">
      <legend>
        <span class="question-type">Situation ${index + 1}</span>
        <h3>A team uses <strong>${escapeHtml(q.tool)}</strong> to support <em>${escapeHtml(q.ai.toLowerCase())}</em>. Which human function is being extended?</h3>
      </legend>
      <div class="options">
        ${q.options.map((opt, i) => `
          <label class="option"><input type="radio" name="fn-${index}" value="${i}"><span>${escapeHtml(opt)}</span></label>`).join("")}
      </div>
      <p class="question-hint">And what is the guardrail — what can this tool not do for you?</p>
      <div class="options">
        ${q.guardrailOptions.map((opt, i) => `
          <label class="option"><input type="radio" name="guard-${index}" value="${i}"><span>${escapeHtml(opt)}</span></label>`).join("")}
      </div>
      <p class="feedback" aria-live="polite"></p>
    </fieldset>`;
}

function cell(label, value, cls) {
  return `<div class="score-cell ${cls}"><span class="label">${label}</span><span class="value">${value}</span></div>`;
}

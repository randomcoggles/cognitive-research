// Bank-driven assessment and practice.
// An item bank is sampled to a blueprint for the scored assessment; practice uses
// the whole bank, optionally filtered to one lens.

function getBank(domainId) {
  return Atlas.data.itemBanks?.[domainId] || null;
}

// Deterministic shuffle so a given seed always yields the same form.
function seededShuffle(list, seed) {
  const out = [...list];
  let state = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Picks items to satisfy the blueprint, falling back to any unused item of the
// same level when a level is short, then to any unused item at all.
function sampleForm(bank, seed) {
  const pool = bank.items.filter(item => item.lens === bank.form.lens);
  const used = new Set();
  const picked = [];
  Object.entries(bank.form.blueprint).forEach(([level, count]) => {
    const candidates = seededShuffle(pool.filter(item => item.level === level && !used.has(item.id)), seed);
    candidates.slice(0, count).forEach(item => { used.add(item.id); picked.push(item); });
  });
  if (picked.length < bank.form.size) {
    const filler = seededShuffle(pool.filter(item => !used.has(item.id)), seed + 7);
    filler.slice(0, bank.form.size - picked.length).forEach(item => { used.add(item.id); picked.push(item); });
  }
  return seededShuffle(picked, seed + 13);
}

function bankStorageKey(domainId) {
  return `${storagePrefix}bank:${domainId}`;
}

function getBankResult(domainId) {
  try {
    return JSON.parse(localStorage.getItem(bankStorageKey(domainId)) || "null");
  } catch {
    return null;
  }
}

function setBankResult(domainId, value) {
  localStorage.setItem(bankStorageKey(domainId), JSON.stringify(value));
}

function renderBankQuestion(item, index) {
  const body = item.type === "Multiple select"
    ? `<p class="question-hint">Select all that apply.</p>
       <div class="options">${item.options.map((option, optionIndex) => `
         <label class="option"><input type="checkbox" name="q-${index}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join("")}</div>`
    : `<div class="options">${item.options.map((option, optionIndex) => `
         <label class="option"><input type="radio" name="q-${index}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join("")}</div>`;
  return `
    <fieldset class="question" data-question="${index}">
      <legend>
        <span class="question-type">${escapeHtml(item.level)}</span>
        <h3>${index + 1}. ${escapeHtml(item.prompt)}</h3>
      </legend>
      ${body}
      <p class="feedback" aria-live="polite"></p>
    </fieldset>`;
}

function gradeBankItem(item, fieldset, index) {
  if (item.type === "Multiple select") {
    const chosen = [...fieldset.querySelectorAll("input:checked")].map(input => Number(input.value));
    const hits = chosen.filter(value => item.answers.includes(value)).length;
    const misses = chosen.length - hits;
    return { credit: Math.max(0, (hits - misses) / item.answers.length), answered: chosen.length > 0 };
  }
  const selected = fieldset.querySelector("input:checked");
  return { credit: Number(selected?.value) === item.answer ? 1 : 0, answered: Boolean(selected) };
}

function renderBankQuiz(domain, mode) {
  const bank = getBank(domain.id);
  const root = document.querySelector("#bank-root");
  if (!root) return;
  if (!bank) {
    root.innerHTML = `<section class="panel"><h1>No item bank yet</h1>
      <p>This domain does not have a question bank yet. <a href="${domainHref(domain)}">Back to ${escapeHtml(domain.name)}</a>.</p></section>`;
    return;
  }

  const lensFilter = new URLSearchParams(location.search).get("lens");
  const items = mode === "practice"
    ? bank.items.filter(item => !lensFilter || item.lens === lensFilter)
    : sampleForm(bank, 1);

  const lensLabel = lensFilter ? ` · ${lensFilter} lens` : "";
  document.title = `${mode === "practice" ? "Practice" : "Assessment"} · ${domain.name} · Atlas of Cognition`;

  root.innerHTML = `
    <nav class="breadcrumb"><a href="${Atlas.url("index.html")}">Atlas</a><span>/</span><a href="${domainHref(domain)}">${escapeHtml(domain.name)}</a><span>/</span><span>${mode === "practice" ? "Practice" : "Assessment"}</span></nav>
    <section class="domain-hero lens-hero">
      <div>
        <p class="eyebrow">${mode === "practice" ? "Practice" : "Assessment"}${escapeHtml(lensLabel)}</p>
        <h1>${mode === "practice" ? "Practise the whole bank" : "Ten questions, sampled to a blueprint"}</h1>
        <p>${mode === "practice"
          ? `All ${items.length} items, with explanations. Nothing is scored or stored.`
          : `Ten items drawn from ${bank.items.length}, balanced across Bloom levels. Your score is stored in this browser.`}</p>
      </div>
    </section>
    <form class="quiz" id="bank-quiz">${items.map(renderBankQuestion).join("")}</form>
    <div class="quiz-actions">
      <button class="primary-button" id="bank-submit" type="button">Check answers</button>
      <button class="plain-button" id="bank-reset" type="button">Clear answers</button>
      ${mode === "practice" ? "" : `<a class="plain-button" href="${Atlas.url(`${domain.id}/quiz.html?mode=practice`)}">Practise instead →</a>`}
    </div>
    <div class="quiz-result" id="bank-result" aria-live="polite"></div>
    <nav class="lens-switch">
      <a class="plain-button" href="${Atlas.url(`${domain.id}/reader.html`)}">Reader lens</a>
      <a class="plain-button" href="${Atlas.url(`${domain.id}/creator.html`)}">Creator lens</a>
    </nav>`;

  const form = root.querySelector("#bank-quiz");
  root.querySelector("#bank-submit").addEventListener("click", () => {
    let credit = 0;
    let answered = 0;
    items.forEach((item, index) => {
      const fieldset = form.querySelector(`[data-question="${index}"]`);
      const feedback = fieldset.querySelector(".feedback");
      const result = gradeBankItem(item, fieldset, index);
      if (result.answered) answered += 1;
      credit += result.credit;
      const correct = result.credit === 1;
      feedback.className = `feedback visible ${correct ? "correct" : "incorrect"}`;
      feedback.textContent = `${!result.answered ? "No answer selected." : correct ? "Correct." : result.credit > 0 ? "Partly correct." : "Not quite."} ${item.explanation}`;
    });
    const score = Math.round(credit / items.length * 100);
    const resultBox = root.querySelector("#bank-result");
    if (mode === "practice") {
      resultBox.innerHTML = `<p class="eyebrow">Practice result</p><strong>${score}%</strong>
        <p>Practice is not stored. Use the assessment for a recorded score.</p>`;
    } else {
      const mastery = masteryForScore(score);
      const previous = getBankResult(domain.id);
      const attempts = Array.isArray(previous?.attempts) ? previous.attempts : [];
      const updatedAt = new Date().toISOString();
      setBankResult(domain.id, {
        completed: true, score, mastery, answered, total: items.length, updatedAt,
        attempts: [...attempts, { score, mastery, answered, total: items.length, updatedAt }]
      });
      resultBox.innerHTML = `<p class="eyebrow">Assessment result</p><strong>${score}% · ${masteryLabels[mastery]}</strong>
        <p>${score >= 80
          ? "Strong result. Apply the ideas in a fresh case before treating the domain as mastered."
          : "Review the explanations under each question, then try again. One short assessment cannot establish mastery."}</p>`;
    }
    resultBox.classList.add("visible");
  });
  root.querySelector("#bank-reset").addEventListener("click", () => {
    form.reset();
    form.querySelectorAll(".feedback").forEach(feedback => { feedback.className = "feedback"; feedback.textContent = ""; });
    root.querySelector("#bank-result").classList.remove("visible");
  });
}

const reflectionPrompts = {
  attention: "Describe a recent time your attention was captured or split. What pulled it, and what would you change in your setup?",
  memory: "Recall a time you forgot something important or misremembered a source. Which memory system failed, and what external support would have helped?",
  executive: "Think of a goal you lost track of mid-task. What kept it from guiding your behavior, and how could you keep it visible?",
  knowledge: "Name a schema or mental model that helped you understand something recently, and one that misled you. What was the difference?",
  reasoning: "Describe a conclusion you reached too quickly. Which reasoning type did you use, and what alternative did you skip?",
  learning: "Pick a skill you are learning. Which of your current practices is retrieval or deliberate practice, and which is just re-reading?",
  creativity: "Recall a problem you were stuck on. How did the way you framed it limit your options, and what reframing could open new ones?",
  social: "Think of a recent misunderstanding with a colleague. What did they know or want that you had not accounted for?",
  "self-regulation": "Describe a moment strong emotion or fatigue changed a decision. What cue could help you notice it earlier next time?",
  future: "Take a plan you are working on and imagine it failed a year from now. What are the three most likely reasons?",
  decision: "Describe a recent decision. Was it recognition-based or analytical, and what trade-off did you not state at the time?",
  metacognition: "Describe a time poor monitoring of your own thinking led to a mistake. What signal could have told you to change strategy?"
};

function reflectionNoteId(domain) {
  return `reflection-${domain.id}`;
}

function renderReflection(domain) {
  const prompt = reflectionPrompts[domain.id];
  if (!prompt) return "";
  const saved = getStoredNotes().find(note => note.id === reflectionNoteId(domain));
  return `
    <fieldset class="question reflection-block">
      <legend>
        <span class="question-type">Reflection</span>
        <h3>${prompt}</h3>
      </legend>
      <p class="question-hint">Not scored. Saved in this browser as a note and included in your export.</p>
      <textarea class="reflection-input" name="reflection" rows="4" aria-label="Your reflection">${escapeHtml(saved?.text || "")}</textarea>
      <div class="quiz-actions"><button class="plain-button" id="save-reflection" type="button">Save reflection</button>
      <span class="form-status" id="reflection-status" aria-live="polite">${saved ? "Saved." : ""}</span></div>
    </fieldset>`;
}

function setupReflection(domain) {
  const button = document.querySelector("#save-reflection");
  if (!button) return;
  button.addEventListener("click", () => {
    const input = document.querySelector("#quiz .reflection-input");
    const status = document.querySelector("#reflection-status");
    const text = input.value.trim();
    if (!text) {
      status.textContent = "Write a reflection before saving.";
      return;
    }
    const now = new Date().toISOString();
    const notes = getStoredNotes();
    const id = reflectionNoteId(domain);
    const existing = notes.findIndex(note => note.id === id);
    const note = {
      id,
      domainId: domain.id,
      sectionId: "assessment",
      sectionTitle: "Reflection",
      type: "custom",
      customType: "Reflection",
      text,
      completed: false,
      createdAt: existing >= 0 ? notes[existing].createdAt : now,
      updatedAt: now
    };
    if (existing >= 0) notes[existing] = note;
    else notes.push(note);
    try {
      setStoredNotes(notes);
      input.defaultValue = text;
      status.textContent = "Saved.";
    } catch (error) {
      console.error("Could not save Atlas reflection.", error);
      status.textContent = "The reflection could not be saved. Browser storage may be full or unavailable.";
    }
  });
}

function normalizeQuestion([type, prompt, options, answer, explanation]) {
  return { kind: "single", type, prompt, options, answer, explanation };
}

function getQuestions(domain) {
  return domain.quiz.map(question => Array.isArray(question) ? normalizeQuestion(question) : question);
}

function positionOptions(count) {
  return Array.from({ length: count }, (_, index) => `<option value="${index}">${index + 1}</option>`).join("");
}

function renderQuestionBody(question, index) {
  if (question.kind === "multi") {
    return `<p class="question-hint">Select all that apply.</p>
      <div class="options">${question.options.map((option, optionIndex) => `
        <label class="option">
          <input type="checkbox" name="question-${index}" value="${optionIndex}">
          <span>${option}</span>
        </label>`).join("")}</div>`;
  }
  if (question.kind === "matching") {
    const rights = question.pairs.map(([, right]) => right).sort((a, b) => a.localeCompare(b));
    return `<p class="question-hint">Match each item with its best partner.</p>
      <div class="match-list">${question.pairs.map(([left], pairIndex) => `
        <label class="match-row">
          <span>${left}</span>
          <select name="question-${index}-${pairIndex}">
            <option value="">Choose…</option>
            ${rights.map(right => `<option value="${escapeHtml(right)}">${right}</option>`).join("")}
          </select>
        </label>`).join("")}</div>`;
  }
  if (question.kind === "ordering") {
    const shuffled = question.items.map((item, itemIndex) => [item, itemIndex]).reverse();
    return `<p class="question-hint">Give each step its position in the sequence.</p>
      <div class="match-list">${shuffled.map(([item, itemIndex]) => `
        <label class="match-row">
          <span>${item}</span>
          <select name="question-${index}-${itemIndex}">
            <option value="">Position…</option>
            ${positionOptions(question.items.length)}
          </select>
        </label>`).join("")}</div>`;
  }
  return `<div class="options">${question.options.map((option, optionIndex) => `
    <label class="option">
      <input type="radio" name="question-${index}" value="${optionIndex}">
      <span>${option}</span>
    </label>`).join("")}</div>`;
}

// Returns { credit: 0..1, answered } for one question.
function gradeQuestion(question, fieldset, index) {
  if (question.kind === "multi") {
    const chosen = [...fieldset.querySelectorAll("input:checked")].map(input => Number(input.value));
    const hits = chosen.filter(value => question.answers.includes(value)).length;
    const misses = chosen.length - hits;
    return { credit: Math.max(0, (hits - misses) / question.answers.length), answered: chosen.length > 0 };
  }
  if (question.kind === "matching" || question.kind === "ordering") {
    const expected = question.kind === "matching"
      ? question.pairs.map(([, right]) => right)
      : question.items.map((_, itemIndex) => String(itemIndex));
    const values = expected.map((_, itemIndex) => fieldset.querySelector(`[name="question-${index}-${itemIndex}"]`).value);
    const hits = values.filter((value, itemIndex) => value === expected[itemIndex]).length;
    return { credit: hits / expected.length, answered: values.some(value => value !== "") };
  }
  const selected = fieldset.querySelector("input:checked");
  return { credit: Number(selected?.value) === question.answer ? 1 : 0, answered: Boolean(selected) };
}

function renderQuiz(domain) {
  const quiz = document.querySelector("#quiz");
  quiz.innerHTML = getQuestions(domain).map((question, questionIndex) => `
    <fieldset class="question" data-question="${questionIndex}">
      <legend>
        <span class="question-type">${question.type}</span>
        <h3>${questionIndex + 1}. ${question.prompt}</h3>
      </legend>
      ${renderQuestionBody(question, questionIndex)}
      <p class="feedback" aria-live="polite"></p>
    </fieldset>`).join("") + renderReflection(domain);
  setupReflection(domain);
  const stored = getStoredResult(domain.id);
  if (stored?.completed) {
    showQuizResult(domain, stored.score, stored.mastery, false);
  }
  document.querySelector("#submit-quiz").addEventListener("click", () => gradeQuiz(domain));
  document.querySelector("#reset-quiz").addEventListener("click", () => {
    quiz.reset();
    quiz.querySelectorAll(".feedback").forEach(feedback => {
      feedback.className = "feedback";
      feedback.textContent = "";
    });
    document.querySelector("#quiz-result").classList.remove("visible");
  });
}

function gradeQuiz(domain) {
  const quiz = document.querySelector("#quiz");
  const questions = getQuestions(domain);
  let correct = 0;
  let answered = 0;
  questions.forEach((question, index) => {
    const fieldset = quiz.querySelector(`[data-question="${index}"]`);
    const feedback = fieldset.querySelector(".feedback");
    const result = gradeQuestion(question, fieldset, index);
    if (result.answered) answered += 1;
    correct += result.credit;
    const isCorrect = result.credit === 1;
    const label = !result.answered ? "No answer selected." : isCorrect ? "Correct." : result.credit > 0 ? "Partly correct." : "Not quite.";
    feedback.className = `feedback visible ${isCorrect ? "correct" : "incorrect"}`;
    feedback.textContent = `${label} ${question.explanation}`;
  });
  const score = Math.round(correct / questions.length * 100);
  const mastery = masteryForScore(score);
  const updatedAt = new Date().toISOString();
  const previous = getStoredResult(domain.id);
  const attempts = Array.isArray(previous?.attempts)
    ? previous.attempts
    : previous?.completed
      ? [{
          score: previous.score,
          mastery: previous.mastery,
          answered: previous.answered,
          total: previous.total,
          updatedAt: previous.updatedAt
        }]
      : [];
  const result = {
    completed: true,
    score,
    mastery,
    answered,
    total: questions.length,
    updatedAt,
    attempts: [...attempts, { score, mastery, answered, total: questions.length, updatedAt }]
  };
  setStoredResult(domain.id, result);
  showQuizResult(domain, score, mastery, true);
  updateProgress();
}

function showQuizResult(domain, score, mastery, scroll) {
  const result = document.querySelector("#quiz-result");
  result.innerHTML = `
    <p class="eyebrow">Assessment result</p>
    <strong>${score}% · ${masteryLabels[mastery]}</strong>
    <p>${score >= 80
      ? "Strong result for this introductory assessment. Apply the ideas in a fresh workplace case before treating the domain as mastered."
      : "Review the explanations above and the feedback under each question, then try again. One short quiz cannot establish mastery."}</p>
    <div class="mastery-scale">
      ${masteryLabels.map((label, index) => `<span class="mastery-step ${index === mastery ? "active" : ""}">${index}<br>${label}</span>`).join("")}
    </div>`;
  result.classList.add("visible");
  if (scroll) result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderNextPrevious(domain) {
  const index = readyDomains.findIndex(entry => entry.id === domain.id);
  const previous = readyDomains[index - 1];
  const next = readyDomains[index + 1];
  document.querySelector("#next-domain").innerHTML = `
    <span>${previous ? `<a href="${domainHref(previous)}">← ${previous.name}</a>` : `<a href="${Atlas.url("index.html")}">← Atlas home</a>`}</span>
    <span>${next ? `<a href="${domainHref(next)}">${next.name} →</a>` : `<a href="${Atlas.url("index.html#roadmap")}">Release roadmap →</a>`}</span>`;
}


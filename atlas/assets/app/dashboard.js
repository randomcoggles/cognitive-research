function getLearningExport() {
  return {
    format: exportFormat,
    version: exportVersion,
    exportedAt: new Date().toISOString(),
    notes: getStoredNotes(),
    conceptLevels: getConceptLevels(),
    quizResults: Object.fromEntries(readyDomains
      .map(domain => [domain.id, getStoredResult(domain.id)])
      .filter(([, result]) => result))
  };
}

function validateImportedData(data) {
  if (!data || data.format !== exportFormat || data.version !== exportVersion) {
    throw new Error("This is not a supported Atlas learning-data file.");
  }
  if (!Array.isArray(data.notes) || !data.quizResults || typeof data.quizResults !== "object") {
    throw new Error("The Atlas file is missing notes or quiz results.");
  }
  data.notes.forEach(note => {
    const valid = note
      && typeof note.id === "string"
      && typeof note.domainId === "string"
      && typeof note.sectionId === "string"
      && typeof note.sectionTitle === "string"
      && noteTypes.includes(note.type)
      && typeof note.text === "string"
      && typeof note.createdAt === "string"
      && typeof note.updatedAt === "string";
    if (!valid) throw new Error("The Atlas file contains an invalid note.");
  });
  Object.entries(data.quizResults).forEach(([domainId, result]) => {
    const valid = readyDomains.some(domain => domain.id === domainId)
      && result
      && typeof result.score === "number"
      && typeof result.mastery === "number"
      && typeof result.updatedAt === "string";
    if (!valid) throw new Error("The Atlas file contains an invalid quiz result.");
  });
  Object.entries(data.conceptLevels || {}).forEach(([conceptId, level]) => {
    const valid = allConcepts.some(concept => concept.id === conceptId)
      && Number.isInteger(level) && level >= 1 && level < masteryLabels.length;
    if (!valid) throw new Error("The Atlas file contains an invalid concept level.");
  });
}

function importLearningData(data, mode) {
  validateImportedData(data);
  if (mode === "replace") {
    setStoredNotes(data.notes);
    readyDomains.forEach(domain => localStorage.removeItem(`${storagePrefix}${domain.id}`));
    Object.entries(data.quizResults).forEach(([domainId, result]) => setStoredResult(domainId, result));
    localStorage.setItem(levelsStorageKey, JSON.stringify(data.conceptLevels || {}));
    return;
  }
  const notesById = new Map(getStoredNotes().map(note => [note.id, note]));
  data.notes.forEach(note => {
    const existing = notesById.get(note.id);
    if (!existing || note.updatedAt > existing.updatedAt) notesById.set(note.id, note);
  });
  setStoredNotes([...notesById.values()]);
  Object.entries(data.quizResults).forEach(([domainId, result]) => {
    const existing = getStoredResult(domainId);
    if (!existing || result.updatedAt > existing.updatedAt) setStoredResult(domainId, result);
  });
  Object.entries(data.conceptLevels || {}).forEach(([conceptId, level]) => {
    if (level > (getConceptLevels()[conceptId] || 0)) setConceptLevel(conceptId, level);
  });
}

function renderDashboard() {
  const initialized = document.body.dataset.dashboardReady === "true";
  const notes = getStoredNotes();
  const completedResults = readyDomains
    .map(domain => ({ domain, result: getStoredResult(domain.id) }))
    .filter(entry => entry.result?.completed);
  const average = completedResults.length
    ? Math.round(completedResults.reduce((sum, entry) => sum + entry.result.score, 0) / completedResults.length)
    : 0;
  const questions = notes.filter(note => note.type === "question").length;
  const openTasks = notes.filter(note => note.type === "task" && !note.completed).length;
  document.querySelector("#dashboard-stats").innerHTML = [
    ["Notes", notes.length, "Across all domain sections"],
    ["Questions", questions, "Ideas waiting to be resolved"],
    ["Open tasks", openTasks, "Actions in your learning workflow"],
    ["Assessments", `${completedResults.length}/${readyDomains.length}`, `${average}% average on completed quizzes`]
  ].map(([label, value, detail]) => `
    <article class="stat-card"><span>${label}</span><strong>${value}</strong><p>${detail}</p></article>`).join("");

  document.querySelector("#quiz-dashboard").innerHTML = readyDomains.map(domain => {
    const result = getStoredResult(domain.id);
    const attempts = result?.attempts?.length || (result?.completed ? 1 : 0);
    return `
      <article class="quiz-summary" style="--domain-color:${domain.color}">
        <div>
          <span class="domain-number">DOMAIN ${domain.number}</span>
          <h3>${domain.name}</h3>
        </div>
        ${result?.completed ? `
          <strong>${result.score}%</strong>
          <p>${masteryLabels[result.mastery]} · ${attempts} ${attempts === 1 ? "attempt" : "attempts"} · ${formatDate(result.updatedAt)}</p>
        ` : '<strong>—</strong><p>Not assessed yet</p>'}
        <a href="${domainSectionHref(domain, "assessment")}">${result?.completed ? "Review assessment" : "Take assessment"} →</a>
      </article>`;
  }).join("");

  const domainFilter = document.querySelector("#notes-domain-filter");
  const selectedDomain = domainFilter.value;
  domainFilter.innerHTML = `
    <option value="">All domains</option>
    ${readyDomains.map(domain => `<option value="${domain.id}">${domain.name}</option>`).join("")}`;
  domainFilter.value = selectedDomain;
  const renderFilteredNotes = () => {
    const query = document.querySelector("#notes-search").value.trim().toLowerCase();
    const domainId = domainFilter.value;
    const type = document.querySelector("#notes-type-filter").value;
    const matches = getStoredNotes()
      .filter(note => !domainId || note.domainId === domainId)
      .filter(note => !type || note.type === type)
      .filter(note => !query || `${note.text} ${note.sectionTitle} ${noteTypeLabel(note)}`.toLowerCase().includes(query))
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    document.querySelector("#dashboard-notes").innerHTML = matches.length
      ? matches.map(note => renderNoteCard(note, true)).join("")
      : '<div class="panel empty-state">No notes match these filters. Add notes from any domain section.</div>';
  };
  if (!initialized) {
    document.querySelector("#notes-search").addEventListener("input", renderFilteredNotes);
    domainFilter.addEventListener("change", renderFilteredNotes);
    document.querySelector("#notes-type-filter").addEventListener("change", renderFilteredNotes);
    document.querySelector("#dashboard-notes").addEventListener("click", event => {
      const action = event.target.closest("[data-note-action]");
      if (!action) return;
      const noteId = action.dataset.noteId;
      if (action.dataset.noteAction === "delete" && confirm("Delete this note?")) {
        setStoredNotes(getStoredNotes().filter(note => note.id !== noteId));
        renderDashboard();
      }
      if (action.dataset.noteAction === "toggle-task") {
        setStoredNotes(getStoredNotes().map(note => note.id === noteId
          ? { ...note, completed: !note.completed, updatedAt: new Date().toISOString() }
          : note));
        renderDashboard();
      }
    });
    setupLearningDataTransfer();
    document.body.dataset.dashboardReady = "true";
  }
  renderFilteredNotes();
}

function setupLearningDataTransfer() {
  const status = document.querySelector("#transfer-status");
  document.querySelector("#export-learning-data").addEventListener("click", () => {
    try {
      const blob = new Blob([JSON.stringify(getLearningExport(), null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `atlas-learning-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
      status.textContent = "Export created. Move this JSON file to your other device and import it there.";
    } catch (error) {
      console.error("Could not export Atlas learning data.", error);
      status.textContent = "The export could not be created.";
    }
  });
  document.querySelector("#import-learning-data").addEventListener("click", () => {
    document.querySelector("#learning-data-file").click();
  });
  document.querySelector("#learning-data-file").addEventListener("change", async event => {
    const [file] = event.target.files;
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const mode = document.querySelector("#import-mode").value;
      importLearningData(data, mode);
      status.textContent = `${mode === "replace" ? "Replaced" : "Merged"} local learning data from ${file.name}.`;
      renderDashboard();
    } catch (error) {
      console.error("Could not import Atlas learning data.", error);
      status.textContent = error instanceof Error ? error.message : "The selected file could not be imported.";
    } finally {
      event.target.value = "";
    }
  });
}


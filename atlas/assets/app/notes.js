let activeNotePanel = null;

function noteFormSnapshot(form) {
  return [form.elements.noteId.value, form.elements.type.value, form.elements.customType.value, form.elements.text.value].join("\u0000");
}

document.addEventListener("click", event => {
  if (!activeNotePanel) return;
  // The toolbar and the panel are siblings, so both must count as "inside".
  if (activeNotePanel.contains(event.target)) return;
  if (activeNotePanel.isDirty()) return;
  activeNotePanel.close();
});

function renderSectionNotes(domain) {
  document.querySelectorAll(".section").forEach((section, index) => {
    const header = section.querySelector(".section-header");
    if (!header) return;
    if (!section.id) section.id = index === 0 ? "objectives" : `section-${index + 1}`;
    const title = header.querySelector("h2")?.textContent?.trim() || "Section";
    // Notes sit after the section content they annotate, not beside its heading.
    const footer = document.createElement("div");
    footer.className = "section-notes";
    const control = document.createElement("div");
    control.className = "section-note-control";
    control.dataset.sectionId = section.id;
    control.dataset.sectionTitle = title;
    const panelHost = document.createElement("div");
    panelHost.className = "section-note-panel-host";
    footer.append(control, panelHost);
    section.append(footer);
    renderSectionNoteControl(control, domain, panelHost);
  });
}

function noteFormMarkup() {
  return `
      <form class="note-form">
        <input name="noteId" type="hidden">
        <div class="note-fields">
          <label>
            <span>Type</span>
            <select name="type">
              <option value="comment">Comment</option>
              <option value="question">Question</option>
              <option value="task">Task</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          <label class="custom-type-field" hidden>
            <span>Custom label</span>
            <input name="customType" type="text" maxlength="40" placeholder="e.g. hypothesis">
          </label>
        </div>
        <label>
          <span>Your note</span>
          <textarea name="text" rows="4" maxlength="4000" required placeholder="Capture a comment, question, task, or your own note type…"></textarea>
        </label>
        <div class="note-form-actions">
          <button class="primary-button" type="submit">Save note</button>
          <button class="plain-button cancel-note" type="button" hidden>Cancel edit</button>
        </div>
        <p class="form-status" role="status"></p>
      </form>`;
}

// Persists the note described by the form; returns true when the note was stored.
function saveNoteFromForm(form, status, { domainId, sectionId, sectionTitle }) {
  const text = form.elements.text.value.trim();
  const selectedType = form.elements.type.value;
  const customType = form.elements.customType.value.trim();
  if (!text || !noteTypes.includes(selectedType)) {
    status.textContent = "Enter a note and choose a valid type.";
    return false;
  }
  if (selectedType === "custom" && !customType) {
    status.textContent = "Enter a label for the custom note type.";
    form.elements.customType.focus();
    return false;
  }
  const now = new Date().toISOString();
  const notesToSave = getStoredNotes();
  const noteId = form.elements.noteId.value;
  const existingIndex = notesToSave.findIndex(note => note.id === noteId);
  const note = {
    id: noteId || createId(),
    domainId,
    sectionId,
    sectionTitle,
    type: selectedType,
    customType: selectedType === "custom" ? customType : "",
    text,
    completed: existingIndex >= 0 ? Boolean(notesToSave[existingIndex].completed) : false,
    createdAt: existingIndex >= 0 ? notesToSave[existingIndex].createdAt : now,
    updatedAt: now
  };
  if (existingIndex >= 0) notesToSave[existingIndex] = note;
  else notesToSave.push(note);
  try {
    setStoredNotes(notesToSave);
    return true;
  } catch (error) {
    console.error("Could not save Atlas note.", error);
    status.textContent = "The note could not be saved. Browser storage may be full or unavailable.";
    return false;
  }
}

function renderSectionNoteControl(control, domain, panelHost) {
  if (activeNotePanel?.control === control) activeNotePanel = null;
  const sectionId = control.dataset.sectionId;
  const sectionTitle = control.dataset.sectionTitle;
  const notes = getStoredNotes()
    .filter(note => note.domainId === domain.id && note.sectionId === sectionId)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  // "closed" | "list" | "add" — kept on the element so saving or deleting a note
  // re-renders without collapsing the panel the reader just opened.
  const view = control.dataset.noteView || "closed";
  control.innerHTML = `
    <div class="note-view-toolbar" role="group" aria-label="Note view">
      <button class="plain-button note-view-button" type="button" data-note-view="list" aria-pressed="${view === "list"}">
        ${noteViewIcons.list}<span>${notes.length ? `${notes.length} ${notes.length === 1 ? "note" : "notes"}` : "Notes"}</span>
      </button>
      <button class="plain-button note-view-button" type="button" data-note-view="add" aria-pressed="${view === "add"}">
        ${noteViewIcons.add}<span>Add note</span>
      </button>
    </div>`;
  panelHost.innerHTML = `
    <div class="note-panel" ${view === "closed" ? "hidden" : ""}>
      <div class="note-editor" ${view === "add" ? "" : "hidden"}>
        ${noteFormMarkup()}
      </div>
      <div class="section-note-list">
        ${notes.length ? notes.map(note => renderNoteCard(note, false)).join("") : '<p class="empty-state">No notes in this section yet. Use “Add note” to capture one.</p>'}
      </div>
    </div>`;

  const panel = panelHost.querySelector(".note-panel");
  const editor = panelHost.querySelector(".note-editor");
  const form = panelHost.querySelector(".note-form");
  const type = form.elements.type;
  const customTypeField = panelHost.querySelector(".custom-type-field");
  const status = panelHost.querySelector(".form-status");

  let baseline = noteFormSnapshot(form);

  const setView = next => {
    control.dataset.noteView = next;
    panel.hidden = next === "closed";
    editor.hidden = next !== "add";
    control.querySelectorAll("[data-note-view]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.noteView === next));
    });
    if (next === "add") form.elements.text.focus();
  };

  const closePanel = () => {
    resetNoteForm(form, customTypeField);
    setView("closed");
    baseline = noteFormSnapshot(form);
    if (activeNotePanel?.control === control) activeNotePanel = null;
  };

  const registerPanel = () => {
    activeNotePanel = {
      control,
      close: closePanel,
      contains: target => control.contains(target) || panelHost.contains(target),
      isDirty: () => noteFormSnapshot(form) !== baseline
    };
  };

  control.querySelectorAll("[data-note-view]").forEach(button => {
    button.addEventListener("click", () => {
      if (activeNotePanel && activeNotePanel.control !== control) activeNotePanel.close();
      const next = button.dataset.noteView;
      // Clicking the active view button collapses the panel.
      if (control.dataset.noteView === next) {
        closePanel();
        return;
      }
      if (next === "add" && form.elements.noteId.value) {
        resetNoteForm(form, customTypeField);
      }
      setView(next);
      baseline = noteFormSnapshot(form);
      registerPanel();
    });
  });
  type.addEventListener("change", () => {
    customTypeField.hidden = type.value !== "custom";
    if (type.value === "custom") form.elements.customType.focus();
  });
  panelHost.querySelector(".cancel-note").addEventListener("click", closePanel);
  panelHost.querySelector(".section-note-list").addEventListener("click", event => {
    const action = event.target.closest("[data-note-action]");
    if (!action) return;
    const note = getStoredNotes().find(entry => entry.id === action.dataset.noteId);
    if (!note) return;
    if (action.dataset.noteAction === "edit") {
      if (activeNotePanel && activeNotePanel.control !== control) activeNotePanel.close();
      panel.hidden = false;
      form.elements.noteId.value = note.id;
      form.elements.type.value = note.type;
      form.elements.customType.value = note.customType || "";
      form.elements.text.value = note.text;
      customTypeField.hidden = note.type !== "custom";
      form.querySelector(".cancel-note").hidden = false;
      setView("add");
      baseline = noteFormSnapshot(form);
      registerPanel();
    }
    if (action.dataset.noteAction === "delete" && confirm("Delete this note?")) {
      setStoredNotes(getStoredNotes().filter(entry => entry.id !== note.id));
      renderSectionNoteControl(control, domain, panelHost);
    }
    if (action.dataset.noteAction === "toggle-task") {
      const updated = getStoredNotes().map(entry => entry.id === note.id
        ? { ...entry, completed: !entry.completed, updatedAt: new Date().toISOString() }
        : entry);
      setStoredNotes(updated);
      renderSectionNoteControl(control, domain, panelHost);
    }
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (saveNoteFromForm(form, status, { domainId: domain.id, sectionId, sectionTitle })) {
      renderSectionNoteControl(control, domain, panelHost);
    }
  });
}

function resetNoteForm(form, customTypeField) {
  form.reset();
  form.elements.noteId.value = "";
  customTypeField.hidden = true;
  form.querySelector(".cancel-note").hidden = true;
  form.querySelector(".form-status").textContent = "";
}

function renderNoteCard(note, includeLocation) {
  const domain = atlasDomains.find(entry => entry.id === note.domainId);
  const concept = allConcepts.find(entry => entry.domain === domain && entry.id === note.sectionId);
  const href = concept
    ? `${conceptHref(concept)}#concept-notes`
    : domain?.status === "ready" ? Atlas.url(`${domain.id}/index.html#${encodeURIComponent(note.sectionId)}`) : Atlas.url("index.html");
  return `
    <article class="note-card ${note.completed ? "completed" : ""}" data-note-id="${escapeHtml(note.id)}">
      <div class="note-card-meta">
        <span class="note-type type-${escapeHtml(note.type)}">${escapeHtml(noteTypeLabel(note))}</span>
        ${includeLocation ? `<a href="${href}">${escapeHtml(domain?.shortName || note.domainId)} · ${escapeHtml(note.sectionTitle)}</a>` : ""}
        <time datetime="${escapeHtml(note.updatedAt)}">${escapeHtml(formatDate(note.updatedAt))}</time>
      </div>
      <p>${escapeHtml(note.text).replaceAll("\n", "<br>")}</p>
      <div class="note-card-actions">
        ${note.type === "task" ? `<button class="plain-button" type="button" data-note-action="toggle-task" data-note-id="${escapeHtml(note.id)}">${note.completed ? "Reopen task" : "Complete task"}</button>` : ""}
        ${includeLocation ? "" : `<button class="plain-button" type="button" data-note-action="edit" data-note-id="${escapeHtml(note.id)}">Edit</button>`}
        <button class="plain-button danger-button" type="button" data-note-action="delete" data-note-id="${escapeHtml(note.id)}">Delete</button>
      </div>
    </article>`;
}


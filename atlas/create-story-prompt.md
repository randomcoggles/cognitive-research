Act as a Cognitive Science Instructional Designer and Frontend Developer. Build an interactive, single-page HTML/CSS/JS reading-annotation exercise designed to train learners to identify **[COGNITIVE DOMAIN, e.g., Attention Systems / Memory Systems / Executive Functions]** in a realistic narrative.

### 1. Target Concepts to Embed
Write a cohesive, engaging short story (around 350–450 words) set in **[SCENARIO / SETTING, e.g., a hospital ER, an air traffic control tower, a busy restaurant kitchen, or "any realistic high-stakes environment"]**. Naturally weave each of the following target concepts into distinct, clearly identifiable sentences or short spans:
* **[Concept 1 Name]**: [Brief definition]
* **[Concept 2 Name]**: [Brief definition]
* **[Concept 3 Name]**: [Brief definition]
* **[Concept 4 Name]**: [Brief definition]
* **[Concept 5 Name]**: [Brief definition]
*(Add or remove bullets as needed)*

### 2. Pedagogical & Signal-Detection Design
* **Inline Tag Triggers:** Do NOT use bulky `<select>` dropdowns inside the text. Place a small, unobtrusive pill/tag icon button (`<button class="tag-trigger">`) with a CSS hover tooltip (`data-tooltip="Inspect & tag segment"`) right before each candidate span.
* **Distractor Icons (Lures):** Include **3 to 4 distractor tag icons** placed before purely atmospheric, descriptive, or routine sentences that do NOT represent any target cognitive mechanism (`data-answer="none"`). At least 3 distractors.
* **Distractor Menu Options:** In the selection menu, mix the true target concepts with **4 plausible cognitive distractor terms** from adjacent domains (e.g., if testing Attention, include Memory or Perception terms) and shuffle the order on page load.

### 3. UI & Interaction Requirements
* **Popover Menu:** Clicking a tag icon opens a clean floating popover menu near the button containing:
  1. A `"✕ Clear tag (Distractor / None)"` option at the top.
  2. The shuffled list of target concepts + distractor concepts.
* **Visual Highlighting:** Selecting a concept highlights the corresponding text span (`<span class="segment">`) in a soft accent color and updates the trigger pill to show the chosen label. Clearing removes the highlight.
* **Evaluation & Feedback:** Include an **"Evaluate Tags"** button and a **"Reset"** button:
  * **Hits (Correct target + correct label):** Highlight green with a `✓ Correct` inline badge.
  * **Misses / Wrong Label on Target:** Highlight red with an inline badge showing what was expected.
  * **False Alarms (User tagged a distractor icon):** Highlight amber/yellow with a badge noting `"Distractor icon — no target event here"`.
  * Display a summary score showing both **Hits** (`X / Total Targets`) and **False Alarms** (`Y / Total Distractors`).

### 4. Output Format (Prevent Truncation)
To ensure nothing gets cut off, split your response into four clearly labeled, copy-pasteable code blocks:
1. **HTML Shell** (with placeholder comments for CSS, Body, and Script)
2. **CSS Part** (modern, clean typography, responsive layout, smooth transitions)
3. **HTML Body Part** (instructions, story card with `data-answer` spans, controls, and `#popover` container)
4. **JavaScript Part** (vanilla JS, zero external dependencies)

// Attention Systems item bank. Items are tagged by Bloom level and by lens so the
// assessment form can be sampled to a blueprint while practice can use everything.
// `lens` is "concept" (the domain itself), "reader", or "creator".
Atlas.data.itemBanks = Atlas.data.itemBanks || {};

Atlas.data.itemBanks["attention"] = {
  // 10-item assessment: every Bloom level represented, concept-only so the score
  // measures the domain rather than the lenses.
  form: {
    size: 10,
    blueprint: { remember: 1, understand: 2, apply: 3, analyze: 2, evaluate: 1, create: 1 },
    lens: "concept"
  },

  items: [
    // ---------- remember ----------
    {
      id: "att-rem-01", level: "remember", lens: "concept", type: "Single choice",
      prompt: "Which attention function prioritises one source of information over competing input?",
      options: ["Sustained attention", "Selective attention", "Vigilance", "Orienting"],
      answer: 1,
      explanation: "Selective attention is the act of prioritising one source over others."
    },
    {
      id: "att-rem-02", level: "remember", lens: "concept", type: "Single choice",
      prompt: "What is the vigilance decrement?",
      options: [
        "The tendency to notice novel stimuli faster over time",
        "The fall in detection performance during prolonged monitoring",
        "The cost of switching between two tasks",
        "The inability to divide attention between modalities"
      ],
      answer: 1,
      explanation: "Detection performance declines as monitoring continues, even when the task is unchanged."
    },
    {
      id: "att-rem-03", level: "remember", lens: "concept", type: "Single choice",
      prompt: "Attentional capture is most strongly triggered by which property of a stimulus?",
      options: ["Relevance to the current goal", "Novelty or sudden change", "Semantic complexity", "Familiarity"],
      answer: 1,
      explanation: "Capture is driven by salience — novelty, movement, threat — not by relevance to the task."
    },
    {
      id: "att-rem-04", level: "remember", lens: "concept", type: "Single choice",
      prompt: "Which term describes shifting attention toward a location or source?",
      options: ["Orienting", "Vigilance", "Task focus", "Salience detection"],
      answer: 0,
      explanation: "Orienting is the movement of attention toward a location, stimulus, or source."
    },

    // ---------- understand ----------
    {
      id: "att-und-01", level: "understand", lens: "concept", type: "Single choice",
      prompt: "Why does divided attention usually produce switching costs rather than true parallel thought?",
      options: [
        "Because attention has a single limited capacity that must be reallocated",
        "Because the brain cannot process two sensory modalities at once",
        "Because tasks always require different motor responses",
        "Because working memory is unlimited but attention is not"
      ],
      answer: 0,
      explanation: "Capacity is limited, so concurrent demands are served by rapid reallocation, and each switch carries a cost."
    },
    {
      id: "att-und-02", level: "understand", lens: "concept", type: "Single choice",
      prompt: "Why is salience a poor proxy for importance?",
      options: [
        "Salient items are always irrelevant",
        "Salience reflects novelty and threat, which are unrelated to task value",
        "Importance cannot be assessed by humans",
        "Salient items are processed too slowly to matter"
      ],
      answer: 1,
      explanation: "Salience is a property of the stimulus; importance is a property of the goal. They often diverge."
    },
    {
      id: "att-und-03", level: "understand", lens: "concept", type: "Single choice",
      prompt: "What distinguishes attentional control from orienting?",
      options: [
        "Control is automatic; orienting is deliberate",
        "Control directs attention according to goals; orienting shifts it toward a source",
        "They are the same process described at different scales",
        "Orienting requires conscious effort; control does not"
      ],
      answer: 1,
      explanation: "Orienting is the shift itself; attentional control is the goal-directed regulation of where attention goes."
    },
    {
      id: "att-und-04", level: "understand", lens: "concept", type: "Multiple select",
      prompt: "Which statements about sustained attention are accurate?",
      options: [
        "Performance declines over prolonged monitoring",
        "The decline can be reduced by breaks",
        "Sustained attention is unaffected by task difficulty",
        "Vigilance tasks are especially vulnerable to the decrement"
      ],
      answers: [0, 1, 3],
      explanation: "The decrement is real, mitigated by rest, and most pronounced in vigilance tasks."
    },

    // ---------- apply ----------
    {
      id: "att-app-01", level: "apply", lens: "concept", type: "Single choice",
      prompt: "An operator misses a rare alarm after watching an unchanged dashboard for two hours. Which limitation is most relevant?",
      options: ["Vigilance decrement", "Semantic interference", "Concept blending", "Prospective memory"],
      answer: 0,
      explanation: "Prolonged monitoring of a stable display is the classic condition for the vigilance decrement."
    },
    {
      id: "att-app-02", level: "apply", lens: "concept", type: "Single choice",
      prompt: "A developer ignores all logs except the database trace and misses a network timeout. What happened?",
      options: ["Attentional tunnelling", "Consolidation failure", "Proactive interference", "Divided attention"],
      answer: 0,
      explanation: "Intense focus on one cue hid other relevant evidence — attentional tunnelling."
    },
    {
      id: "att-app-03", level: "apply", lens: "concept", type: "Single choice",
      prompt: "A team keeps three tasks half-finished and never completes any. Which attention concept best explains the cost?",
      options: ["Switching residue", "Vigilance decrement", "Salience detection", "Orienting reflex"],
      answer: 0,
      explanation: "Part of the previous task stays active after attention moves, so each switch carries unfinished load."
    },
    {
      id: "att-app-04", level: "apply", lens: "concept", type: "Single choice",
      prompt: "A meeting facilitator redirects the group from an urgent tangent back to the decision at hand. Which function is being exercised?",
      options: ["Attentional control", "Salience detection", "Sustained attention", "Divided attention"],
      answer: 0,
      explanation: "Redirecting focus according to the goal is attentional control."
    },
    {
      id: "att-app-05", level: "apply", lens: "concept", type: "Single choice",
      prompt: "A reader re-reads the same paragraph three times while monitoring chat. What is the most likely cause?",
      options: [
        "The text is too difficult",
        "Attention was reallocated during reading, so the text was not encoded",
        "Working memory is permanently impaired",
        "The paragraph lacks headings"
      ],
      answer: 1,
      explanation: "Switching away during reading means the material was never encoded, so it must be read again."
    },
    {
      id: "att-app-06", level: "apply", lens: "concept", type: "Single choice",
      prompt: "A designer adds a striking stock photo beside a key definition. What is the most likely effect?",
      options: [
        "Improved recall of the definition",
        "Attention drawn to the image, displacing the definition",
        "No effect on comprehension",
        "Faster reading of the definition"
      ],
      answer: 1,
      explanation: "Decorative images attract attention without carrying information, displacing the content that does."
    },

    // ---------- analyze ----------
    {
      id: "att-ana-01", level: "analyze", lens: "concept", type: "Single choice",
      prompt: "Two teams report the same symptom: missed signals. One monitors a stable dashboard, the other a rapidly changing one. What distinguishes the diagnoses?",
      options: [
        "Both are vigilance decrement",
        "The stable dashboard points to vigilance decrement; the changing one to capture or overload",
        "Both are attentional capture",
        "Neither is an attention problem"
      ],
      answer: 1,
      explanation: "The same symptom has different causes depending on whether the environment is static or dynamic."
    },
    {
      id: "att-ana-02", level: "analyze", lens: "concept", type: "Single choice",
      prompt: "A team adds more alerts to ensure nothing is missed, and misses more. What is the mechanism?",
      options: [
        "More alerts increase salience overall, so nothing stands out",
        "Alerts reduce working memory capacity",
        "Alerts improve vigilance but slow response",
        "The team lacks sustained attention"
      ],
      answer: 0,
      explanation: "When everything is salient, salience stops discriminating; the signal-to-noise ratio falls."
    },
    {
      id: "att-ana-03", level: "analyze", lens: "concept", type: "Multiple select",
      prompt: "Which interventions address attentional capture rather than sustained attention?",
      options: [
        "Removing non-essential notifications",
        "Batching message checks to fixed times",
        "Taking a break every 25 minutes",
        "Silencing a channel during deep work"
      ],
      answers: [0, 1, 3],
      explanation: "Breaks address the vigilance decrement; the others remove or defer capture cues."
    },
    {
      id: "att-ana-04", level: "analyze", lens: "concept", type: "Single choice",
      prompt: "A reader claims to have 'read' a document but cannot answer basic questions about it. Which explanation is most consistent with attention research?",
      options: [
        "They have a memory disorder",
        "They skimmed, which does not produce inference and integration",
        "The document was too short",
        "They used too many headings"
      ],
      answer: 1,
      explanation: "Skimming is a legitimate triage mode but cannot produce the integration deep reading requires."
    },

    // ---------- evaluate ----------
    {
      id: "att-eva-01", level: "evaluate", lens: "concept", type: "Single choice",
      prompt: "Which intervention best reduces avoidable competition for attention in a shared workspace?",
      options: [
        "Asking people to try harder to focus",
        "Removing ambient alerts and agreeing on batched check-in times",
        "Adding a second monitor for chat",
        "Increasing the number of status meetings"
      ],
      answer: 1,
      explanation: "Changing the environment removes the cue; exhortation does not."
    },
    {
      id: "att-eva-02", level: "evaluate", lens: "concept", type: "Single choice",
      prompt: "A tool vendor claims their AI filter 'eliminates attention problems'. What is the strongest objection?",
      options: [
        "AI cannot process text",
        "Filters can hide weak but important signals, and the human still owns the goal",
        "Filters are too expensive",
        "Attention problems are not real"
      ],
      answer: 1,
      explanation: "Filtering trades one failure mode for another; salience is not importance, and goal ownership stays human."
    },
    {
      id: "att-eva-03", level: "evaluate", lens: "concept", type: "Single choice",
      prompt: "Which is the better justification for timeboxing deep work?",
      options: [
        "It guarantees no interruptions",
        "It matches the sustainable span of sustained attention and creates a natural rest point",
        "It removes the need for sleep",
        "It eliminates switching costs entirely"
      ],
      answer: 1,
      explanation: "Timeboxing works because it aligns with the vigilance decrement, not because it abolishes interruption."
    },

    // ---------- create ----------
    {
      id: "att-cre-01", level: "create", lens: "concept", type: "Single choice",
      prompt: "You must design a monitoring rotation for a 24-hour control room. Which design best respects attention limits?",
      options: [
        "One operator monitors for eight hours with all alerts enabled",
        "Rotating operators every 30–45 minutes with prioritised alerts and scheduled breaks",
        "Two operators monitoring the same screen continuously",
        "Removing all alerts so operators watch the raw feed"
      ],
      answer: 1,
      explanation: "Rotation and prioritisation address both the vigilance decrement and capture."
    },
    {
      id: "att-cre-02", level: "create", lens: "concept", type: "Single choice",
      prompt: "Which reading workflow best supports comprehension of a dense report?",
      options: [
        "Read straight through with notifications on",
        "State the questions first, read in blocks with summaries, then verify against the questions",
        "Skim once and rely on recall",
        "Read only the executive summary"
      ],
      answer: 1,
      explanation: "Goal visibility, segmentation, and retrieval checks together address the main attention failure modes."
    },

    // ---------- reader lens practice ----------
    {
      id: "att-rdr-01", level: "apply", lens: "reader", type: "Single choice",
      prompt: "You have 90 minutes to understand a difficult paper. What is the best use of attention?",
      options: [
        "Read continuously for 90 minutes to maximise coverage",
        "Read in three 25-minute blocks with short breaks and a summary after each",
        "Read while answering messages so nothing is missed",
        "Skim the whole paper twice"
      ],
      answer: 1,
      explanation: "Blocks match the sustainable span of sustained attention and the summaries force retrieval."
    },
    {
      id: "att-rdr-02", level: "analyze", lens: "reader", type: "Single choice",
      prompt: "You keep losing the thread of a long argument. Which reader-side fix addresses the most likely cause?",
      options: [
        "Read faster",
        "Write the question you are answering at the top of the page",
        "Increase font size",
        "Read the conclusion first and stop"
      ],
      answer: 1,
      explanation: "Task focus degrades when the goal is out of sight; making it visible restores it."
    },
    {
      id: "att-rdr-03", level: "evaluate", lens: "reader", type: "Single choice",
      prompt: "Which statement about skimming is most accurate?",
      options: [
        "Skimming produces the same comprehension as deep reading, faster",
        "Skimming is useful for triage but cannot produce inference and integration",
        "Skimming should never be used",
        "Skimming works only for fiction"
      ],
      answer: 1,
      explanation: "Skimming is a legitimate mode for deciding what to read closely, not a substitute for close reading."
    },
    {
      id: "att-rdr-04", level: "apply", lens: "reader", type: "Single choice",
      prompt: "You notice you have read a page without absorbing it. What should you do first?",
      options: [
        "Continue and hope the next page is clearer",
        "Stop and re-read from the last point you can restate from memory",
        "Switch to a different document",
        "Increase reading speed"
      ],
      answer: 1,
      explanation: "Re-reading from a known-good point re-establishes the thread without restarting the whole section."
    },

    // ---------- creator lens practice ----------
    {
      id: "att-crt-01", level: "apply", lens: "creator", type: "Single choice",
      prompt: "You are writing a procedure with a diagram. Where should the labels go?",
      options: [
        "In a legend below the diagram",
        "On the diagram, next to the parts they name",
        "In an appendix",
        "In the paragraph before the diagram"
      ],
      answer: 1,
      explanation: "On-diagram labels avoid the split-attention effect."
    },
    {
      id: "att-crt-02", level: "analyze", lens: "creator", type: "Single choice",
      prompt: "A draft opens with a vivid anecdote unrelated to the main point. What is the likely effect on comprehension?",
      options: [
        "It improves comprehension by engaging the reader",
        "It is remembered better than the main point and displaces it",
        "It has no measurable effect",
        "It improves retention of the main point"
      ],
      answer: 1,
      explanation: "Seductive details are recalled better than the content they displace."
    },
    {
      id: "att-crt-03", level: "evaluate", lens: "creator", type: "Single choice",
      prompt: "Which heading best supports selective attention?",
      options: [
        "Section 4: Retry behaviour",
        "Retries stop after three attempts to avoid cascading failure",
        "More on retries",
        "Retries (continued)"
      ],
      answer: 1,
      explanation: "A heading that states the claim lets a scanning reader decide relevance without reading the body."
    },
    {
      id: "att-crt-04", level: "create", lens: "creator", type: "Single choice",
      prompt: "You must make a long reference document re-enterable after interruption. What should you add?",
      options: [
        "More detail in each section",
        "A one-line recap at each section boundary naming what was covered and what comes next",
        "A longer introduction",
        "Fewer headings to reduce clutter"
      ],
      answer: 1,
      explanation: "Boundary recaps let a returning reader re-establish context without re-reading."
    }
  ]
};

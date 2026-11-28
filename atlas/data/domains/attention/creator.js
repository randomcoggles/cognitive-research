// Creator lens for Attention Systems: what an author, instructional designer, or
// teacher must know to design text that works with attention rather than against it.
Atlas.data.lenses["attention"].creator = {
  title: "Designing text for attention",
  standfirst:
    "Every design decision either spends or protects the reader's attention. The reader cannot hold more than one thing at a time, so the text must decide what that one thing is.",
  principles: [
    {
      title: "Signal what matters",
      body:
        "Readers cannot infer structure from prose alone at speed. Headings, bolded key terms, and explicit signposting direct selective attention to the load-bearing content.",
      do: "Give every section a heading that states its claim, not just its topic. Bold no more than a few terms per screen."
    },
    {
      title: "Segment the load",
      body:
        "Sustained attention decays. A wall of text forces the reader to supply their own segmentation, which competes with comprehension.",
      do: "Break long explanations into labelled chunks a reader can finish in one sitting, with a rest point between them."
    },
    {
      title: "Never split attention across sources",
      body:
        "The split-attention effect: when a diagram and its explanation are separated, the reader spends capacity integrating them instead of understanding them.",
      do: "Put labels on the diagram, not in a legend below it. Keep explanation adjacent to what it explains."
    },
    {
      title: "Cut what is interesting but irrelevant",
      body:
        "Seductive details — vivid anecdotes, decorative images, tangential asides — are remembered better than the main point and displace it.",
      do: "Delete any example that is engaging but does not carry the argument. Test: if removed, does comprehension drop? If not, remove it."
    },
    {
      title: "Make the goal visible throughout",
      body:
        "Readers lose task focus when the objective scrolls out of view. Restating the question at intervals is not redundancy; it is attentional maintenance.",
      do: "Open with the question the section answers, and close by naming the next question."
    },
    {
      title: "Design for interruption",
      body:
        "Readers will be interrupted. Text that depends on unbroken continuity punishes them for something outside their control.",
      do: "Use explicit recaps at section boundaries so a reader returning after a break can re-enter without re-reading everything."
    }
  ],
  protocolMapping: {
    note: "These are the reader-support protocol steps that most affect attention. The full matrix covers all seven cognitive systems.",
    steps: [
      ["Compose", "Purpose: state the question and its value", "Gives selective attention a target before the reader starts scanning."],
      ["Compose", "Orient: connect to familiar knowledge", "Reduces the search cost of deciding what is relevant."],
      ["Compose", "Explain: develop one meaningful idea", "One idea per unit prevents divided attention within the text itself."],
      ["Review", "Remove decorative or misleading examples", "Directly targets the seductive-details effect."],
      ["Review", "Help readers recover after interruption", "Restatement at boundaries restores task focus."]
    ]
  },
  checklist: [
    "Does every heading state a claim rather than a topic?",
    "Can each section be finished in one sitting?",
    "Are diagram labels on the diagram?",
    "Have you deleted every engaging-but-irrelevant detail?",
    "Is the section's question visible at the start and restated at the end?",
    "Could a reader interrupted mid-section re-enter without starting over?"
  ],
  pitfalls: [
    ["Decorative images", "They attract attention and carry no information, displacing the content that does."],
    ["Legend-separated diagrams", "Forces integration work that competes with understanding."],
    ["Long unbroken prose", "Makes the reader responsible for segmentation, which most will not do."],
    ["Withholding the point for suspense", "Curiosity is not the same as comprehension; delayed value loses readers who are scanning for relevance."]
  ],
  example: {
    context: "Explaining a retry policy to on-call engineers",
    before:
      "A 900-word narrative that opens with the history of the incident that motivated the policy, includes two anecdotes, and states the actual rule in paragraph six.",
    after:
      "A heading that states the rule, the rule in one sentence, a labelled diagram of the retry sequence, one worked example, and the history moved to an appendix."
  }
};

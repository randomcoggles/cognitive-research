// Narrative annotation exercise for Attention Systems.
Atlas.data.annotations = Atlas.data.annotations || {};

Atlas.data.annotations["attention"] = {
  title: "Find the attentional event",
  standfirst: "Two stories, eight capabilities, four decoys. Label the passages where attention is actually being controlled — and leave the rest alone.",
  domainNoun: "attentional",

  constructs: {
    "selective-attention": {
      label: "Selective Attention",
      definition: "Prioritising one source of information over competing input.",
      confusable: ["attentional-control", "task-focus"]
    },
    "sustained-attention": {
      label: "Sustained Attention",
      definition: "Maintaining engagement with a task over time.",
      confusable: ["vigilance", "task-focus"]
    },
    "divided-attention": {
      label: "Divided Attention",
      definition: "Coordinating attention across concurrent demands, usually with costs.",
      confusable: ["task-switching"]
    },
    "vigilance": {
      label: "Vigilance",
      definition: "Monitoring for rare but important signals over a long stretch.",
      confusable: ["sustained-attention"]
    },
    "attentional-control": {
      label: "Attentional Control",
      definition: "Directing or redirecting focus according to a goal.",
      confusable: ["selective-attention", "task-focus"]
    },
    "salience-detection": {
      label: "Salience Detection",
      definition: "Noticing information that stands out because of novelty, relevance, or threat.",
      confusable: ["orienting"]
    },
    "orienting": {
      label: "Orienting",
      definition: "Shifting attention toward a location, stimulus, or source.",
      confusable: ["salience-detection"]
    },
    "task-focus": {
      label: "Task Focus",
      definition: "Maintaining priority on the current objective despite distraction.",
      confusable: ["attentional-control", "sustained-attention"]
    }
  },

  decoys: ["Working Memory", "Episodic Memory", "Semantic Priming", "Motor Planning"],

  stories: {
    controlroom: {
      title: "The control room",
      paragraphs: [
        ["Forty monitors glowed in the dim room. ",
         { id: "c1", answer: "selective-attention", text: "Nadia watched the payment queue and let the marketing dashboard blur" }, "."],

        [{ id: "c2", answer: "none", text: "The chair had a worn patch on the left armrest" },
         ". She had never noticed it before."],

        ["A red banner flashed in the corner of a screen she was not watching. ",
         { id: "c3", answer: "salience-detection", text: "Her eyes went to it before she had decided to look" }, "."],

        ["The banner was a routine deploy notice. ",
         { id: "c4", answer: "attentional-control", text: "She deliberately returned her gaze to the payment queue" }, "."],

        ["Two hours in, the graphs had not moved. ",
         { id: "c5", answer: "vigilance", text: "She kept scanning the error rate for a spike that might never come" }, "."],

        [{ id: "c6", answer: "none", text: "She recalled the on-call rota from the morning handover" },
         ". It was unchanged."],

        ["A colleague asked a question while an alert chimed. ",
         { id: "c7", answer: "divided-attention", text: "She answered and read the alert at the same time, and got both slightly wrong" }, "."],

        [{ id: "c8", answer: "none", text: "The room smelled faintly of coffee from the machine downstairs" },
         ". Nobody commented."],

        ["The alert turned out to be a false positive. ",
         { id: "c9", answer: "task-focus", text: "She closed it and went back to the queue without letting the interruption derail the check" }, "."],

        ["Four hours in, her attention began to drift. ",
         { id: "c10", answer: "sustained-attention", text: "She kept herself on the queue by working in twenty-minute blocks" }, "."],

        [{ id: "c11", answer: "none", text: "A fly landed on the monitor bezel and walked across it" },
         ". She brushed it away."],

        ["A new alert appeared on a different screen. ",
         { id: "c12", answer: "orienting", text: "She turned her head toward the sound before reading the text" }, "."]
      ]
    },

    library: {
      title: "The library",
      paragraphs: [
        ["The reading room was full and the table was loud. ",
         { id: "l1", answer: "selective-attention", text: "Tomas read the dense paragraph and let the conversation behind him fade" }, "."],

        [{ id: "l2", answer: "none", text: "The window looked out onto a courtyard with a dry fountain" },
         ". He had sat here before."],

        ["Someone dropped a book three tables away. ",
         { id: "l3", answer: "salience-detection", text: "His head came up before he had decided to look" }, "."],

        ["It was nothing. ",
         { id: "l4", answer: "attentional-control", text: "He put his eyes back on the line he had been reading" }, "."],

        ["Ninety minutes in, the argument in the chapter had become hard to follow. ",
         { id: "l5", answer: "sustained-attention", text: "He kept going by breaking the chapter into sections with a short pause between" }, "."],

        [{ id: "l6", answer: "none", text: "He remembered that the library closed early on Sundays" },
         ". It was Saturday."],

        ["His phone buzzed while he was mid-sentence. ",
         { id: "l7", answer: "divided-attention", text: "He read the message and the sentence together, and had to re-read both" }, "."],

        [{ id: "l8", answer: "none", text: "The desk lamp cast a warm circle on the page" },
         ". He shifted his chair."],

        ["The message was not urgent. ",
         { id: "l9", answer: "task-focus", text: "He put the phone face down and returned to the same paragraph" }, "."],

        ["By the fourth hour the words had stopped sticking. ",
         { id: "l10", answer: "vigilance", text: "He kept watching for the one line in the appendix that would settle the question" }, "."],

        [{ id: "l11", answer: "none", text: "A page in the next book was dog-eared at the corner" },
         ". He straightened it absently."],

        ["A door opened at the far end of the room. ",
         { id: "l12", answer: "orienting", text: "He turned toward the sound before he could stop himself" }, "."]
      ]
    }
  }
};

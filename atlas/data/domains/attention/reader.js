// Reader lens for Attention Systems: what a reader must know and do to read
// effectively, given how attention actually behaves.
Atlas.data.lenses = Atlas.data.lenses || {};
Atlas.data.lenses["attention"] = Atlas.data.lenses["attention"] || {};

Atlas.data.lenses["attention"].reader = {
  title: "Reading with attention in mind",
  standfirst:
    "Reading is not a passive intake of text. It is a sequence of attentional choices, and those choices are the main thing you control as a reader.",
  principles: [
    {
      title: "You cannot read two things at once",
      body:
        "Divided attention produces switching costs, not parallel comprehension. Reading while monitoring chat means re-reading, because the text you 'read' during a switch was never encoded.",
      do: "Close or silence everything that can interrupt before a demanding passage. Batch messages into a single check afterwards."
    },
    {
      title: "Attention decays on a schedule",
      body:
        "Sustained attention falls measurably during prolonged monitoring. The drop is not a character flaw; it is the vigilance decrement, and it arrives sooner than most readers expect.",
      do: "Work in blocks of roughly 20–30 minutes with a short break, rather than one long session you cannot sustain."
    },
    {
      title: "Novelty beats importance",
      body:
        "Attentional capture is triggered by novelty, movement, and threat — not by relevance. A trivial notification will pull you away from a critical paragraph.",
      do: "Assume any alert will win. Remove the alert rather than relying on willpower to ignore it."
    },
    {
      title: "Skimming and deep reading are different tasks",
      body:
        "Selective attention lets you choose a mode. Skimming is legitimate for triage, but it cannot produce the inference and integration that deep reading requires.",
      do: "Decide your mode before you start. If you need to understand, do not skim and hope comprehension follows."
    },
    {
      title: "Your goal must stay visible",
      body:
        "Task focus degrades when the objective is out of sight. Readers who lose the question they were answering re-read without noticing.",
      do: "Write the question you are trying to answer at the top of the page or note before you begin."
    }
  ],
  practices: [
    "Read one thing at a time; treat multitasking as a known cost, not a skill.",
    "Set a timer for a block you can actually sustain, then stop.",
    "Remove notifications rather than resisting them.",
    "Name your reading goal in one sentence before starting.",
    "When you notice you have lost the thread, stop and re-read from the last point you can restate.",
    "After a demanding section, close the text and summarise it from memory before continuing."
  ],
  pitfalls: [
    ["Reading with a second screen open", "Every glance costs a re-read; the text is not encoded during the switch."],
    ["Marathon sessions", "The last hour of a three-hour session is largely wasted through vigilance decrement."],
    ["Confusing familiarity with comprehension", "Fluent re-reading feels productive while producing little durable understanding."],
    ["Trusting willpower over environment", "Capture is automatic; removing the cue works, resisting it usually does not."]
  ],
  example: {
    context: "A 40-page technical specification, due tomorrow",
    before:
      "You open the document with email and chat running, read for two hours, and finish with a vague sense of the whole and no ability to answer specific questions.",
    after:
      "You write the three questions you must answer, close chat and email, read in three 25-minute blocks with a two-minute summary after each, and finish able to answer all three."
  }
};

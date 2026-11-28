// Narrative annotation exercise for Memory Systems.
Atlas.data.annotations = Atlas.data.annotations || {};

Atlas.data.annotations["memory"] = {
  title: "Find the memory event",
  standfirst: "Two stories, eight capabilities, four decoys. Label the passages where a specific memory system is doing the work — and leave the rest alone.",
  domainNoun: "memory",

  constructs: {
    "working-memory": {
      label: "Working Memory",
      definition: "Holding and manipulating information in an active state while it is being used.",
      confusable: ["recall", "long-term-memory"]
    },
    "long-term-memory": {
      label: "Long-Term Memory",
      definition: "The durable store that retains information beyond the current task.",
      confusable: ["semantic-memory", "episodic-memory"]
    },
    "episodic-memory": {
      label: "Episodic Memory",
      definition: "Recalling a specific event, with its time and place.",
      confusable: ["semantic-memory", "recall"]
    },
    "semantic-memory": {
      label: "Semantic Memory",
      definition: "Recalling facts and meanings detached from when you learned them.",
      confusable: ["episodic-memory", "long-term-memory"]
    },
    "procedural-memory": {
      label: "Procedural Memory",
      definition: "Performing a learned skill without consciously reconstructing the steps.",
      confusable: ["recall"]
    },
    "recognition-memory": {
      label: "Recognition Memory",
      definition: "Identifying something as previously encountered, without retrieving the details.",
      confusable: ["recall", "episodic-memory"]
    },
    "recall": {
      label: "Recall",
      definition: "Retrieving information from memory without the original cue present.",
      confusable: ["recognition-memory", "working-memory"]
    },
    "prospective-memory": {
      label: "Prospective Memory",
      definition: "Remembering to carry out an intended action at the right future moment.",
      confusable: ["working-memory"]
    }
  },

  decoys: ["Selective Attention", "Cognitive Flexibility", "Perceptual Priming", "Motor Inhibition"],

  stories: {
    incident: {
      title: "The incident",
      paragraphs: [
        ["The bridge call had six people talking at once. ",
         { id: "i1", answer: "working-memory", text: "Priya held the last three error codes in her head while comparing them to the timeline" }, "."],

        [{ id: "i2", answer: "none", text: "The bridge line had a faint echo on the left channel" },
         ". Nobody mentioned it."],

        ["Someone asked when the last deploy had gone out. ",
         { id: "i3", answer: "episodic-memory", text: "She recalled the Thursday release, the room she was in, and who had approved it" }, "."],

        ["A colleague asked what idempotency meant. ",
         { id: "i4", answer: "semantic-memory", text: "She explained the concept without needing to remember where she had learned it" }, "."],

        ["The terminal was open in front of her. ",
         { id: "i5", answer: "procedural-memory", text: "Her fingers ran the rollback sequence without her reciting the steps" }, "."],

        [{ id: "i6", answer: "none", text: "The office plant had grown a new leaf since Monday" },
         ". She had not noticed."],

        ["A log line looked familiar. ",
         { id: "i7", answer: "recognition-memory", text: "She knew she had seen this exact error before, though she could not say when" }, "."],

        ["The on-call engineer was not on the call. ",
         { id: "i8", answer: "prospective-memory", text: "She remembered, at the right moment, to page him before closing the bridge" }, "."],

        [{ id: "i9", answer: "none", text: "The dashboard refresh interval was set to thirty seconds" },
         ". It had always been thirty seconds."],

        ["The root cause was in a service nobody had touched in a year. ",
         { id: "i10", answer: "recall", text: "She reconstructed the service's dependencies from memory, with no notes in front of her" }, "."],

        [{ id: "i11", answer: "none", text: "The incident channel had been renamed twice that quarter" },
         ". The name was not important."],

        ["After the fix, she wrote the postmortem. ",
         { id: "i12", answer: "long-term-memory", text: "She drew on the pattern from three similar incidents over the past two years" }, "."]
      ]
    },

    movehouse: {
      title: "The move",
      paragraphs: [
        ["The flat was full of boxes and the van was due at nine. ",
         { id: "m1", answer: "working-memory", text: "Daniel kept the inventory of what was already loaded in his head while directing the next box" }, "."],

        [{ id: "m2", answer: "none", text: "The stairwell light had a loose fitting that buzzed" },
         ". It had buzzed all week."],

        ["His friend asked where the kettle had come from. ",
         { id: "m3", answer: "episodic-memory", text: "He recalled buying it in a shop in Lisbon, and which street it was on" }, "."],

        ["A neighbour asked what a guarantor was. ",
         { id: "m4", answer: "semantic-memory", text: "He explained the concept without recalling who had first told him" }, "."],

        ["The van arrived and the ramp needed lowering. ",
         { id: "m5", answer: "procedural-memory", text: "He worked the release catch without thinking about the mechanism" }, "."],

        [{ id: "m6", answer: "none", text: "The removal firm's logo was blue with a white stripe" },
         ". He had not registered it."],

        ["One box was unlabelled. ",
         { id: "m7", answer: "recognition-memory", text: "He knew the handwriting on the tape was his mother's, though he could not place the box" }, "."],

        ["The keys had to go back to the letting agent by five. ",
         { id: "m8", answer: "prospective-memory", text: "He remembered to drop them off on the way to the new flat, at the right moment" }, "."],

        [{ id: "m9", answer: "none", text: "The new kitchen had a window that faced east" },
         ". He noted it and moved on."],

        ["The sofa would not fit through the door. ",
         { id: "m10", answer: "recall", text: "He reconstructed the measurements from memory and worked out the angle needed" }, "."],

        [{ id: "m11", answer: "none", text: "The van's radio was tuned to a station he did not recognise" },
         ". He left it."],

        ["That evening, unpacking, he found the box of photographs. ",
         { id: "m12", answer: "long-term-memory", text: "He recognised the pattern of holidays from a decade of family trips" }, "."]
      ]
    }
  }
};

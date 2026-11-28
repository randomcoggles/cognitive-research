// Narrative annotation exercise for Executive Systems.
// Constructs are the domain's own capabilities (see data/index.js), not an external taxonomy.
Atlas.data.annotations = Atlas.data.annotations || {};

Atlas.data.annotations["executive"] = {
  title: "Find the executive event",
  standfirst: "Two stories, eight capabilities, four decoys. Label the passages where executive control is actually operating — and leave the rest alone.",
  domainNoun: "executive",

  constructs: {
    "planning": {
      label: "Planning",
      definition: "Sequencing future steps in advance — setting sub-goals and ordering them before acting.",
      confusable: ["goal-management", "prioritization"]
    },
    "prioritization": {
      label: "Prioritization",
      definition: "Deciding which demand gets attention first when several compete.",
      confusable: ["planning", "goal-management"]
    },
    "goal-management": {
      label: "Goal Management",
      definition: "Keeping the overarching objective in view while reprioritising sub-goals as conditions change.",
      confusable: ["planning", "prioritization"]
    },
    "inhibition": {
      label: "Inhibition",
      definition: "Suppressing an automatic but wrong response; stopping an impulse before it becomes an action.",
      confusable: ["self-control", "cognitive-flexibility"]
    },
    "self-control": {
      label: "Self-Control",
      definition: "Sustaining effort or restraint over time against a competing pull.",
      confusable: ["inhibition"]
    },
    "cognitive-flexibility": {
      label: "Cognitive Flexibility",
      definition: "Abandoning a plan and reorganising strategy when the constraints change.",
      confusable: ["task-switching", "planning"]
    },
    "task-switching": {
      label: "Task Switching",
      definition: "Rapidly alternating between concurrent tasks, shifting focus from one demand to the next.",
      confusable: ["cognitive-flexibility"]
    },
    "executive-control": {
      label: "Executive Control",
      definition: "The overarching regulation that coordinates the other executive functions toward a goal.",
      confusable: ["goal-management"]
    }
  },

  decoys: ["Sustained Attention", "Episodic Memory", "Perceptual Priming", "Lexical Access"],

  stories: {
    kitchen: {
      title: "The kitchen",
      paragraphs: [
        ["The dinner rush had barely begun when the printer spat out twelve tickets at once. Chef Rosa stood still for a second, then ",
         { id: "k1", answer: "planning", text: "fired the risotto first, held the fish, and staggered the appetizers" }, "."],

        [{ id: "k2", answer: "none", text: "She noticed the copper pots had dulled since the morning polish" },
         ". A small framed photo of the original owner hung near the doorway."],

        ["Two servers called at once and a pan began to smoke. ",
         { id: "k3", answer: "prioritization", text: "She put the smoking pan first, told one server to wait, and took the other's order" }, "."],

        ["A server shouted an order across the pass. ",
         { id: "k4", answer: "inhibition", text: "Rosa's hand twitched toward the wrong pan, but she caught herself and held the intended sequence" }, "."],

        ["Meanwhile, three pans sizzled at different rates. ",
         { id: "k5", answer: "task-switching", text: "She flipped the fish, stirred the sauce, and adjusted the oven dial" },
         " — all in one fluid sweep."],

        [{ id: "k6", answer: "none", text: "She remembered that the delivery van usually came on Tuesdays" },
         ". Outside, the street was quiet."],

        ["By hour three her back ached and the tickets kept coming. ",
         { id: "k7", answer: "self-control", text: "She kept her pace steady and did not let the pace slip into shortcuts" }, "."],

        [{ id: "k8", answer: "none", text: "The terracotta floor reminded her of her grandmother's kitchen" },
         ". She smiled and kept moving."],

        ["Halfway through, ",
         { id: "k9", answer: "executive-control", text: "she held the whole service in view — pacing the pass, the oven, and the plating together" },
         " rather than fixing on any one station."],

        ["When the supplier's delivery was late, ",
         { id: "k10", answer: "cognitive-flexibility", text: "she abandoned her original plan and reorganised the menu on the fly" }, "."],

        [{ id: "k11", answer: "none", text: "She recognised a regular at table nine from last month" },
         ". He ordered the same thing as before."],

        ["A fuse blew, plunging the line into dim emergency light. ",
         { id: "k12", answer: "goal-management", text: "Rosa redirected the team, reassigned stations, and kept the service moving" }, "."]
      ]
    },

    theatre: {
      title: "The theatre",
      paragraphs: [
        ["The patient arrived with a lacerated artery and falling pressure. Dr. Amara ",
         { id: "t1", answer: "planning", text: "mapped the sequence: control the bleeding, repair the vessel, then close" }, "."],

        [{ id: "t2", answer: "none", text: "She recalled the patient's chart from the morning round" },
         ". The theatre lights hummed overhead."],

        ["The anaesthetist called a falling pressure while the suction line clogged. ",
         { id: "t3", answer: "prioritization", text: "She dealt with the pressure first and let the suction wait" }, "."],

        ["Her hand moved toward the wrong clamp. ",
         { id: "t4", answer: "inhibition", text: "She stopped, drew her hand back, and reached for the correct one" }, "."],

        [{ id: "t5", answer: "task-switching", text: "She moved between the monitor, the suction, and the suture line" },
         " as the anaesthetist called out new numbers."],

        [{ id: "t6", answer: "none", text: "The overhead light flickered once and steadied" },
         ". Nobody looked up."],

        ["Four hours in, her shoulders burned and the field was still bleeding. ",
         { id: "t7", answer: "self-control", text: "She kept her hands steady and did not rush the closure" }, "."],

        [{ id: "t8", answer: "none", text: "The instrument tray reminded her of her first solo operation" },
         ". She kept her hands steady."],

        [{ id: "t9", answer: "executive-control", text: "She coordinated the anaesthetist, the scrub nurse, and her own hands as one system" },
         " rather than tracking any of them separately."],

        ["When the graft failed, ",
         { id: "t10", answer: "cognitive-flexibility", text: "she abandoned the bypass and switched to a direct repair" }, "."],

        [{ id: "t11", answer: "none", text: "She recognised the scrub nurse from a previous case" },
         ". They worked without speaking."],

        ["Bleeding resumed. ",
         { id: "t12", answer: "goal-management", text: "She kept the objective — stabilise the patient — in view while reprioritising as the field changed" }, "."]
      ]
    }
  }
};

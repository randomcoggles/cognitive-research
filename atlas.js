// Content for domains 06–12, merged into the generated domain list below.
const laterDomainContent = {
  learning: {
    concepts: [
      ["Pattern Recognition", "Detecting recurring structure so new cases can be classified quickly."],
      ["Chunking", "Grouping elements into meaningful units that take less working memory."],
      ["Transfer Learning", "Applying what was learned in one context to a different one."],
      ["Deliberate Practice", "Targeted practice at the edge of ability with feedback on specific weaknesses."],
      ["Retrieval Practice", "Strengthening memory by actively recalling information instead of re-reading it."],
      ["Consolidation", "Stabilizing new learning over time, with sleep and spacing helping."],
      ["Scaffolding", "Temporary support that is gradually removed as competence grows."]
    ],
    objectives: [
      "Explain why durable learning comes from effortful retrieval and feedback rather than exposure alone.",
      "Distinguish practice that builds skill from repetition that only builds familiarity.",
      "Design practice that supports transfer to situations the learner has not yet met.",
      "Use tools and AI to give feedback and scaffolding without replacing the learner's own effort."
    ],
    examples: [
      ["Software engineering", "A developer builds the same service from memory a week later, then compares it with the reference to find gaps."],
      ["Onboarding", "A new hire gets a guided starter task with checkpoints, then the same task with fewer hints."],
      ["Incident response", "A team replays past outages as tabletop drills with feedback on each decision."]
    ],
    mappings: [
      ["Retrieval practice", "Flashcards, practice problems", "Adaptive question generation", "Questions that are too easy feel productive but teach little."],
      ["Deliberate practice", "Coaching, code review", "Targeted feedback on repeated errors", "AI feedback should name the weakness, not just correct the answer."],
      ["Scaffolding", "Templates, worked examples", "Hints that fade with competence", "Permanent hints stop the learner from building the skill."],
      ["Transfer", "Varied exercises, case libraries", "Novel scenarios built from known patterns", "Success on familiar examples does not prove transfer."]
    ],
    failures: [
      ["Illusion of knowing", "Re-reading feels fluent, so the learner overestimates what can actually be recalled."],
      ["Massed practice", "Cramming gives quick gains that fade quickly."],
      ["Failed transfer", "A skill works in the training context but not in a differently framed one."],
      ["Scaffold dependence", "Support is never withdrawn, so the learner cannot perform alone."]
    ],
    relations: ["Long-Term Memory", "Working Memory", "Metacognition", "Calibration", "Schemas"],
    quiz: [
      ["Remember", "Which practice strengthens memory by actively recalling information?", ["Re-reading the notes", "Highlighting", "Retrieval practice", "Copying the text"], 2, "Recalling information from memory strengthens it more than passive review."],
      ["Understand", "Why does spacing practice over days usually beat cramming?", ["It lets the material be forgotten and re-retrieved, which strengthens it", "It reduces total study time to zero", "It avoids needing feedback", "It removes the need for attention"], 0, "Effortful re-retrieval after some forgetting builds more durable memory."],
      ["Apply", "A trainer wants learners to handle new incidents, not just rehearsed ones. What should the exercises do?", ["Repeat the same incident until perfect", "Vary the surface details while keeping the underlying structure", "Only show solved examples", "Remove feedback"], 1, "Variation across contexts supports transfer to new cases."],
      ["Analyze", "A learner says, “I read it three times, so I know it,” but cannot explain it without notes. What is happening?", ["Consolidation failure only", "An illusion of knowing from fluent re-reading", "Strong procedural memory", "Excellent calibration"], 1, "Familiarity from re-reading was mistaken for the ability to recall."],
      ["Tool selection", "Which use of AI best supports learning?", ["Writing every answer for the learner", "Asking the learner to attempt first, then giving specific feedback", "Hiding all errors", "Giving the same hint every time"], 1, "Feedback after the learner's own attempt supports growth without replacing effort."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each learning concept with the practice that best illustrates it.",
        pairs: [
          ["Retrieval practice", "Writing a design from memory before checking notes"],
          ["Chunking", "Treating a familiar five-step deploy as one unit"],
          ["Scaffolding", "Starter template that loses detail with each exercise"],
          ["Deliberate practice", "Repeating only the part of a task you keep getting wrong, with feedback"]
        ],
        explanation: "Each practice targets a different mechanism: recall, grouping, temporary support, and focused improvement."
      },
      {
        kind: "multi",
        type: "Multiple select",
        prompt: "Which practices support durable learning?",
        options: ["Space sessions over several days", "Test yourself before checking the answer", "Re-read the same page repeatedly", "Practice only what already feels easy"],
        answers: [0, 1],
        explanation: "Spacing and self-testing create effortful retrieval, which strengthens memory."
      }
    ]
  },
  creativity: {
    concepts: [
      ["Divergent Thinking", "Generating many varied possibilities without early judgment."],
      ["Convergent Thinking", "Narrowing possibilities by evaluating them against criteria."],
      ["Insight", "A sudden restructuring of a problem that reveals a solution."],
      ["Analogical Thinking", "Using a structural similarity with another domain to generate ideas."],
      ["Reframing", "Redefining a problem so that different solutions become visible."],
      ["Concept Blending", "Combining elements of different concepts into a new one."]
    ],
    objectives: [
      "Separate idea generation from idea evaluation and explain why mixing them limits both.",
      "Use analogy, reframing and blending as deliberate techniques rather than waiting for inspiration.",
      "Recognize fixation and design conditions that reduce it.",
      "Use AI as a source of variety while keeping judgment and ownership with the people involved."
    ],
    examples: [
      ["Product design", "A team lists thirty ways to reduce onboarding friction before ranking any of them."],
      ["Architecture", "An engineer borrows the idea of a circuit breaker from electrical systems to design failure handling."],
      ["Leadership", "A manager reframes “reduce support tickets” as “help users succeed without needing support.”"]
    ],
    mappings: [
      ["Divergent thinking", "Whiteboard, brainwriting", "AI brainstorming for variety", "More ideas are not better ideas; quantity needs later selection."],
      ["Convergent thinking", "Scoring matrix, criteria list", "Ranking against stated criteria", "Criteria are chosen by people, not inferred by the tool."],
      ["Analogical thinking", "Pattern libraries, case studies", "Cross-domain analogy suggestions", "A surface resemblance is not a structural one."],
      ["Reframing", "Problem statements, “how might we” questions", "Alternative problem framings", "Check that the new frame still serves the real need."]
    ],
    failures: [
      ["Functional fixedness", "An object or tool is seen only in its usual role."],
      ["Premature evaluation", "Ideas are judged while being generated, so few are produced."],
      ["Design fixation", "Early examples shape and limit the solutions that follow."],
      ["Superficial analogy", "A comparison matches appearance but not underlying structure."]
    ],
    relations: ["Working Memory", "Schemas", "Cognitive Flexibility", "Abductive Reasoning", "Critical Thinking"],
    quiz: [
      ["Remember", "Which mode generates many varied possibilities without early judgment?", ["Convergent thinking", "Divergent thinking", "Recognition memory", "Vigilance"], 1, "Divergent thinking widens the set of possibilities before they are evaluated."],
      ["Understand", "Why separate brainstorming from evaluation?", ["Evaluation during generation suppresses ideas", "Ideas should never be evaluated", "Criticism is always wrong", "Evaluation needs no criteria"], 0, "Early judgment shrinks the pool of ideas before they can develop."],
      ["Apply", "A team is stuck on “reduce support tickets.” Which move helps most?", ["Repeat the same framing louder", "Reframe it as “help users succeed without needing support”", "Cut the discussion short", "Pick the first idea"], 1, "A different problem framing makes different solutions visible."],
      ["Analyze", "An engineer says a wrench cannot be used as a hammer because it is “for turning.” Which barrier is this?", ["Functional fixedness", "Prospective failure", "Source confusion", "Vigilance decrement"], 0, "Seeing an object only in its usual function limits creative use."],
      ["Tool selection", "Which use of AI best supports creativity?", ["Accept the first generated idea", "Generate varied options, then judge them against your own criteria", "Let it decide the problem", "Avoid any evaluation"], 1, "AI adds variety, while people remain responsible for criteria and choice."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each creative technique with its example.",
        pairs: [
          ["Divergent thinking", "Listing thirty onboarding ideas before ranking"],
          ["Convergent thinking", "Scoring options against cost and impact"],
          ["Analogical thinking", "Borrowing the circuit breaker idea for failure handling"],
          ["Reframing", "Turning “fewer tickets” into “users succeed on their own”"]
        ],
        explanation: "Each technique does a different job: widening, narrowing, borrowing structure and redefining."
      },
      {
        kind: "ordering",
        type: "Ordering",
        prompt: "Order a sound creative problem-solving session.",
        items: ["Define the problem and criteria", "Generate many options without judging", "Evaluate options against the criteria", "Select and test the best option"],
        explanation: "Criteria first, then wide generation, then evaluation and testing."
      }
    ]
  },
  social: {
    concepts: [
      ["Empathy", "Sharing in or sensing another person's emotional state."],
      ["Theory of Mind", "Representing what others believe, want, and know, which may differ from your own."],
      ["Perspective Taking", "Deliberately considering a situation from another person's position."],
      ["Social Intelligence", "Reading social situations and adjusting behavior to them."],
      ["Collaboration Intelligence", "Combining individual thinking into shared understanding and joint action."],
      ["Negotiation Thinking", "Working out interests, alternatives, and trade-offs with another party."]
    ],
    objectives: [
      "Distinguish empathy, theory of mind and perspective taking.",
      "Explain how shared understanding is built and how it breaks down.",
      "Diagnose collaboration problems as differences in knowledge, goals or assumptions rather than character.",
      "Use tools and AI to support communication without replacing direct understanding of other people."
    ],
    examples: [
      ["Software engineering", "A reviewer explains a change by assuming what the author already knows and what they do not."],
      ["Product management", "A manager restates stakeholders' interests before proposing a compromise."],
      ["Incident response", "A responder briefs the incoming on-call engineer with exactly the context that engineer lacks."]
    ],
    mappings: [
      ["Theory of mind", "Stakeholder maps, personas", "Draft messages from another reader's view", "A model of someone is a guess, so confirm it with them."],
      ["Perspective taking", "Interviews, user research", "Alternative viewpoint summaries", "Summaries cannot replace hearing the person."],
      ["Collaboration intelligence", "Shared docs, decision logs", "Meeting summaries and action tracking", "A summary can lock in a wrong shared picture."],
      ["Negotiation thinking", "Interest lists, BATNA notes", "Option generation for trades", "Tools do not know the other party's real constraints."]
    ],
    failures: [
      ["Curse of knowledge", "Experts forget what it was like not to know, and skip essential context."],
      ["Egocentric bias", "Others are assumed to see and want what you do."],
      ["Fundamental attribution error", "Others' behavior is blamed on character instead of situation."],
      ["False consensus", "People believe they agree because no one has stated the differences."]
    ],
    relations: ["Working Memory", "Mental Models", "Reflection", "Self Awareness", "Systems Thinking"],
    quiz: [
      ["Remember", "Which capability involves representing what others believe, want and know?", ["Theory of mind", "Vigilance", "Chunking", "Recall"], 0, "Theory of mind models other people's mental states, which may differ from one's own."],
      ["Understand", "Why can an expert explain a topic poorly to a beginner?", ["They know too little", "They forget what not knowing feels like (curse of knowledge)", "They lack long-term memory", "Experts never use examples"], 1, "Expertise makes it hard to see what a novice lacks."],
      ["Apply", "You are handing an incident to the next on-call engineer. What should you include?", ["Everything you know in no order", "The context they lack, ordered by what they must do first", "Only the root cause", "Nothing; they can look it up"], 1, "A good handoff is built around the receiver's knowledge and needs."],
      ["Analyze", "A colleague is late, and you decide they are careless without knowing why. Which bias is this?", ["Fundamental attribution error", "Vigilance decrement", "Prospective failure", "Schema intrusion"], 0, "Attributing behavior to character while ignoring the situation is the fundamental attribution error."],
      ["Tool selection", "Which use of AI best supports collaboration?", ["Treat its meeting summary as the agreed truth", "Use the summary as a draft and confirm it with the participants", "Skip meetings entirely", "Let it decide priorities"], 1, "A summary is a draft of the shared picture and must be checked by the people who share it."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each social capability with its example.",
        pairs: [
          ["Empathy", "Noticing a teammate is stressed and acknowledging it"],
          ["Theory of mind", "Realizing a reviewer does not know the legacy module's history"],
          ["Perspective taking", "Walking through a release from the support team's point of view"],
          ["Negotiation thinking", "Listing both sides' interests before trading options"]
        ],
        explanation: "Empathy senses feeling, theory of mind models knowledge, perspective taking adopts a viewpoint, and negotiation weighs interests."
      },
      {
        kind: "multi",
        type: "Multiple select",
        prompt: "Which practices reduce the curse of knowledge in documentation?",
        options: ["Ask a newcomer to follow the draft and note where they stall", "Define terms and assumptions explicitly", "Skip steps that feel obvious to you", "Use as much internal shorthand as possible"],
        answers: [0, 1],
        explanation: "Testing with a novice and stating assumptions expose what the expert no longer notices."
      }
    ]
  },
  "self-regulation": {
    concepts: [
      ["Calibration", "Matching confidence to actual accuracy."],
      ["Emotional Regulation", "Influencing which emotions arise and how they affect thought and action."],
      ["Self Monitoring", "Observing your own performance, state and behavior as they happen."],
      ["Habit Formation", "Building automatic behavior through cues, repetition and reward."],
      ["Resilience", "Recovering and continuing effectively after setbacks."],
      ["Focus Management", "Shaping time, environment and commitments to protect attention."]
    ],
    objectives: [
      "Describe how emotion and stress affect attention, memory and judgment.",
      "Explain how habits form and how to change them by changing cues and routines.",
      "Check confidence against evidence and adjust it.",
      "Use tools and AI for prompts and tracking while keeping responsibility for the behavior itself."
    ],
    examples: [
      ["Incident response", "An on-call engineer takes a slow breath and re-reads the runbook step before acting under pressure."],
      ["Daily work", "A developer ties a short review of the day's priorities to the first coffee."],
      ["Leadership", "A lead compares past estimates with actual outcomes and adjusts their confidence."]
    ],
    mappings: [
      ["Calibration", "Prediction logs, scorecards", "Prompts to compare predictions with outcomes", "A tool cannot know your true confidence; log it honestly."],
      ["Self monitoring", "Time tracking, checklists", "Pattern summaries of habits", "Tracking is not the same as changing the behavior."],
      ["Habit formation", "Reminders, routine anchors", "Nudges and streak reports", "Streaks can reward the metric, not the behavior."],
      ["Focus management", "Calendar blocks, do-not-disturb", "Schedule suggestions", "Protect priorities you chose, not the tool's defaults."]
    ],
    failures: [
      ["Overconfidence", "Confidence exceeds accuracy, so errors are not checked."],
      ["Emotional hijack", "Strong emotion narrows attention and drives impulsive choices."],
      ["Habit drift", "A routine erodes when its cue disappears."],
      ["Rumination", "Repeated thinking about a setback replaces useful action."]
    ],
    relations: ["Attentional Control", "Executive Control", "Self-Control", "Metacognition", "Reflection"],
    quiz: [
      ["Remember", "Calibration means matching:", ["Confidence to accuracy", "Speed to accuracy", "Memory to attention", "Effort to rewards"], 0, "A calibrated person is as confident as their evidence and track record justify."],
      ["Understand", "Why do habits fade when the cue disappears?", ["The behavior was triggered by the cue", "Habits are stored only in working memory", "Rewards stop mattering entirely", "Attention becomes unlimited"], 0, "Habits depend on cues, so removing the cue weakens the trigger."],
      ["Apply", "You want to start a daily end-of-day review. What helps most?", ["Rely on remembering", "Attach it to an existing routine such as closing your laptop", "Do it only when motivated", "Make it three hours long"], 1, "Anchoring a new behavior to an existing cue makes it more likely to occur."],
      ["Analyze", "A developer is certain a fix works but has been wrong on 4 of the last 5 similar fixes. What is the issue?", ["Good calibration", "Overconfidence", "Strong recognition memory", "Resilience"], 1, "Confidence exceeds the observed track record."],
      ["Tool selection", "Which use of a habit-tracking app best supports regulation?", ["Chasing the longest streak at any cost", "Reviewing why missed days happened and adjusting the cue", "Ignoring the data", "Adding more notifications"], 1, "Using the data to understand and change the cause supports the behavior itself."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each self-regulation concept with its example.",
        pairs: [
          ["Calibration", "Comparing predicted and actual completion times"],
          ["Emotional regulation", "Pausing and breathing before replying to a critical review"],
          ["Habit formation", "Starting a review every time you close the laptop"],
          ["Focus management", "Blocking two hours on the calendar for deep work"]
        ],
        explanation: "Each concept regulates a different aspect: confidence, feeling, routine and attention."
      },
      {
        kind: "multi",
        type: "Multiple select",
        prompt: "Which practices improve calibration?",
        options: ["Record predictions and check them against outcomes", "Seek feedback on your estimates", "Avoid looking at past results", "Treat feeling sure as proof"],
        answers: [0, 1],
        explanation: "Recorded predictions and external feedback show how accurate confidence really is."
      }
    ]
  },
  future: {
    concepts: [
      ["Mental Simulation", "Running a plausible sequence of events in the mind to anticipate outcomes."],
      ["Scenario Planning", "Exploring several distinct futures to prepare for uncertainty."],
      ["Forecasting", "Estimating the probability or size of future outcomes."],
      ["Strategic Thinking", "Choosing direction by weighing goals, constraints, and other actors over time."],
      ["Risk Assessment", "Identifying what could go wrong, how likely it is, and how severe."]
    ],
    objectives: [
      "Distinguish prediction, scenario exploration and strategic choice.",
      "Explain why forecasts need probabilities, base rates and later scoring.",
      "Use pre-mortems and scenario thinking to expose risks that optimism hides.",
      "Use tools and AI for modeling while keeping assumptions visible and owned by people."
    ],
    examples: [
      ["Architecture", "A team runs a pre-mortem: “It is a year later and this migration failed. Why?”"],
      ["Product strategy", "A group writes three scenarios for how a competitor might respond."],
      ["Operations", "An SRE estimates the probability and impact of a region outage and prioritizes mitigation."]
    ],
    mappings: [
      ["Mental simulation", "Walkthroughs, runbooks", "Simulated outcomes of alternatives", "A simulation is only as good as its assumptions."],
      ["Scenario planning", "Scenario matrices", "Drafts of divergent scenarios", "A scenario set is not a forecast."],
      ["Forecasting", "Prediction logs, base rate tables", "Model-based estimates", "A confident number from a model is not accuracy."],
      ["Risk assessment", "Risk register, pre-mortem", "Risk lists from past incidents", "Lists miss novel risks that have no history."]
    ],
    failures: [
      ["Planning fallacy", "Plans assume success and ignore typical delays."],
      ["Anchoring on the present", "The future is imagined as a small change from now."],
      ["Overconfident forecast", "Ranges are too narrow, so surprises feel impossible."],
      ["Neglecting base rates", "A vivid case outweighs how often such outcomes actually happen."]
    ],
    relations: ["Planning", "Causal Reasoning", "Counterfactual Thinking", "Systems Thinking", "Bayesian Thinking"],
    quiz: [
      ["Remember", "A pre-mortem asks the team to:", ["Imagine the project failed and explain why", "Celebrate success early", "Estimate costs only", "Remove all risks"], 0, "It surfaces risks by assuming failure has already happened."],
      ["Understand", "Why track forecasts and score them later?", ["To learn how accurate and calibrated you are", "To avoid making forecasts", "To prove the first guess right", "To replace base rates"], 0, "Scoring forecasts gives the feedback needed to improve them."],
      ["Apply", "You must estimate a project that resembles five past projects. What should you do?", ["Ignore the history", "Start from how long similar projects actually took", "Assume nothing goes wrong", "Use the most optimistic case"], 1, "Starting from the base rate corrects optimism about the specific case."],
      ["Analyze", "A team plans around a single expected future and is surprised when conditions change. What was missing?", ["Scenario thinking", "Recognition memory", "Procedural skill", "Chunking"], 0, "Considering several distinct futures prepares a team for change."],
      ["Tool selection", "Which use of a forecasting model is most responsible?", ["Publish its single number as certain", "Show the assumptions and a range, then compare with outcomes", "Hide the inputs", "Avoid reviewing it"], 1, "Visible assumptions and later comparison keep the model accountable."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each future-thinking concept with its example.",
        pairs: [
          ["Mental simulation", "Walking through a deploy step by step to spot gaps"],
          ["Scenario planning", "Writing three competing market futures"],
          ["Forecasting", "Stating a 70% chance of finishing by March and checking it later"],
          ["Risk assessment", "Rating the likelihood and severity of a region outage"]
        ],
        explanation: "Simulation rehearses, scenarios explore, forecasts estimate and risk assessment ranks threats."
      },
      {
        kind: "multi",
        type: "Multiple select",
        prompt: "Which practices improve forecasts?",
        options: ["Use base rates from similar cases", "Give ranges, not single numbers", "Never revisit past predictions", "State predictions vaguely"], 
        answers: [0, 1],
        explanation: "Base rates and ranges keep forecasts honest, and revisiting them allows learning."
      }
    ]
  },
  decision: {
    concepts: [
      ["Recognition Decisions", "Choosing quickly because the situation matches a familiar pattern."],
      ["Analytical Decisions", "Comparing options deliberately against explicit criteria."],
      ["Bayesian Thinking", "Updating beliefs in proportion to how strong new evidence is."],
      ["Expected Value Thinking", "Weighing outcomes by probability and size of payoff."],
      ["Cost-Benefit Analysis", "Comparing the total costs and benefits of an option."],
      ["Trade-Off Management", "Choosing between competing goods and making the sacrifice explicit."]
    ],
    objectives: [
      "Decide when recognition-based and analytical decisions are each appropriate.",
      "Update beliefs with evidence instead of treating the first impression as settled.",
      "Make trade-offs and assumptions explicit so they can be reviewed.",
      "Use decision tools and AI to structure choices while keeping the decision and its accountability with people."
    ],
    examples: [
      ["Incident response", "An experienced on-call engineer recognizes a familiar failure signature and acts, then checks that the evidence still fits."],
      ["Architecture", "A team compares two designs on cost, risk and reversibility in a written decision record."],
      ["Product management", "A manager revises the launch odds as early customer data arrives."]
    ],
    mappings: [
      ["Recognition decisions", "Runbooks, checklists", "Suggestions based on similar past cases", "Familiar is not the same as correct."],
      ["Analytical decisions", "Decision matrix, decision records", "Option comparison summaries", "Weights are choices; the tool cannot know your values."],
      ["Bayesian thinking", "Base-rate tables, probability notes", "Updated probabilities from new evidence", "Poor priors produce confident wrong results."],
      ["Trade-off management", "Trade-off tables, ADRs", "Alternative trade-off framings", "Do not let a tool hide what is being sacrificed."]
    ],
    failures: [
      ["Anchoring", "An early number or option dominates later judgment."],
      ["Sunk cost", "Past investment drives a choice that future value does not support."],
      ["Base-rate neglect", "A vivid case outweighs how often the outcome really occurs."],
      ["Analysis paralysis", "Deliberation continues past the point where more information would change the choice."]
    ],
    relations: ["Critical Thinking", "Forecasting", "Risk Assessment", "Recognition Memory", "Executive Control"],
    quiz: [
      ["Remember", "A recognition decision is made by:", ["Matching the situation to a familiar pattern", "Scoring every option", "Waiting indefinitely", "Choosing at random"], 0, "Experienced people often decide by recognizing a pattern and an appropriate action."],
      ["Understand", "Why write down trade-offs in a decision record?", ["So the sacrifice and assumptions can be reviewed later", "To avoid deciding", "To hide disagreement", "To prove the choice was perfect"], 0, "Explicit trade-offs make the reasoning inspectable and revisable."],
      ["Apply", "New data arrives that is somewhat more likely if your hypothesis is false. What should you do?", ["Ignore it", "Lower your confidence appropriately", "Raise your confidence", "Stop collecting data"], 1, "Evidence that fits the rival hypothesis better should reduce belief in yours."],
      ["Analyze", "A team continues a failing project because they have already spent a year on it. What bias is this?", ["Sunk cost", "Anchoring", "Prospective failure", "Chunking"], 0, "Past, unrecoverable investment is driving a forward-looking choice."],
      ["Tool selection", "Which use of a decision-matrix tool is most responsible?", ["Let the final score decide with no review", "Check the weights and criteria with stakeholders before trusting the result", "Hide the weights", "Add random options"], 1, "Weights encode values, so they must be examined by the people accountable."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each decision concept with its example.",
        pairs: [
          ["Recognition decision", "Recognizing a known failure signature and acting"],
          ["Analytical decision", "Scoring two designs on cost, risk and reversibility"],
          ["Bayesian thinking", "Revising launch odds as early data arrives"],
          ["Trade-off management", "Choosing speed over cost and recording the sacrifice"]
        ],
        explanation: "The concepts differ in speed, structure, evidence updating and explicit sacrifice."
      },
      {
        kind: "multi",
        type: "Multiple select",
        prompt: "Which situations favor an analytical rather than a recognition decision?",
        options: ["The situation is novel", "The stakes are high and the choice is hard to reverse", "The situation closely matches many past cases", "A decision is needed in seconds"],
        answers: [0, 1],
        explanation: "Novelty and high, irreversible stakes call for deliberate analysis."
      }
    ]
  },
  metacognition: {
    concepts: [
      ["Reflection", "Reviewing experience to learn what to keep or change."],
      ["Thinking About Thinking", "Treating your own reasoning as something you can observe and evaluate."],
      ["Self Awareness", "Knowing your strengths, limits, biases and current state."],
      ["Strategy Selection", "Choosing how to approach a task based on the task and your own tendencies."],
      ["Learning Regulation", "Planning, monitoring and adjusting how you learn."],
      ["Cognitive Debugging", "Locating and fixing errors in your own thinking process."],
      ["Human ↔ AI Cognition", "Understanding how human thinking and AI systems complement and mislead each other, and dividing the work accordingly."]
    ],
    objectives: [
      "Distinguish thinking about a problem from thinking about how you are thinking about it.",
      "Use monitoring questions to detect confusion and errors early.",
      "Choose and change strategies in response to evidence of what is working.",
      "Use reflection tools and AI as prompts while keeping the evaluation of your own thinking your own."
    ],
    examples: [
      ["Software engineering", "A developer notices three hours of guessing and switches to writing a failing test."],
      ["Learning", "A student realizes they can recognize a concept but not explain it, and switches to self-explanation."],
      ["Leadership", "A lead keeps a decision journal and reviews it for recurring blind spots."]
    ],
    mappings: [
      ["Reflection", "Journals, retrospectives", "Prompts and pattern summaries", "A summary of your notes is not reflection itself."],
      ["Cognitive debugging", "Rubber-duck explanation, checklists", "Questions that probe the reasoning", "A tool cannot see what you assumed silently."],
      ["Strategy selection", "Strategy checklists, playbooks", "Suggested approaches for the task", "A suggested strategy still needs your judgment on fit."],
      ["Learning regulation", "Study plans, spaced review calendars", "Progress and gap analysis", "Progress numbers can hide shallow understanding."]
    ],
    failures: [
      ["Dunning–Kruger pattern", "Low skill makes it hard to see one's own mistakes."],
      ["Strategy lock-in", "A comfortable method continues after it stops working."],
      ["No monitoring", "Confusion goes unnoticed until the result fails."],
      ["Shallow reflection", "A review lists events without asking why they happened."]
    ],
    relations: ["Calibration", "Executive Control", "Learning Regulation", "Critical Thinking", "Cognitive Flexibility"],
    quiz: [
      ["Remember", "Metacognition is best described as:", ["Thinking about and regulating one's own thinking", "A type of memory capacity", "A kind of attention filter", "A formal logic"], 0, "Metacognition monitors and directs one's own cognitive processes."],
      ["Understand", "Why is monitoring useful while working?", ["It lets you notice confusion before the result fails", "It replaces knowledge", "It guarantees accuracy", "It removes the need for strategies"], 0, "Noticing trouble early allows a change of approach."],
      ["Apply", "After an hour of trial-and-error debugging, what is the best metacognitive move?", ["Keep guessing faster", "Stop and choose a different strategy, such as writing a failing test", "Ignore the problem", "Restart the same approach"], 1, "Evaluating progress and switching strategy is the core of strategy selection."],
      ["Analyze", "A review lists what happened in a sprint but never asks why. What is missing?", ["Reflection that explains causes", "More recognition memory", "Faster typing", "Extra scaffolding"], 0, "Reflection needs explanation and a decision about what to change."],
      ["Tool selection", "Which use of an AI reflection assistant is most responsible?", ["Accept its conclusions about you as fact", "Use its questions to examine your own reasoning and decide yourself", "Skip reflecting", "Let it choose all your strategies"], 1, "The assistant prompts, and the evaluation of your thinking stays yours."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each metacognitive concept with its example.",
        pairs: [
          ["Reflection", "Reviewing a decision journal for recurring blind spots"],
          ["Self awareness", "Knowing you tend to under-estimate integration work"],
          ["Strategy selection", "Switching from guessing to writing a failing test"],
          ["Cognitive debugging", "Explaining your reasoning aloud to find the faulty step"]
        ],
        explanation: "Each concept applies metacognition differently: reviewing, knowing, choosing and repairing."
      },
      {
        kind: "ordering",
        type: "Ordering",
        prompt: "Order a metacognitive cycle.",
        items: ["Plan an approach", "Monitor how it is going", "Evaluate the result", "Adjust the strategy for next time"],
        explanation: "Planning, monitoring, evaluating and adjusting form the basic regulation cycle."
      }
    ]
  }
};

const atlasDomains = [
  {
    id: "attention",
    number: "01",
    name: "Attention Systems",
    shortName: "Attention",
    purpose: "Selecting, prioritizing, and sustaining awareness in the presence of competing information.",
    color: "#d68a36",
    status: "ready",
    page: "attention.html",
    concepts: [
      ["Selective Attention", "Prioritizing one source of information over competing input."],
      ["Sustained Attention", "Maintaining engagement with a task over time."],
      ["Divided Attention", "Coordinating attention across concurrent demands, usually with costs."],
      ["Vigilance", "Monitoring for rare but important signals."],
      ["Attentional Control", "Directing or redirecting focus according to goals."],
      ["Salience Detection", "Noticing information that stands out because of novelty, relevance, or threat."],
      ["Orienting", "Shifting attention toward a location, stimulus, or source."],
      ["Task Focus", "Maintaining priority on the current objective despite distraction."]
    ],
    objectives: [
      "Distinguish selective, sustained, divided, and goal-directed attention.",
      "Explain why divided attention commonly produces switching costs rather than true parallel thought.",
      "Diagnose attention failures in workplace scenarios without treating every error as inattention.",
      "Select environmental, workflow, and AI supports that reduce avoidable competition for attention."
    ],
    examples: [
      ["Software engineering", "A developer silences noncritical notifications while tracing a production defect."],
      ["Incident response", "An operator monitors a stable dashboard for one rare but consequential signal."],
      ["Leadership", "A facilitator redirects a meeting from an urgent tangent to the decision the group must make."]
    ],
    mappings: [
      ["Selective attention", "Focus mode, notification rules", "Priority filtering and alert triage", "Filters can hide weak but important signals."],
      ["Sustained attention", "Timeboxing, quiet workspace", "Progress cues and break recommendations", "Automation should not turn vigilance into passive complacency."],
      ["Orienting", "Visual hierarchy, meaningful alerts", "Context-sensitive highlighting", "Salience is not the same as importance."],
      ["Attentional control", "Task list, meeting agenda", "Goal-aware assistant", "The human remains responsible for choosing the goal."]
    ],
    failures: [
      ["Capture", "A novel notification pulls attention away from the task regardless of its importance."],
      ["Vigilance decrement", "Detection performance falls during prolonged monitoring."],
      ["Attentional tunneling", "Intense focus on one cue hides other relevant evidence."],
      ["Switching residue", "Part of the previous task remains active after attention moves elsewhere."]
    ],
    relations: ["Working Memory", "Executive Control", "Salience Detection", "Metacognition", "Task Switching"],
    quiz: [
      ["Remember", "Which attention function prioritizes one source over competing input?", ["Selective attention", "Episodic memory", "Procedural memory", "Concept blending"], 0, "Selective attention prioritizes relevant input while other input receives less processing."],
      ["Understand", "Why is rapidly alternating between chat and debugging not usually cost-free divided attention?", ["Both tasks enter long-term memory", "The mind switches task sets and carries residue", "Attention becomes unlimited with practice", "The tasks merge into one schema"], 1, "Alternation requires task-set changes and can leave residue from the previous task."],
      ["Apply", "An operator misses a rare alarm after watching an unchanged dashboard for two hours. Which limitation is most relevant?", ["Vigilance decrement", "Semantic interference", "Concept blending", "Prospective memory"], 0, "Sustained monitoring for rare events is especially vulnerable to vigilance decrement."],
      ["Analyze", "A developer ignores all logs except the database trace and misses a network timeout. What happened?", ["Attentional tunneling", "Consolidation", "Recognition memory", "Divergent thinking"], 0, "Narrow focus on one evidence stream excluded another relevant source."],
      ["Tool selection", "Which design best supports attention without pretending to decide importance for the user?", ["Block every alert permanently", "Group alerts by rule and let the operator inspect exceptions", "Display all alerts with equal emphasis", "Ask the user to remember every threshold"], 1, "Rule-based grouping reduces competition while preserving review and human judgment."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each attention function with the practice that best supports it.",
        pairs: [
          ["Selective attention", "Notification rules that filter low-priority alerts"],
          ["Sustained attention", "Timeboxed focus blocks with scheduled breaks"],
          ["Orienting", "Visual hierarchy that draws the eye to a critical alert"],
          ["Attentional control", "An agenda that keeps a meeting on its decision"]
        ],
        explanation: "Each practice targets a different function: filtering, endurance, directing awareness, and holding a goal."
      },
      {
        kind: "multi",
        type: "Multiple select",
        prompt: "Which practices reduce switching residue?",
        options: ["Park the current task with a written next step before switching", "Check chat at set times instead of continuously", "Keep every notification on at equal emphasis", "Leave three tasks half-open in parallel"],
        answers: [0, 1],
        explanation: "Closing loops and batching interruptions reduce the unfinished material carried into the next task."
      }
    ]
  },
  {
    id: "memory",
    number: "02",
    name: "Memory Systems",
    shortName: "Memory",
    purpose: "Maintaining, storing, retrieving, and reconstructing information across different timescales and tasks.",
    color: "#5b82c4",
    status: "ready",
    page: "memory.html",
    concepts: [
      ["Working Memory", "Keeping a limited amount of information available for active use."],
      ["Long-Term Memory", "Durable retention across semantic, episodic, and procedural forms."],
      ["Episodic Memory", "Memory for particular experienced events and their context."],
      ["Semantic Memory", "General knowledge, concepts, meanings, and facts."],
      ["Procedural Memory", "Learned skills and ways of performing actions."],
      ["Recognition Memory", "Identifying something as previously encountered."],
      ["Recall", "Producing information without the target being presented."],
      ["Prospective Memory", "Remembering to perform an intended action later."]
    ],
    objectives: [
      "Distinguish working memory from durable long-term retention.",
      "Compare episodic, semantic, procedural, recognition, recall, and prospective memory.",
      "Explain how retrieval and reconstruction can introduce error.",
      "Design external supports that reduce avoidable memory demands without replacing understanding."
    ],
    examples: [
      ["Software engineering", "A developer keeps two variable relationships active while applying a familiar refactoring procedure."],
      ["Incident response", "An engineer recalls a previous outage but checks whether the current evidence actually matches it."],
      ["Project work", "A calendar reminder supports prospective memory for a dependency review next week."]
    ],
    mappings: [
      ["Working memory", "Scratchpad, notes, whiteboard", "Conversation context and structured summaries", "A context window does not understand or remember like a person."],
      ["Semantic memory", "Knowledge base, glossary", "Retrieval-augmented generation", "Retrieved text can be irrelevant or wrong."],
      ["Episodic memory", "Incident timeline, journal", "Event summarization", "A record is not the lived event and may omit context."],
      ["Prospective memory", "Calendar, reminders, workflow rules", "Proactive reminders", "Excessive reminders become noise."]
    ],
    failures: [
      ["Overload", "Active information exceeds what can be maintained and used reliably."],
      ["Interference", "Similar information competes during learning or retrieval."],
      ["Source confusion", "A person remembers information but misattributes where it came from."],
      ["Prospective failure", "An intended future action is forgotten when the relevant moment arrives."]
    ],
    relations: ["Attention", "Chunking", "Schemas", "Learning", "Executive Control"],
    quiz: [
      ["Remember", "Which system keeps information available while reasoning?", ["Working memory", "Procedural memory", "Episodic memory", "Recognition memory"], 0, "Working memory supports active maintenance and use."],
      ["Understand", "Which example best distinguishes recognition from recall?", ["Recognizing a command in a menu versus typing it from memory", "Remembering an outage versus documenting it", "Planning versus prioritizing", "Reading versus listening"], 0, "Recognition presents the target; recall requires producing it without that direct cue."],
      ["Apply", "Remembering to approve a change request tomorrow primarily involves:", ["Prospective memory", "Recognition memory", "Semantic memory", "Vigilance"], 0, "Prospective memory concerns remembering an intended future action."],
      ["Analyze", "A remembered incident causes an engineer to assume the same root cause despite conflicting evidence. Which risk is clearest?", ["Episodic memory is guiding an unsupported match", "Working memory became permanent", "Procedural memory disappeared", "Recognition prevented attention"], 0, "Past episodes can guide useful hypotheses, but resemblance is not proof of the same cause."],
      ["Tool selection", "You need to compare twelve dependencies during planning. What is the best first support?", ["Keep all twelve in mind", "Externalize them in a dependency map", "Read them faster", "Ask everyone to memorize three"], 1, "A shared external representation reduces maintenance demands and supports relationship inspection."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each memory system with the situation that relies on it.",
        pairs: [
          ["Working memory", "Holding three requirements in mind while writing a function"],
          ["Semantic memory", "Knowing what a retry policy is"],
          ["Episodic memory", "Recalling how last month's incident bridge unfolded"],
          ["Procedural memory", "Typing a familiar deployment sequence fluently"]
        ],
        explanation: "Working memory is active workspace; semantic, episodic, and procedural memory store facts, events, and skills."
      },
      {
        kind: "ordering",
        type: "Ordering",
        prompt: "Order the path of information from an event to a later recollection.",
        items: ["Attention selects the information", "Working memory holds and manipulates it", "Consolidation stores it in long-term memory", "Retrieval brings it back later"],
        explanation: "Information must be attended to, processed, stored, and then retrieved."
      }
    ]
  },
  {
    id: "executive",
    number: "03",
    name: "Executive Systems",
    shortName: "Executive",
    purpose: "Regulating goals, strategies, priorities, and behavior when automatic responses are insufficient.",
    color: "#c45c6f",
    status: "ready",
    page: "executive.html",
    concepts: [
      ["Executive Control", "Coordinating goal-directed regulation rather than acting as an inner boss."],
      ["Planning", "Representing steps, constraints, and dependencies toward an outcome."],
      ["Prioritization", "Allocating limited time and effort according to value and urgency."],
      ["Goal Management", "Maintaining, selecting, and revising goals across activity."],
      ["Inhibition", "Suppressing an irrelevant or inappropriate response."],
      ["Self-Control", "Regulating behavior in relation to longer-term aims."],
      ["Cognitive Flexibility", "Changing perspectives, rules, or strategies when conditions change."],
      ["Task Switching", "Reconfiguring from one task set to another, usually with costs."]
    ],
    objectives: [
      "Explain executive control without invoking a little manager inside the mind.",
      "Distinguish planning, prioritization, inhibition, flexibility, and task switching.",
      "Diagnose when a problem reflects regulation rather than missing knowledge.",
      "Use workflows and AI assistance to support control while keeping goals and judgment human-owned."
    ],
    examples: [
      ["Software engineering", "A developer notices an attractive refactor is outside the incident-fix goal and defers it."],
      ["Product management", "A product manager revises a plan when a dependency invalidates the original sequence."],
      ["Leadership", "A leader keeps the decision criterion visible while competing requests arrive."]
    ],
    mappings: [
      ["Planning", "Roadmap, checklist, dependency board", "Plan drafting and constraint detection", "A generated plan inherits missing or incorrect assumptions."],
      ["Prioritization", "Decision matrix, work queue", "Ranking suggestions", "The system cannot own organizational values or accountability."],
      ["Inhibition", "Focus policy, review gate", "Distraction suppression", "Over-filtering can conceal legitimate exceptions."],
      ["Cognitive flexibility", "Scenario board, retrospective", "Alternative generation", "More alternatives do not guarantee a better switch."]
    ],
    failures: [
      ["Goal neglect", "The person knows the rule or objective but fails to keep it influential during action."],
      ["Planning fallacy", "A plan underestimates uncertainty, dependency, or required effort."],
      ["Perseveration", "A strategy continues despite evidence that it is no longer working."],
      ["Switching cost", "Reconfiguration consumes time and increases error after changing tasks."]
    ],
    relations: ["Attention", "Working Memory", "Metacognition", "Decision Making", "Planning"],
    quiz: [
      ["Remember", "Executive control is best described as:", ["A little manager storing every goal", "Interacting processes that regulate goal-directed activity", "A type of long-term memory", "A synonym for intelligence"], 1, "Executive control names regulatory processes, not a homunculus or single storage system."],
      ["Understand", "What is the difference between monitoring and control?", ["Monitoring evaluates; control helps select and carry out a response", "Control stores facts; monitoring stores skills", "They are always identical", "Monitoring is only emotional"], 0, "Monitoring detects or evaluates; control helps regulate what happens next."],
      ["Apply", "A team keeps starting urgent tasks and abandoning unfinished work. Which capability is most directly implicated?", ["Goal management and prioritization", "Recognition memory", "Concept blending", "Semantic encoding"], 0, "The pattern concerns selecting and maintaining goals under competing demands."],
      ["Analyze", "An engineer keeps using a failed diagnostic strategy despite contradictory evidence. Which failure is clearest?", ["Perseveration", "Vigilance", "Prospective memory", "Divergent thinking"], 0, "Perseveration is continued use of a strategy that should be revised."],
      ["Tool selection", "How should an AI planning assistant support executive control responsibly?", ["Choose the user's values silently", "Generate options and expose assumptions for human review", "Prevent plan changes", "Hide uncertainty to reduce distraction"], 1, "The assistant can externalize options and constraints while the person retains goals and judgment."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each executive function with the behavior that shows it.",
        pairs: [
          ["Goal management", "Keeping the sprint objective visible while choosing tasks"],
          ["Inhibition", "Not replying to a tangent in the middle of a decision"],
          ["Task switching", "Moving from coding to an incident and back"],
          ["Planning", "Sequencing work around its dependencies"]
        ],
        explanation: "Each behavior expresses a distinct regulatory function that works together with the others."
      },
      {
        kind: "multi",
        type: "Multiple select",
        prompt: "Which of these are executive functions?",
        options: ["Inhibition", "Goal management", "Cognitive flexibility", "Recognition memory"],
        answers: [0, 1, 2],
        explanation: "Inhibition, goal management, and flexibility regulate behavior; recognition memory is a memory function."
      }
    ]
  },
  {
    id: "knowledge",
    number: "04",
    name: "Knowledge Structures",
    shortName: "Knowledge",
    purpose: "Organizing concepts, expectations, relationships, and situation-specific representations.",
    color: "#8e6ab8",
    status: "ready",
    page: "knowledge.html",
    concepts: [
      ["Schemas", "Organized general knowledge about a type of object, event, or situation."],
      ["Mental Models", "Representations used to understand or simulate a particular system or situation."],
      ["Conceptual Frameworks", "Explicit structures for organizing and comparing ideas."],
      ["Scripts", "Schemas organized around a typical sequence of events."],
      ["Knowledge Maps", "External visualizations of concepts and their connections."],
      ["Taxonomies", "Hierarchical classifications based on defined grouping principles."],
      ["Ontologies", "Formal specifications of entities, properties, and relationships."],
      ["Situation Models", "Evolving representations of the particular events described or experienced."]
    ],
    objectives: [
      "Distinguish concepts, facts, schemas, scripts, mental models, taxonomies, and ontologies.",
      "Explain how prior knowledge contributes to a model of a particular situation.",
      "Identify when a schema helps comprehension and when it creates an unsupported assumption.",
      "Choose an external structure appropriate to classification, explanation, simulation, or navigation."
    ],
    examples: [
      ["Software architecture", "A component diagram supports a model of how this system behaves, while an ontology defines entity relationships."],
      ["Reading", "A recipe schema helps interpret mixing, while the situation model represents Nia's particular bowl and ingredients."],
      ["Knowledge management", "A taxonomy organizes documents; a knowledge map reveals connections across categories."]
    ],
    mappings: [
      ["Schema", "Playbook, pattern catalog", "Relevant pattern retrieval", "A typical pattern can be mistaken for what actually happened."],
      ["Mental model", "Diagram, simulation, prototype", "Interactive explanation and scenario simulation", "A fluent simulation may still encode a wrong model."],
      ["Taxonomy", "Folder hierarchy, classification tree", "Automated tagging suggestions", "One hierarchy may suppress cross-cutting relationships."],
      ["Ontology", "Knowledge graph, semantic model", "Entity extraction and relationship proposals", "Formal precision does not guarantee conceptual validity."]
    ],
    failures: [
      ["Schema intrusion", "Typical details are assumed or remembered even though they were not present."],
      ["Model fixation", "A familiar representation persists despite contradictory evidence."],
      ["Category error", "Something is classified by the wrong organizing principle."],
      ["False precision", "A formal-looking map implies certainty the underlying knowledge does not support."]
    ],
    relations: ["Long-Term Memory", "Abductive Reasoning", "Learning", "Reasoning", "Situation Models"],
    quiz: [
      ["Remember", "Which structure represents a typical event sequence?", ["Script", "Working memory", "Vigilance", "Inhibition"], 0, "A script is a schema organized around a typical sequence."],
      ["Understand", "How does a schema differ from a situation model?", ["A schema is general knowledge; a situation model represents this case", "A schema is temporary; a model is always permanent", "A schema is a process; a model is a tool", "There is no useful distinction"], 0, "The schema contributes general knowledge; the situation model tracks the particular event."],
      ["Apply", "You need a formal specification of entities, properties, and relations for data integration. Choose:", ["Ontology", "Script", "Episodic memory", "Vigilance map"], 0, "Ontologies formally specify entities and relations."],
      ["Analyze", "A reader remembers that a restaurant customer paid, although the story never said so. What likely occurred?", ["Schema intrusion", "Procedural memory", "Task switching", "Convergent thinking"], 0, "A typical restaurant script supplied an unstated detail."],
      ["Tool selection", "Which representation best helps a team explore how a system responds when one dependency fails?", ["Static alphabetical glossary", "Interactive system model or simulation", "Unstructured archive", "Reminder list"], 1, "A model or simulation supports relationships, behavior, and counterfactual exploration."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each knowledge structure with an example.",
        pairs: [
          ["Schema", "The typical structure of an incident post-mortem"],
          ["Mental model", "Your understanding of how this system's services depend on each other"],
          ["Taxonomy", "A hierarchy that classifies alert types"],
          ["Script", "The standard sequence of steps in an on-call handoff"]
        ],
        explanation: "Schemas generalize patterns, mental models represent a specific system, taxonomies classify, and scripts sequence events."
      },
      {
        kind: "multi",
        type: "Multiple select",
        prompt: "Which of these are knowledge structures?",
        options: ["Schemas", "Scripts", "Ontologies", "Selective attention"],
        answers: [0, 1, 2],
        explanation: "Schemas, scripts, and ontologies organize knowledge; selective attention is a process."
      }
    ]
  },
  {
    id: "reasoning",
    number: "05",
    name: "Reasoning Systems",
    shortName: "Reasoning",
    purpose: "Drawing conclusions, explaining causes, comparing alternatives, and evaluating claims.",
    color: "#3d8b7b",
    status: "ready",
    page: "reasoning.html",
    concepts: [
      ["Deductive Reasoning", "Deriving conclusions that follow from stated premises."],
      ["Inductive Reasoning", "Generalizing probabilistically from observations."],
      ["Abductive Reasoning", "Inferring a plausible explanation for observed evidence."],
      ["Causal Reasoning", "Representing and evaluating cause-and-effect relationships."],
      ["Counterfactual Thinking", "Considering how outcomes might differ under changed conditions."],
      ["First Principles Thinking", "Decomposing a problem into foundational constraints or claims."],
      ["Systems Thinking", "Reasoning about interactions, feedback, delays, and emergent behavior."],
      ["Critical Thinking", "Evaluating evidence, assumptions, alternatives, and inference quality."],
      ["Root Cause Analysis", "Tracing a failure back through contributing causes to the factors that, if changed, would prevent recurrence."]
    ],
    objectives: [
      "Distinguish deductive, inductive, abductive, causal, and counterfactual reasoning.",
      "Match a reasoning approach to the kind of conclusion a task permits.",
      "Separate evidence, assumptions, explanations, and conclusions.",
      "Use tools and AI to expand alternatives and inspect logic without outsourcing judgment."
    ],
    examples: [
      ["Incident response", "The team uses abduction to propose root causes, then tests predictions rather than treating plausibility as proof."],
      ["Architecture", "A systems map exposes feedback loops and delayed effects of a scaling decision."],
      ["Leadership", "A decision review distinguishes observed outcomes from claims about what caused them."]
    ],
    mappings: [
      ["Deduction", "Decision table, formal rule set", "Consistency and implication checks", "Valid structure cannot rescue false premises."],
      ["Abduction", "Hypothesis board, diagnostic tree", "Candidate explanation generation", "A plausible explanation is not confirmation."],
      ["Causal reasoning", "Causal diagram, experiment", "Confound and alternative-cause prompts", "Correlation-rich data can still mislead."],
      ["Systems thinking", "Feedback map, simulation", "Scenario exploration", "Model outputs depend on boundaries and assumptions."]
    ],
    failures: [
      ["Premature closure", "The first plausible explanation is accepted before alternatives are tested."],
      ["Confirmation bias", "Evidence is selected or interpreted to favor an existing belief."],
      ["Correlation-causation error", "Association is treated as evidence of causal influence."],
      ["Boundary blindness", "A system analysis excludes interactions that change the conclusion."]
    ],
    relations: ["Knowledge Structures", "Decision Making", "Mental Models", "Metacognition", "Creativity"],
    quiz: [
      ["Remember", "Inferring the most plausible explanation for observations is:", ["Abductive reasoning", "Deductive reasoning", "Recognition memory", "Inhibition"], 0, "Abduction proposes plausible explanations for evidence."],
      ["Understand", "What makes a deductive conclusion different from an inductive one?", ["Deduction aims for necessity from premises; induction supports a probable generalization", "Deduction uses examples; induction never does", "Induction is always wrong", "There is no distinction"], 0, "Deductive validity concerns what follows from premises; induction extends beyond observations probabilistically."],
      ["Apply", "Several deployments preceded incidents, but only one changed the failing service. What should the team avoid?", ["Treating temporal association as sufficient causal proof", "Testing alternative causes", "Inspecting deployment differences", "Building a timeline"], 0, "Temporal association is evidence to investigate, not sufficient causal proof."],
      ["Analyze", "A diagnostic team stops after finding one plausible root cause. Which reasoning failure is clearest?", ["Premature closure", "Prospective memory", "Divergent attention", "Semantic encoding"], 0, "Premature closure accepts an explanation before alternatives and predictions are tested."],
      ["Tool selection", "How can AI best support causal analysis?", ["Declare the cause from correlation", "Surface assumptions, confounds, and testable alternatives", "Hide low-confidence evidence", "Replace experiments with fluent prose"], 1, "AI can widen the hypothesis set and expose assumptions, while evidence and tests remain decisive."],
      {
        kind: "matching",
        type: "Matching",
        prompt: "Match each reasoning type with a workplace example.",
        pairs: [
          ["Deductive", "All production deploys need approval; this is production, so it needs approval"],
          ["Inductive", "Three similar timeouts suggest a recurring pattern"],
          ["Abductive", "Choosing the likeliest explanation for a sudden error spike"],
          ["Counterfactual", "Asking whether the outage would have happened with a retry in place"]
        ],
        explanation: "Deduction applies rules, induction generalizes, abduction explains, and counterfactuals explore alternatives."
      },
      {
        kind: "ordering",
        type: "Ordering",
        prompt: "Order a sound root-cause analysis.",
        items: ["Define the problem precisely", "Generate competing hypotheses", "Test hypotheses against evidence", "Choose a fix and verify it"],
        explanation: "A precise problem and competing hypotheses make evidence testing meaningful before a fix is chosen."
      }
    ]
  },
  ...[
    ["06", "Learning Systems", "Learning", "Building durable, transferable capability through practice and feedback.", ["Pattern Recognition", "Chunking", "Transfer Learning", "Deliberate Practice", "Retrieval Practice", "Consolidation", "Scaffolding"]],
    ["07", "Creativity Systems", "Creativity", "Generating, combining, reframing, and selecting novel possibilities.", ["Divergent Thinking", "Convergent Thinking", "Insight", "Analogical Thinking", "Reframing", "Concept Blending"]],
    ["08", "Social Cognition", "Social", "Understanding other minds and coordinating thought with people.", ["Empathy", "Theory of Mind", "Perspective Taking", "Social Intelligence", "Collaboration Intelligence", "Negotiation Thinking"]],
    ["09", "Self Regulation", "Self Regulation", "Monitoring and regulating emotion, habits, resilience, and focus.", ["Calibration", "Emotional Regulation", "Self Monitoring", "Habit Formation", "Resilience", "Focus Management"]],
    ["10", "Future Thinking", "Future", "Representing possible futures, uncertainty, and strategic consequences.", ["Mental Simulation", "Scenario Planning", "Forecasting", "Strategic Thinking", "Risk Assessment"]],
    ["11", "Decision Making", "Decision", "Choosing among alternatives under values, costs, and uncertainty.", ["Recognition Decisions", "Analytical Decisions", "Bayesian Thinking", "Expected Value Thinking", "Cost-Benefit Analysis", "Trade-Off Management"]],
    ["12", "Metacognition", "Metacognition", "Monitoring and regulating one's own understanding and strategy.", ["Reflection", "Thinking About Thinking", "Self Awareness", "Strategy Selection", "Learning Regulation", "Cognitive Debugging"]]
  ].map(([number, name, shortName, purpose, concepts], index) => {
    const id = shortName.toLowerCase().replaceAll(" ", "-");
    const content = laterDomainContent[id];
    return {
      id,
      number,
      name,
      shortName,
      purpose,
      color: ["#7d9852", "#b36989", "#4d91a4", "#9d7347", "#687fb1", "#8b704f", "#9b5b79"][index],
      status: content ? "ready" : "planned",
      page: content ? `${id}.html` : null,
      concepts: content?.concepts || concepts.map(name => [name, "Planned for a later Atlas release."]),
      ...(content ? { objectives: content.objectives, examples: content.examples, mappings: content.mappings, failures: content.failures, relations: content.relations, quiz: content.quiz } : {})
    };
  })
];

const readyDomains = atlasDomains.filter(domain => domain.status === "ready");
const masteryLabels = ["Unknown", "Aware", "Understand", "Apply", "Analyze", "Teach", "Expert"];
const storagePrefix = "atlas-cognition:";
const notesStorageKey = `${storagePrefix}notes`;
const exportFormat = "atlas-cognition-learning-data";
const exportVersion = 1;
const noteTypes = ["comment", "question", "task", "custom"];

const noteViewIcons = {
  list: '<svg class="note-view-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2.5 4h.01M2.5 8h.01M2.5 12h.01M6 4h7.5M6 8h7.5M6 12h7.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  add: '<svg class="note-view-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3.2v9.6M3.2 8h9.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
};

function getDomainFromPage() {
  return document.body.dataset.domain
    ? atlasDomains.find(domain => domain.id === document.body.dataset.domain)
    : null;
}

function getStoredResult(domainId) {
  try {
    return JSON.parse(localStorage.getItem(`${storagePrefix}${domainId}`));
  } catch {
    return null;
  }
}

function setStoredResult(domainId, value) {
  localStorage.setItem(`${storagePrefix}${domainId}`, JSON.stringify(value));
}

function getStoredNotes() {
  try {
    const stored = JSON.parse(localStorage.getItem(notesStorageKey) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error("Could not read Atlas notes.", error);
    return [];
  }
}

function setStoredNotes(notes) {
  localStorage.setItem(notesStorageKey, JSON.stringify(notes));
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `note-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown date"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function noteTypeLabel(note) {
  return note.type === "custom" ? note.customType : note.type;
}

function masteryForScore(score) {
  if (score >= 100) return 4;
  if (score >= 80) return 3;
  if (score >= 60) return 2;
  if (score > 0) return 1;
  return 0;
}

function domainHref(domain) {
  return domain.page || "index.html#roadmap";
}

function renderShell() {
  const activeDomain = getDomainFromPage();
  const activePage = document.body.dataset.page;
  const topbar = document.querySelector("#topbar");
  topbar.innerHTML = `
    <button class="icon-button menu-button" type="button" id="menu-button" aria-label="Open domain navigation" aria-expanded="false">☰</button>
    <a class="brand" href="index.html">
      <span class="brand-mark">AC</span>
      <span class="brand-text">Atlas of Cognition</span>
    </a>
    <div class="top-actions">
      <a class="plain-button" href="index.html#explore">Explore</a>
      <a class="plain-button" href="graph.html" ${activePage === "graph" ? 'aria-current="page"' : ""}>Graph</a>
      <a class="plain-button" href="paths.html" ${activePage === "paths" ? 'aria-current="page"' : ""}>Paths</a>
      <a class="plain-button" href="profile.html" ${activePage === "profile" ? 'aria-current="page"' : ""}>Profile</a>
      <a class="plain-button" href="dashboard.html" ${activePage === "dashboard" ? 'aria-current="page"' : ""}>Dashboard</a>
      <button class="icon-button" type="button" id="theme-button" aria-label="Switch color theme" title="Switch color theme">◐</button>
    </div>`;

  const sidebar = document.querySelector("#sidebar");
  sidebar.innerHTML = `
    <p class="nav-label">Domains</p>
    <nav class="domain-nav" aria-label="Cognitive domains">
      ${atlasDomains.map(domain => `
        <a href="${domainHref(domain)}" ${activeDomain?.id === domain.id ? 'aria-current="page"' : ""}>
          <span>${domain.number} · ${domain.shortName}</span>
          <span class="nav-status ${domain.status}">${domain.status === "ready" ? "Live" : "Later"}</span>
        </a>`).join("")}
    </nav>
    <div class="sidebar-progress">
      <p class="nav-label">Your local progress</p>
      <div class="progress-track"><div class="progress-fill" id="sidebar-progress-fill"></div></div>
      <p id="sidebar-progress-text">No assessments completed yet.</p>
      <a class="sidebar-dashboard-link" href="dashboard.html">Open learning dashboard →</a>
    </div>`;

  document.querySelector("#menu-button").addEventListener("click", event => {
    const open = sidebar.classList.toggle("open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
    event.currentTarget.setAttribute("aria-label", open ? "Close domain navigation" : "Open domain navigation");
  });
  sidebar.addEventListener("click", event => {
    if (event.target.closest("a")) {
      sidebar.classList.remove("open");
      document.querySelector("#menu-button").setAttribute("aria-expanded", "false");
    }
  });

  const savedTheme = localStorage.getItem(`${storagePrefix}theme`);
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  document.querySelector("#theme-button").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(`${storagePrefix}theme`, next);
  });
  updateProgress();
}

function updateProgress() {
  const completed = readyDomains
    .map(domain => getStoredResult(domain.id))
    .filter(result => result?.completed);
  const percent = Math.round(completed.length / readyDomains.length * 100);
  document.querySelector("#sidebar-progress-fill").style.width = `${percent}%`;
  document.querySelector("#sidebar-progress-text").textContent = completed.length
    ? `${completed.length} of ${readyDomains.length} domain assessments completed.`
    : "No assessments completed yet.";
}

function renderSearch() {
  const input = document.querySelector("#atlas-search");
  if (!input) return;
  const results = document.querySelector("#search-results");
  const records = atlasDomains.flatMap(domain => {
    const domainRecords = [
      { title: domain.name, kind: "Domain", detail: domain.purpose, href: domainHref(domain), ready: domain.status === "ready" },
      ...domain.concepts.map(([title, detail]) => ({
        title,
        kind: `${domain.shortName} concept`,
        detail,
        href: domain.page ? `${domain.page}#capabilities` : "index.html#roadmap",
        ready: domain.status === "ready"
      }))
    ];
    if (domain.status !== "ready") return domainRecords;
    return [
      ...domainRecords,
      ...domain.failures.map(([title, detail]) => ({
        title,
        kind: `${domain.shortName} failure mode`,
        detail,
        href: `${domain.page}#failures`,
        ready: true
      })),
      ...domain.mappings.flatMap(([humanFunction, tool, aiExtension, guardrail]) => [
        {
          title: tool,
          kind: `Tool supporting ${humanFunction}`,
          detail: guardrail,
          href: `${domain.page}#mapping`,
          ready: true
        },
        {
          title: aiExtension,
          kind: `AI extension for ${humanFunction}`,
          detail: guardrail,
          href: `${domain.page}#mapping`,
          ready: true
        }
      ]),
      ...domain.relations.map(title => ({
        title,
        kind: `${domain.shortName} relationship`,
        detail: `Connected to ${domain.name}.`,
        href: `${domain.page}#relationships`,
        ready: true
      }))
    ];
  });
  const close = () => results.classList.remove("visible");
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      close();
      results.replaceChildren();
      return;
    }
    const matches = records
      .filter(record => `${record.title} ${record.kind} ${record.detail}`.toLowerCase().includes(query))
      .slice(0, 12);
    results.innerHTML = matches.length
      ? matches.map(record => `
          <a class="search-result" href="${record.href}">
            <strong>${record.title}</strong>
            <span>${record.kind} · ${record.ready ? "Available now" : "Planned"} — ${record.detail}</span>
          </a>`).join("")
      : '<div class="search-result"><strong>No results</strong><span>Try a concept, failure mode, tool, or domain.</span></div>';
    results.classList.add("visible");
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".search-panel")) close();
  });
}

function renderHome() {
  document.querySelector("#domain-grid").innerHTML = atlasDomains.map(domain => {
    const result = getStoredResult(domain.id);
    return `
      <a class="domain-card ${domain.status}" href="${domainHref(domain)}" style="--domain-color:${domain.color}">
        <span class="domain-number">DOMAIN ${domain.number} · ${domain.status === "ready" ? "AVAILABLE" : "PLANNED"}</span>
        <h3>${domain.name}</h3>
        <p>${domain.purpose}</p>
        <div class="concept-list">
          ${domain.concepts.slice(0, 4).map(([name]) => `<span class="concept-chip">${name}</span>`).join("")}
          ${domain.concepts.length > 4 ? `<span class="concept-chip">+${domain.concepts.length - 4} more</span>` : ""}
        </div>
        <footer>
          <span>${domain.concepts.length} capabilities</span>
          <span>${result?.completed ? `${result.score}% · ${masteryLabels[result.mastery]}` : domain.status === "ready" ? "Assessment available →" : "Later release"}</span>
        </footer>
      </a>`;
  }).join("");

  const completed = readyDomains
    .map(domain => ({ domain, result: getStoredResult(domain.id) }))
    .filter(entry => entry.result?.completed);
  const average = completed.length
    ? Math.round(completed.reduce((sum, entry) => sum + entry.result.score, 0) / completed.length)
    : 0;
  document.querySelector("#home-progress").innerHTML = `
    <strong>${completed.length}/${readyDomains.length}</strong>
    <p>Release 1 domain assessments completed${completed.length ? ` · ${average}% average score` : ""}.</p>
    <div class="progress-track"><div class="progress-fill" style="width:${completed.length / readyDomains.length * 100}%"></div></div>`;
  renderSearch();
}

function renderDomain() {
  const domain = getDomainFromPage();
  if (!domain) return;
  document.documentElement.style.setProperty("--domain-color", domain.color);
  document.title = `${domain.name} · Atlas of Cognition`;
  document.querySelector("#breadcrumb-current").textContent = domain.name;
  document.querySelector("#domain-hero").innerHTML = `
    <div>
      <p class="eyebrow">Domain ${domain.number} · Release 1</p>
      <h1>${domain.name}</h1>
      <p>${domain.purpose}</p>
    </div>
    <aside class="domain-meta">
      <strong>${domain.concepts.length}</strong>
      <span>capabilities in this domain</span>
      <p>${domain.quiz.length} assessment questions · progress stored only in this browser</p>
    </aside>`;
  document.querySelector("#capability-grid").innerHTML = domain.concepts.map(([name, description]) => `
    <article class="capability"><h3><a href="${conceptHref({ id: slugify(name) })}">${name}</a></h3><p>${description}</p></article>`).join("");
  document.querySelector("#objective-list").innerHTML = domain.objectives.map(objective => `<li>${objective}</li>`).join("");
  document.querySelector("#example-grid").innerHTML = domain.examples.map(([context, example]) => `
    <article class="panel example-card"><span class="example-context">${context}</span><p>${example}</p></article>`).join("");
  document.querySelector("#mapping-body").innerHTML = domain.mappings.map(row => `
    <tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("");
  document.querySelector("#failure-grid").innerHTML = domain.failures.map(([name, description]) => `
    <article class="failure"><strong>${name}</strong><p>${description}</p></article>`).join("");
  document.querySelector("#relationship-map").innerHTML = [
    `<span class="relationship-node current">${domain.name}</span>`,
    ...domain.relations.map(relation => `<span class="relationship-node">${relation}</span>`)
  ].join("");
  renderSectionNotes(domain);
  renderQuiz(domain);
  renderNextPrevious(domain);
}

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
    : domain?.page ? `${domain.page}#${encodeURIComponent(note.sectionId)}` : "index.html";
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
    <span>${previous ? `<a href="${previous.page}">← ${previous.name}</a>` : '<a href="index.html">← Atlas home</a>'}</span>
    <span>${next ? `<a href="${next.page}">${next.name} →</a>` : '<a href="index.html#roadmap">Release roadmap →</a>'}</span>`;
}

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
        <a href="${domain.page}#assessment">${result?.completed ? "Review assessment" : "Take assessment"} →</a>
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

const slugify = text => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const allConcepts = atlasDomains.flatMap(domain =>
  domain.concepts.map(([name, description], index) => ({ name, description, domain, index, id: slugify(name) })));

function conceptHref(concept) {
  return `concept.html?c=${concept.id}`;
}

// Resolves a relation label to a concept or a domain; null when the Atlas has no such entry yet.
function resolveRelation(label) {
  const key = slugify(label);
  const concept = allConcepts.find(entry => entry.id === key);
  if (concept) return { kind: "concept", concept, href: conceptHref(concept) };
  const domain = atlasDomains.find(entry => slugify(entry.name) === key || slugify(entry.shortName) === key);
  return domain ? { kind: "domain", domain, href: domainHref(domain) } : null;
}

// Concept-specific content; concepts without an entry fall back to domain-level content.
// check.answer is the index of the correct option.
const conceptDetails = {
  "selective-attention": {
    example: ["Code review", "A reviewer reads only the changed lines and the tests, deliberately ignoring unrelated formatting noise in the diff."],
    failure: ["Filtering out the wrong thing", "A filter tuned for loud alerts also drops a quiet one that matters, and nobody notices what was never shown."],
    check: { prompt: "A teammate keeps working while a loud conversation happens nearby but reacts instantly when their own name is mentioned. What does this show?", options: ["Selective attention filters most input yet still lets highly relevant items through", "Attention is unlimited", "The conversation was stored in long-term memory", "Divided attention has no cost"], answer: 0, explanation: "Selection suppresses most competing input, but personally relevant items can still break through." }
  },
  "sustained-attention": {
    example: ["Data migration", "An engineer timeboxes a 45-minute block to check a long migration script line by line, then takes a short break before the next block."],
    failure: ["Drift", "After long unbroken work the reader's eyes keep moving but comprehension stops; the same paragraph gets re-read without being absorbed."],
    check: { prompt: "Which change best protects sustained attention during a two-hour review?", options: ["Remove every break", "Split the work into timeboxed blocks with short breaks", "Add more notifications to stay alert", "Review several unrelated tasks at once"], answer: 1, explanation: "Structured blocks and breaks counter the decline that long unbroken effort causes." }
  },
  "divided-attention": {
    example: ["Stand-up call", "A developer joins a call while fixing a bug. Listening is fine until the bug needs real reasoning, and then they lose the thread of the call."],
    failure: ["Hidden switching cost", "Two demanding tasks seem to run in parallel, but the person is alternating between them and both get slower and less accurate."],
    check: { prompt: "A person writes an email while following a meeting discussion and later cannot recall a decision. Most likely explanation?", options: ["Two demanding tasks competed for limited attention", "The decision was too simple", "Long-term memory was full", "Salience detection was too strong"], answer: 0, explanation: "Concurrent demanding tasks compete for the same limited attentional resources, so something gets dropped." }
  },
  "vigilance": {
    example: ["Operations", "An on-call engineer watches a quiet status board for the rare sign of an outage."],
    failure: ["Vigilance decrement", "Detection of rare signals gets worse the longer the monitoring goes on, even for a motivated, capable person."],
    check: { prompt: "A monitoring task has signals about once per shift. Which design helps vigilance most?", options: ["One person watches the screen all shift without change", "Rotate monitors regularly and make signals distinguishable", "Remove all alert sounds", "Increase the number of unrelated duties at random"], answer: 1, explanation: "Rotation and clear signals counter the vigilance decrement that rare-event monitoring produces." }
  },
  "attentional-control": {
    example: ["Planning", "A tech lead notices the discussion drifting into implementation detail and steers it back to the open design decision."],
    failure: ["Goal neglect", "The person knows the goal but a more appealing cue takes over, so behavior follows the stimulus instead of the plan."],
    check: { prompt: "You are interrupted by an interesting but irrelevant message and choose to return to your task. Which capability is this?", options: ["Attentional control", "Orienting reflex only", "Sensory memory", "Pattern completion"], answer: 0, explanation: "Directing and redirecting attention according to goals is attentional control." }
  },
  "salience-detection": {
    example: ["Dashboards", "A red spike on a graph draws the eye immediately; the operator then decides whether it is actually important."],
    failure: ["Salience mistaken for importance", "Bright, novel items get attention while a dull but critical value goes unnoticed."],
    check: { prompt: "A dashboard highlights the newest alert in bright red, but a dim older alert is the critical one. Which problem is this?", options: ["Salience does not match importance", "Insufficient long-term memory", "Too much working memory", "Lack of procedural skill"], answer: 0, explanation: "Standing out is not the same as mattering; design should align the two." }
  },
  "orienting": {
    example: ["Alert design", "A banner appears at the point where the user is already looking, so they turn to it without searching the screen."],
    failure: ["Orienting to the wrong place", "A flashing ad or popup pulls the eyes away from the content the reader was following."],
    check: { prompt: "Which interface choice best supports orienting toward an error?", options: ["Show the message far from the failing field in small gray text", "Place a clear message next to the failing field with a visible marker", "Show all messages at the end of a long page", "Use identical styling for every message"], answer: 1, explanation: "Proximity and a clear visual cue direct attention to the right place quickly." }
  },
  "task-focus": {
    example: ["Deep work", "A writer closes unrelated tabs and keeps a one-line statement of the current objective visible while drafting."],
    failure: ["Switching residue", "After checking chat, part of the mind stays on the message and the original task takes longer to resume."],
    check: { prompt: "Which action best protects task focus?", options: ["Keep every tab and chat open", "Write the current objective down and silence nonessential channels", "Switch tasks every few minutes", "Wait until you feel distracted, then decide"], answer: 1, explanation: "Making the objective explicit and reducing competing inputs keeps priority on the current task." }
  },
  "working-memory": {
    example: ["Debugging", "A developer holds three variable values in mind while tracing a function, and loses them when a colleague asks an unrelated question."],
    failure: ["Overload", "Too many items must be held and manipulated at once, so some are dropped without the person noticing."],
    check: { prompt: "Which practice most directly reduces working-memory load while reading a complex pull request?", options: ["Memorize every changed file first", "Jot the key relationships on a scratch note and refer to it", "Read faster without pausing", "Open more files at once"], answer: 1, explanation: "Offloading intermediate information to an external note frees limited working capacity." }
  },
  "long-term-memory": {
    example: ["Onboarding", "A new engineer gradually retains the team's deployment routine, naming conventions and past incidents through repeated use."],
    failure: ["Decay without use", "Knowledge that is never retrieved or applied becomes harder to access over time."],
    check: { prompt: "Which activity best strengthens durable long-term retention?", options: ["Re-reading the notes once the night before", "Retrieving the material from memory at spaced intervals", "Highlighting everything", "Copying the text word for word"], answer: 1, explanation: "Spaced retrieval practice strengthens durable memory more than passive review." }
  },
  "episodic-memory": {
    example: ["Incident review", "An engineer recalls the specific night of a past outage: what the dashboards showed, who was on call and what was tried first."],
    failure: ["Reconstruction errors", "Remembered events are partly rebuilt at recall, so details can be wrong while feeling vivid."],
    check: { prompt: "“I remember the sprint planning where we first argued about this API.” Which memory type is this?", options: ["Procedural", "Semantic", "Episodic", "Working"], answer: 2, explanation: "Remembering a particular event with its context is episodic memory." }
  },
  "semantic-memory": {
    example: ["Domain knowledge", "A developer knows what idempotency means without recalling when or where they learned it."],
    failure: ["Outdated facts", "A fact that was once true stays in memory after the system or the field has changed."],
    check: { prompt: "Knowing that a hash map gives average constant-time lookup, without recalling where you learned it, is an example of:", options: ["Semantic memory", "Episodic memory", "Prospective memory", "Sensory memory"], answer: 0, explanation: "General facts detached from the learning episode are semantic memory." }
  },
  "procedural-memory": {
    example: ["Tooling", "An engineer rebases a branch and resolves conflicts almost automatically, without consciously listing the steps."],
    failure: ["Habit capture", "A well-practiced routine runs automatically in a new situation where it no longer fits."],
    check: { prompt: "An experienced engineer types a familiar command sequence without thinking. Which memory supports this?", options: ["Episodic", "Procedural", "Recognition", "Semantic"], answer: 1, explanation: "Learned skills and action sequences that run with little conscious effort are procedural memory." }
  },
  "recognition-memory": {
    example: ["Interface design", "A user picks the right setting from a visible menu even though they could not name it unaided."],
    failure: ["False familiarity", "Something feels familiar and is accepted as known, even though it was never actually learned."],
    check: { prompt: "Why do menus with visible options help more than blank command lines for occasional users?", options: ["They require recall of every command", "They allow recognition, which is easier than recall", "They remove the need for attention", "They store commands in long-term memory"], answer: 1, explanation: "Recognizing a visible option takes less effort than producing it from memory." }
  },
  "recall": {
    example: ["Exams and interviews", "A candidate explains a design pattern from scratch with no prompt, which exposes gaps that multiple-choice would hide."],
    failure: ["Tip-of-the-tongue", "The person knows the item exists and cannot produce it, though a cue would trigger it immediately."],
    check: { prompt: "A question asks you to write down the steps of a rollback with no hints. Which process is required?", options: ["Recognition", "Recall", "Priming", "Habituation"], answer: 1, explanation: "Producing information without the target being shown is recall." }
  },
  "prospective-memory": {
    example: ["Project work", "A team member sets a calendar reminder to check a dependency after the vendor's release next week."],
    failure: ["Prospective failure", "The intention is formed and sincerely held, but nothing cues it at the moment it needs to be carried out."],
    check: { prompt: "Which approach best supports remembering to run a check after tomorrow's deploy?", options: ["Trust yourself to remember", "Attach a reminder to the deploy event itself", "Think about it repeatedly tonight", "Do it from memory when you have time"], answer: 1, explanation: "A cue tied to the moment of action supports prospective memory far better than intention alone." }
  },
  "executive-control": {
    example: ["Incident command", "An incident lead keeps the recovery goal active, redirects people drifting into root-cause debate, and changes plan when a fix fails."],
    failure: ["Treating it as an inner boss", "Describing control as a little manager in the head hides the specific processes (goal maintenance, inhibition, switching) that do the work."],
    check: { prompt: "Which description of executive control is most accurate?", options: ["A small boss inside the head that makes every decision", "Coordinated regulation of goals, attention and strategies when automatic responses are insufficient", "Another name for long-term memory", "A talent that cannot be supported by tools"], answer: 1, explanation: "Executive control is a set of coordinated regulatory processes, not a homunculus." }
  },
  "planning": {
    example: ["Release work", "A product manager lays out steps, notes that the migration blocks the launch, and sequences accordingly."],
    failure: ["Planning fallacy", "The plan assumes things go smoothly and underestimates dependencies, uncertainty and effort."],
    check: { prompt: "A team's estimates are repeatedly optimistic. Which fix addresses the planning fallacy?", options: ["Estimate by looking at how similar past work actually went", "Estimate more confidently", "Skip dependency mapping", "Plan only the first step"], answer: 0, explanation: "Reference to actual outcomes of similar work corrects the optimism of an inside view." }
  },
  "prioritization": {
    example: ["Backlog grooming", "A lead ranks requests by value and urgency, and explicitly defers a loud but low-value item."],
    failure: ["Urgency over importance", "Whatever is most pressing or loudest gets done first, while important work keeps slipping."],
    check: { prompt: "Which approach best supports prioritization under competing requests?", options: ["Do the most recent request first", "Rank by value and urgency using visible criteria", "Do the easiest tasks first always", "Work on everything in parallel"], answer: 1, explanation: "Explicit criteria for value and urgency make allocation of limited effort defensible." }
  },
  "goal-management": {
    example: ["Sprint work", "A developer keeps the sprint goal in view, drops a side task that no longer serves it, and adds a new subgoal when scope changes."],
    failure: ["Goal neglect", "The goal is understood but stops guiding behavior while attention is absorbed by moment-to-moment details."],
    check: { prompt: "A person knows the task rule but acts against it while busy. Which failure is this?", options: ["Goal neglect", "Source confusion", "Schema intrusion", "Salience detection"], answer: 0, explanation: "Goal neglect is knowing the objective yet failing to keep it influencing action." }
  },
  "inhibition": {
    example: ["Incident fixing", "An engineer notices an appealing refactor and holds it back until the incident is resolved."],
    failure: ["Impulsive response", "A habitual or tempting action fires before the situation has been evaluated."],
    check: { prompt: "Which situation requires inhibition most?", options: ["Typing a familiar password", "Not replying instantly to an irritating message", "Recognizing a friend's face", "Recalling a phone number"], answer: 1, explanation: "Suppressing a tempting response in favor of a considered one is inhibition." }
  },
  "self-control": {
    example: ["Long projects", "A writer closes social media to protect a deadline, even though checking it would feel better right now."],
    failure: ["Present bias", "Immediate rewards beat longer-term aims, even when the person values the long-term aim more."],
    check: { prompt: "Which strategy best supports self-control for a long-term goal?", options: ["Rely on willpower in the moment", "Remove the temptation and set a commitment in advance", "Wait until motivated", "Add more tempting options"], answer: 1, explanation: "Shaping the environment and committing in advance reduces dependence on in-the-moment willpower." }
  },
  "cognitive-flexibility": {
    example: ["Product strategy", "A team drops its first framing of a problem when evidence shows users behave differently, and tries another."],
    failure: ["Perseveration", "A strategy is repeated after evidence shows it is no longer working."],
    check: { prompt: "A debugging approach has failed five times, and the engineer keeps trying variations of it. Which failure is this?", options: ["Vigilance decrement", "Perseveration", "Recognition memory", "Prospective failure"], answer: 1, explanation: "Continuing a strategy despite evidence it is failing is perseveration, a lack of flexibility." }
  },
  "task-switching": {
    example: ["Mixed workload", "An engineer moves from code review to a customer call and needs a few minutes before reasoning well again."],
    failure: ["Switching cost", "Reconfiguring to a new task set takes time and raises errors, especially when tasks are frequent and unrelated."],
    check: { prompt: "Which schedule most reduces task-switching costs?", options: ["Check chat every few minutes", "Batch similar tasks and check messages at set times", "Alternate unrelated tasks constantly", "Respond to every notification at once"], answer: 1, explanation: "Fewer switches and batching similar work reduce the repeated cost of reconfiguration." }
  },
  "schemas": {
    example: ["Reading code", "A developer reads a controller class and expects routes, validation and a service call, because that is the usual shape."],
    failure: ["Schema intrusion", "Expected typical details are filled in and remembered even though they were not actually present."],
    check: { prompt: "A reviewer is sure a file validated input, because such files usually do, but it does not. Which failure is this?", options: ["Schema intrusion", "Perseveration", "Vigilance decrement", "Switching cost"], answer: 0, explanation: "Typical details assumed from a schema can replace what was actually there." }
  },
  "mental-models": {
    example: ["Architecture", "An engineer simulates in their head how a request flows through the cache and the database to predict where it will fail."],
    failure: ["Model fixation", "A familiar representation of the system persists even after evidence contradicts it."],
    check: { prompt: "What is a mental model used for?", options: ["Storing facts permanently", "Understanding or simulating a particular system or situation", "Replacing all schemas", "Filtering notifications"], answer: 1, explanation: "A mental model lets a person understand and mentally run a particular system or situation." }
  },
  "conceptual-frameworks": {
    example: ["Analysis", "A team uses a framework with the dimensions impact, effort and risk to compare candidate projects in one common structure."],
    failure: ["Framework as a forced fit", "Evidence that does not fit the chosen dimensions is dropped instead of questioning the framework."],
    check: { prompt: "A conceptual framework is best described as:", options: ["An explicit structure for organizing and comparing ideas", "A list of random notes", "A type of long-term memory", "A kind of attention filter"], answer: 0, explanation: "Frameworks provide explicit structure that makes ideas comparable." }
  },
  "scripts": {
    example: ["Operations", "An on-call engineer follows the familiar sequence: acknowledge, assess, communicate, mitigate, review."],
    failure: ["Script rigidity", "A familiar sequence is followed even when the situation calls for departing from it."],
    check: { prompt: "A script differs from other schemas mainly because it is organized around:", options: ["A hierarchy of categories", "A typical sequence of events", "A formal logic", "A set of definitions"], answer: 1, explanation: "A script is a schema organized around the usual order of events." }
  },
  "knowledge-maps": {
    example: ["Team onboarding", "A new hire gets a map of services and teams that shows how components and owners connect."],
    failure: ["False precision", "A neat map implies certainty that the underlying knowledge does not have."],
    check: { prompt: "What is the main benefit of an external knowledge map?", options: ["It reveals connections that are hard to hold in working memory", "It replaces the need to understand", "It stores knowledge permanently inside the reader", "It prevents all errors"], answer: 0, explanation: "A visible map offloads structure so connections can be inspected without holding them all in mind." }
  },
  "taxonomies": {
    example: ["Documentation", "A team sorts its documents into a hierarchy by audience, then by topic."],
    failure: ["Category error", "Something is classified by the wrong organizing principle, so it is hard to find."],
    check: { prompt: "A taxonomy is characterized by:", options: ["Hierarchical grouping by defined principles", "Chronological sequence of events", "Free association", "Unstructured notes"], answer: 0, explanation: "Taxonomies classify things in hierarchies using defined grouping rules." }
  },
  "ontologies": {
    example: ["Data modeling", "A team formally defines Customer, Order and Product, with their properties and the relations between them."],
    failure: ["Over-formalization", "A rigid specification is built before the domain is understood, and then forces wrong distinctions."],
    check: { prompt: "How does an ontology differ from a simple taxonomy?", options: ["It specifies entities, properties and relationships formally, not just a hierarchy", "It has no structure", "It contains only a single level", "It is a type of habit"], answer: 0, explanation: "Ontologies add formally specified properties and relationships beyond hierarchical grouping." }
  },
  "situation-models": {
    example: ["Reading", "A reader tracks what Nia has already mixed and what is still missing, updating this as each sentence arrives."],
    failure: ["Stale model", "The representation of the situation is not updated when new information changes what is true."],
    check: { prompt: "Which best describes a situation model?", options: ["A general type of event stored in memory", "An evolving representation of the particular events being described or experienced", "A formal classification", "A diagram stored as a file"], answer: 1, explanation: "Situation models are built and updated for the specific case at hand, unlike general schemas." }
  },
  "deductive-reasoning": {
    example: ["Security review", "If all admin endpoints require a token and this endpoint is an admin endpoint, it must require a token, so the missing check is a bug."],
    failure: ["Accepting false premises", "The inference is valid but a premise is wrong, so the conclusion looks certain and is not."],
    check: { prompt: "A deductive conclusion is reliable only if:", options: ["The premises are true and the argument is valid", "It sounds plausible", "Many examples agree", "It is stated confidently"], answer: 0, explanation: "Validity plus true premises guarantees the conclusion." }
  },
  "inductive-reasoning": {
    example: ["Performance", "After seeing three slow queries all lacking an index, an engineer generalizes that missing indexes are the likely cause."],
    failure: ["Hasty generalization", "A rule is drawn from too few or unrepresentative cases."],
    check: { prompt: "Which statement describes inductive reasoning?", options: ["Conclusions follow with certainty", "Generalizing probabilistically from observations", "Choosing the first idea", "Defining formal terms"], answer: 1, explanation: "Induction supports conclusions with probability rather than certainty." }
  },
  "abductive-reasoning": {
    example: ["Incident response", "Latency rose right after a deploy, so the team proposes the deploy as the most plausible cause and plans a test."],
    failure: ["Premature closure", "The first plausible explanation is accepted before alternatives are tested."],
    check: { prompt: "Inferring the best available explanation for observed evidence is:", options: ["Deduction", "Abduction", "Inhibition", "Recognition"], answer: 1, explanation: "Abduction proposes a plausible explanation that still needs to be tested." }
  },
  "causal-reasoning": {
    example: ["Product analytics", "A team checks whether a feature caused retention to rise or whether engaged users simply adopted it."],
    failure: ["Correlation-causation error", "Association is treated as evidence that one thing influences the other."],
    check: { prompt: "Two metrics rise together. Which step best tests whether one causes the other?", options: ["Assume it does", "Run a controlled comparison or intervention", "Ask which metric is bigger", "Wait and see"], answer: 1, explanation: "Intervening or comparing under control separates causal influence from mere association." }
  },
  "counterfactual-thinking": {
    example: ["Post-incident review", "The team asks how the outage would have gone if the alert had fired ten minutes sooner."],
    failure: ["Hindsight distortion", "Knowing the outcome makes the alternative path seem obvious and makes people overrate what could have been foreseen."],
    check: { prompt: "“What would have happened if we had rolled back earlier?” is an example of:", options: ["Counterfactual thinking", "Recognition memory", "Task switching", "Vigilance"], answer: 0, explanation: "Considering how outcomes might differ under changed conditions is counterfactual thinking." }
  },
  "first-principles-thinking": {
    example: ["Architecture", "Instead of copying a competitor's design, a team states its latency, consistency and cost constraints and derives the design from them."],
    failure: ["Ignoring accumulated knowledge", "Everything is rebuilt from basics, wasting effort on solved problems."],
    check: { prompt: "First principles thinking begins by:", options: ["Copying the industry standard", "Decomposing the problem into foundational constraints or claims", "Choosing the fastest option", "Asking for opinions"], answer: 1, explanation: "It breaks a problem into its basic constraints before building a solution." }
  },
  "systems-thinking": {
    example: ["Capacity planning", "An architect sees that adding servers raises load on the shared database, which slows requests, which triggers retries and more load."],
    failure: ["Boundary blindness", "The analysis leaves out interactions that change the conclusion."],
    check: { prompt: "Which concept is central to systems thinking?", options: ["Feedback loops and delays", "Single-cause explanations", "Isolated components", "Fixed rules"], answer: 0, explanation: "Systems thinking attends to feedback, delays and interactions among parts." }
  },
  "critical-thinking": {
    example: ["Decision review", "A reviewer asks what evidence supports the claim, what assumptions it relies on and what alternatives were considered."],
    failure: ["Confirmation bias", "Evidence is selected or read in a way that favors a belief already held."],
    check: { prompt: "Which habit best counters confirmation bias?", options: ["Search for evidence that would disprove your view", "Look only for supporting evidence", "Trust the first source", "Avoid discussing alternatives"], answer: 0, explanation: "Actively seeking disconfirming evidence tests a belief instead of just reinforcing it." }
  },
  "pattern-recognition": {
    example: ["Log analysis", "An engineer sees a familiar shape in a latency graph and immediately suspects connection-pool exhaustion."],
    failure: ["False pattern", "A pattern is seen in noise or in too few cases, and then confidently applied."],
    check: { prompt: "An experienced SRE spots a familiar failure shape in a dashboard. Which capability is mainly at work?", options: ["Pattern recognition", "Prospective memory", "Task switching", "Calibration"], answer: 0, explanation: "Detecting recurring structure lets experts classify a new case quickly." }
  },
  "chunking": {
    example: ["Reading code", "A developer reads a ten-line loop as one unit, “sum the valid rows”, instead of ten separate statements."],
    failure: ["Wrong chunk", "A familiar chunk is applied to a case that only looks similar, so a key difference is missed."],
    check: { prompt: "Why do experts handle complex situations with less strain?", options: ["They group details into meaningful units", "Their working memory is far larger", "They ignore detail entirely", "They never forget"], answer: 0, explanation: "Meaningful chunks take up less of the limited working-memory capacity." }
  },
  "transfer-learning": {
    example: ["Skills", "An engineer who learned retry logic for HTTP clients applies the same idea to message queues."],
    failure: ["Failed transfer", "A skill works in the practiced context but not when the same problem appears in a different form."],
    check: { prompt: "Which training design best promotes transfer?", options: ["Repeat one identical exercise", "Practice the same principle across varied contexts", "Skip feedback", "Teach only definitions"], answer: 1, explanation: "Varied contexts help the learner see the underlying structure, not just the surface." }
  },
  "deliberate-practice": {
    example: ["Skill growth", "A developer repeats only the part of code review where they miss bugs, then checks their findings against an expert's."],
    failure: ["Plateau by repetition", "Comfortable repetition builds familiarity but not further skill."],
    check: { prompt: "What distinguishes deliberate practice from simply repeating a task?", options: ["It targets specific weaknesses with feedback", "It is longer", "It is easier", "It avoids mistakes"], answer: 0, explanation: "Deliberate practice works at the edge of ability, on specific weaknesses, with feedback." }
  },
  "retrieval-practice": {
    example: ["Study", "A learner closes the notes and writes the incident-response steps from memory, then compares."],
    failure: ["Illusion of knowing", "Re-reading feels fluent, so the learner overestimates what they can actually recall."],
    check: { prompt: "Which study method uses retrieval practice?", options: ["Highlight the chapter again", "Answer questions from memory, then check", "Copy the notes", "Listen passively"], answer: 1, explanation: "Actively recalling information strengthens memory more than passive review." }
  },
  "consolidation": {
    example: ["Learning schedule", "A team splits a new framework's training across a week so that people can absorb it between sessions."],
    failure: ["Cramming loss", "Material crammed in one session fades quickly because it had no time to stabilize."],
    check: { prompt: "Which schedule best supports consolidation?", options: ["One long session the night before", "Short sessions spaced over days, with sleep between", "Skip review", "Practice only once"], answer: 1, explanation: "Spacing and sleep give time for new learning to stabilize." }
  },
  "scaffolding": {
    example: ["Onboarding", "A new hire first gets a starter template with comments, then a blank file with only an outline."],
    failure: ["Scaffold dependence", "Support is never removed, so the learner cannot perform the task alone."],
    check: { prompt: "What is the key feature of good scaffolding?", options: ["Support that is gradually withdrawn as skill grows", "Permanent hints", "No support at all", "Only expert answers"], answer: 0, explanation: "Scaffolds are temporary and fade as competence increases." }
  },
  "divergent-thinking": {
    example: ["Ideation", "A team lists thirty ways to reduce onboarding drop-off before discussing any of them."],
    failure: ["Premature evaluation", "Ideas are criticized as they appear, so few get generated."],
    check: { prompt: "In a brainstorm, when should ideas be judged?", options: ["Immediately as each is stated", "After a wide set has been generated", "Never", "Only by the loudest person"], answer: 1, explanation: "Delaying judgment lets a wider range of ideas appear." }
  },
  "convergent-thinking": {
    example: ["Selection", "After brainstorming, a team scores the ideas on impact, effort and risk and keeps the top three."],
    failure: ["Hidden criteria", "A choice is made on unstated criteria, so the reasoning cannot be reviewed."],
    check: { prompt: "Convergent thinking is mainly used to:", options: ["Widen the options", "Narrow the options against criteria", "Avoid decisions", "Forget the problem"], answer: 1, explanation: "It selects among possibilities by evaluating them against criteria." }
  },
  "insight": {
    example: ["Debugging", "After hours of looking at the code, an engineer realizes the bug is in the data, not the logic, and the fix is immediate."],
    failure: ["Fixation", "Staying with the same assumption blocks the restructuring that insight needs."],
    check: { prompt: "Which condition often helps insight after being stuck?", options: ["Repeat the same approach harder", "Step away and revisit the problem from a different angle", "Reduce thinking time to zero", "Avoid all new information"], answer: 1, explanation: "A break and a new angle help loosen a fixed assumption so the problem can restructure." }
  },
  "analogical-thinking": {
    example: ["Architecture", "A team designs failure handling by borrowing the circuit-breaker idea from electrical systems."],
    failure: ["Superficial analogy", "Two things look alike but differ in the structure that matters, so the borrowed idea fails."],
    check: { prompt: "A good analogy shares with the source problem:", options: ["The same colors", "The same underlying structure", "The same name", "The same author"], answer: 1, explanation: "Useful analogies map relations and structure, not surface features." }
  },
  "reframing": {
    example: ["Product", "“Reduce support tickets” becomes “help users succeed without needing support”, and different solutions appear."],
    failure: ["Reframing away the need", "The new frame is more comfortable but no longer serves the real problem."],
    check: { prompt: "What does reframing do?", options: ["Redefines the problem so new solutions become visible", "Adds more constraints", "Stops the analysis", "Removes the goal"], answer: 0, explanation: "A new problem definition changes which solutions seem possible." }
  },
  "concept-blending": {
    example: ["Design", "A designer combines “inbox” and “kanban board” to create an email tool organized by task status."],
    failure: ["Incoherent blend", "Elements are combined without checking that the result makes sense or serves a purpose."],
    check: { prompt: "Concept blending produces:", options: ["A new concept combining elements of two others", "A copy of one concept", "A formal proof", "A memory trace"], answer: 0, explanation: "Blending combines selected elements into something new." }
  },
  "empathy": {
    example: ["Team support", "A lead notices a teammate's stress during an incident review and acknowledges it before discussing actions."],
    failure: ["Empathy fatigue or distortion", "Absorbing others' feelings without limit can cloud judgment, and projecting your own feelings on them gets it wrong."],
    check: { prompt: "Empathy is mainly about:", options: ["Sensing or sharing another person's emotional state", "Predicting stock prices", "Memorizing facts", "Planning tasks"], answer: 0, explanation: "Empathy involves sensing or sharing another person's feelings." }
  },
  "theory-of-mind": {
    example: ["Code review", "A reviewer realizes the author does not know about a legacy constraint and explains it up front."],
    failure: ["Curse of knowledge", "Experts forget what it is like not to know and skip essential context."],
    check: { prompt: "Theory of mind lets you:", options: ["Represent what others believe, want and know", "Recall every fact", "Suppress impulses", "Break a task into steps"], answer: 0, explanation: "It models others' mental states, which can differ from your own." }
  },
  "perspective-taking": {
    example: ["Release planning", "An engineer walks through a release from the support team's point of view and finds a missing runbook."],
    failure: ["Egocentric anchoring", "People adjust too little from their own view when imagining someone else's."],
    check: { prompt: "Which action best practices perspective taking?", options: ["Assume others think as you do", "Walk through the situation from their position and ask them", "Avoid contact", "Summarize your own view louder"], answer: 1, explanation: "Deliberately adopting another position and checking it with them reduces egocentric error." }
  },
  "social-intelligence": {
    example: ["Meetings", "A facilitator senses tension, slows down, and invites the quiet person before moving on."],
    failure: ["Misreading cues", "Social signals are interpreted from your own expectations and the response misfires."],
    check: { prompt: "Social intelligence involves:", options: ["Reading social situations and adjusting behavior", "Ignoring others' reactions", "Memorizing names only", "Always agreeing"], answer: 0, explanation: "It is reading the situation and adapting behavior to it." }
  },
  "collaboration-intelligence": {
    example: ["Design review", "A team keeps a decision log so that everyone shares the same picture of what was decided and why."],
    failure: ["False consensus", "People think they agree because the differences were never stated."],
    check: { prompt: "A team believes it agrees, but members later act differently. What likely happened?", options: ["The differences in understanding were never made explicit", "Members forgot how to read", "Attention was too strong", "Recall was perfect"], answer: 0, explanation: "Unstated differences hide behind an assumed shared understanding." }
  },
  "negotiation-thinking": {
    example: ["Roadmap talks", "Two teams list their underlying interests and find a trade neither had proposed at the start."],
    failure: ["Positional bargaining", "Both sides defend stated positions and miss trades that serve their actual interests."],
    check: { prompt: "Which approach best reflects negotiation thinking?", options: ["Defend your first position", "Identify both sides' interests and look for trades", "Refuse to talk", "Concede at once"], answer: 1, explanation: "Focusing on interests rather than positions opens room for mutually useful trades." }
  },
  "calibration": {
    example: ["Estimation", "A lead records each estimate with a confidence level and reviews how often high-confidence estimates were right."],
    failure: ["Overconfidence", "Confidence runs ahead of accuracy, so errors go unchecked."],
    check: { prompt: "You are right only 60% of the time when you feel 90% sure. This shows:", options: ["Good calibration", "Overconfidence", "Strong recall", "Habit formation"], answer: 1, explanation: "Confidence exceeds actual accuracy, which is overconfidence." }
  },
  "emotional-regulation": {
    example: ["Reviews", "After a harsh comment, an engineer waits ten minutes and replies to the technical point only."],
    failure: ["Emotional hijack", "Strong emotion narrows attention and pushes an impulsive reply."],
    check: { prompt: "Which action is an example of emotional regulation?", options: ["Reply immediately in anger", "Pause, breathe and re-read before responding", "Ignore the message forever", "Escalate at once"], answer: 1, explanation: "Influencing how an emotion shapes your behavior is regulation." }
  },
  "self-monitoring": {
    example: ["Time use", "A developer checks at midday whether the morning's priorities were actually worked on."],
    failure: ["Blind spot", "Without observation, drift from the plan goes unnoticed until the deadline."],
    check: { prompt: "Which practice is self-monitoring?", options: ["Occasionally checking whether your work still matches the plan", "Never checking progress", "Relying on others to notice", "Waiting for the final result"], answer: 0, explanation: "Observing your own behavior as it happens lets you correct course early." }
  },
  "habit-formation": {
    example: ["Daily routine", "An engineer starts a five-minute review every time they close the laptop."],
    failure: ["Habit drift", "A routine fades when its cue disappears or changes."],
    check: { prompt: "What helps a new habit stick?", options: ["A stable cue, repetition and a reward", "Only strong willpower", "Random timing", "Very long first sessions"], answer: 0, explanation: "Habits are built from a reliable cue, repeated behavior and reward." }
  },
  "resilience": {
    example: ["After an incident", "A team reviews a failed release, keeps what worked and plans the next one without blame."],
    failure: ["Rumination", "Repeated dwelling on a setback replaces useful action."],
    check: { prompt: "Which response to a setback shows resilience?", options: ["Dwell on it for days", "Extract the lesson and plan the next step", "Hide it", "Blame someone"], answer: 1, explanation: "Recovering and continuing effectively after a setback is resilience." }
  },
  "focus-management": {
    example: ["Planning", "A developer blocks two hours of calendar time and turns off chat during it."],
    failure: ["Default-driven focus", "Attention is shaped by whatever alerts and meetings arrive, not by priorities."],
    check: { prompt: "Which is an example of focus management?", options: ["Leaving every notification on", "Protecting a time block and limiting interruptions", "Switching tasks often", "Working on whatever appears"], answer: 1, explanation: "Shaping time and environment protects attention for chosen priorities." }
  },
  "mental-simulation": {
    example: ["Deployment", "An engineer walks through the rollout in their head and finds a step that depends on a missing permission."],
    failure: ["Optimistic simulation", "The imagined run assumes everything works, so friction and failure are left out."],
    check: { prompt: "A mental simulation is only as good as:", options: ["Its assumptions", "Its speed", "Its length", "Its vividness"], answer: 0, explanation: "The imagined sequence depends on the assumptions it is built on." }
  },
  "scenario-planning": {
    example: ["Strategy", "A group writes three different market futures and checks which plans hold across all three."],
    failure: ["One-future planning", "Only the most likely future is planned for, so a change is a shock."],
    check: { prompt: "What is the aim of scenario planning?", options: ["Predict the single correct future", "Prepare for several distinct futures", "Eliminate uncertainty", "Avoid planning"], answer: 1, explanation: "Scenarios explore different possible futures to prepare for uncertainty." }
  },
  "forecasting": {
    example: ["Delivery", "A team states a 70% chance of finishing by March and reviews later whether such statements came true about 70% of the time."],
    failure: ["Overconfident forecast", "Ranges are too narrow, so surprises feel impossible."],
    check: { prompt: "Why use a range rather than a single number?", options: ["It expresses uncertainty honestly", "It sounds more precise", "It prevents checking", "It is always smaller"], answer: 0, explanation: "A range communicates how uncertain the estimate really is." }
  },
  "strategic-thinking": {
    example: ["Roadmapping", "A leader chooses what not to build this year, given the goals, constraints and likely competitor moves."],
    failure: ["Strategy as a wish list", "Goals are listed without choices, constraints or trade-offs."],
    check: { prompt: "A strategy differs from a goal list because it includes:", options: ["Choices among options under constraints", "More goals", "Fewer people", "No trade-offs"], answer: 0, explanation: "Strategy means deliberately choosing direction under constraints, which implies saying no to some options." }
  },
  "risk-assessment": {
    example: ["Operations", "An SRE rates a region outage by likelihood and impact and decides which mitigation to fund first."],
    failure: ["Ignoring low-probability high-impact risks", "A rare but severe event is dismissed because it has not happened yet."],
    check: { prompt: "Risk assessment considers:", options: ["How likely something is and how severe it would be", "Only severity", "Only past incidents", "Only cost"], answer: 0, explanation: "Both likelihood and severity determine priority." }
  },
  "recognition-decisions": {
    example: ["On-call", "An experienced engineer recognizes a known failure signature and acts, then verifies the evidence still fits."],
    failure: ["False recognition", "A situation looks like a familiar one but differs in a key way, and the familiar action is wrong."],
    check: { prompt: "When is a recognition decision most reliable?", options: ["In a familiar domain with good feedback experience", "In a completely novel domain", "When the stakes are unknown", "When no experience exists"], answer: 0, explanation: "Recognition works when the person has seen many similar cases and learned from the outcomes." }
  },
  "analytical-decisions": {
    example: ["Design choice", "A team scores two architectures on cost, risk and reversibility and records the result."],
    failure: ["Analysis paralysis", "Deliberation continues past the point where more information would change the choice."],
    check: { prompt: "Analytical decisions rely on:", options: ["Explicit options and criteria", "Gut feeling alone", "Coin flips", "The first idea"], answer: 0, explanation: "They compare options deliberately against stated criteria." }
  },
  "bayesian-thinking": {
    example: ["Release", "A product manager lowers the launch's success odds when early feedback is weaker than expected, but not to zero."],
    failure: ["Base-rate neglect", "A vivid case outweighs how often the outcome really occurs."],
    check: { prompt: "In Bayesian thinking, new evidence should:", options: ["Shift belief in proportion to how strong it is", "Replace the prior completely", "Be ignored", "Always raise confidence"], answer: 0, explanation: "Beliefs are updated by evidence, weighted by how diagnostic it is and by the prior." }
  },
  "expected-value-thinking": {
    example: ["Prioritization", "A team weighs a 10% chance of a large payoff against a certain small one before choosing."],
    failure: ["Ignoring probability or magnitude", "Only the chance or only the size is considered, so the comparison is skewed."],
    check: { prompt: "Expected value combines:", options: ["Probability and size of outcomes", "Speed and cost", "Effort and mood", "Memory and attention"], answer: 0, explanation: "Outcomes are weighted by their probabilities." }
  },
  "cost-benefit-analysis": {
    example: ["Tooling", "A team lists the full costs of adopting a new tool (licenses, training, migration) against its expected benefits."],
    failure: ["Missing costs", "Hidden or delayed costs are left out, so the option looks better than it is."],
    check: { prompt: "Which is a common error in cost-benefit analysis?", options: ["Leaving out hidden or delayed costs", "Writing the analysis down", "Including benefits", "Comparing options"], answer: 0, explanation: "Omitted costs make an option look better than it is." }
  },
  "trade-off-management": {
    example: ["Architecture", "A team chooses speed to market over cost and writes down that choice and what it gives up."],
    failure: ["Hidden sacrifice", "The loss in a choice is not stated, so it surprises people later."],
    check: { prompt: "Good trade-off management makes explicit:", options: ["What is being given up and why", "Only the benefits", "Nothing", "The loudest preference"], answer: 0, explanation: "Naming the sacrifice lets the decision be reviewed and revisited." }
  },
  "reflection": {
    example: ["Retrospective", "A team asks not just what went wrong but why it happened and what to change next time."],
    failure: ["Shallow reflection", "Events are listed without asking why they happened or what to change."],
    check: { prompt: "Which question moves a retrospective from description to reflection?", options: ["What happened?", "Why did it happen and what will we change?", "Who attended?", "When did it start?"], answer: 1, explanation: "Reflection explains causes and decides on change." }
  },
  "thinking-about-thinking": {
    example: ["Problem solving", "An engineer pauses and asks, “Am I testing a hypothesis or just trying things at random?”"],
    failure: ["No monitoring", "Confusion goes unnoticed until the result fails."],
    check: { prompt: "Which is an example of thinking about your own thinking?", options: ["Asking whether your current strategy is working", "Solving the problem faster", "Memorizing the answer", "Typing more quickly"], answer: 0, explanation: "Evaluating your own reasoning process is metacognition." }
  },
  "self-awareness": {
    example: ["Estimation", "An engineer knows they usually under-estimate integration work and adds buffer for it."],
    failure: ["Blind spots", "Strengths and limits are misjudged, so effort and help are misallocated."],
    check: { prompt: "Why does self-awareness improve decisions?", options: ["It reveals your biases and limits so you can compensate", "It removes all bias", "It makes others agree", "It speeds typing"], answer: 0, explanation: "Knowing your tendencies lets you adjust for them." }
  },
  "strategy-selection": {
    example: ["Debugging", "After guessing for an hour, a developer switches to writing a failing test to isolate the fault."],
    failure: ["Strategy lock-in", "A comfortable method continues after it stops working."],
    check: { prompt: "What should prompt a change of strategy?", options: ["Evidence that the current one is not working", "Boredom only", "Nothing", "Others' comfort"], answer: 0, explanation: "Monitoring progress and responding to evidence is the core of strategy selection." }
  },
  "learning-regulation": {
    example: ["Study plan", "A learner finds they can recognize but not explain a topic, so they add self-explanation sessions."],
    failure: ["Progress illusion", "Counting hours or pages hides shallow understanding."],
    check: { prompt: "Which is an example of regulating your own learning?", options: ["Testing yourself and changing the plan based on gaps", "Studying the same way forever", "Counting hours only", "Avoiding feedback"], answer: 0, explanation: "Planning, monitoring and adjusting how you learn is learning regulation." }
  },
  "cognitive-debugging": {
    example: ["Reasoning errors", "An engineer explains their reasoning aloud to a colleague and hears the faulty assumption."],
    failure: ["Silent assumption", "An unexamined assumption stays in the reasoning, so the error repeats."],
    check: { prompt: "Which method best helps find an error in your own reasoning?", options: ["Explain it step by step to someone else", "Re-read it silently once", "Repeat the conclusion", "Avoid checking"], answer: 0, explanation: "Making reasoning explicit exposes steps that you were silently assuming." }
  },
  "root-cause-analysis": {
    example: ["Incident review", "After a checkout outage, the team asks “why” repeatedly and finds that the root cause was a missing deploy check, not the failing service."],
    failure: ["Stopping at the proximate cause", "The analysis ends at the first visible trigger, such as an operator error, so the underlying conditions remain and the failure recurs."],
    check: { prompt: "An outage is blamed on an engineer's mistake, and the review ends there. What is the weakness?", options: ["It stopped at a proximate cause instead of the conditions that allowed the mistake", "It was too thorough", "It used too many causes", "It was too quick to find a fix"], answer: 0, explanation: "Root cause analysis looks for the contributing conditions that, if changed, would prevent recurrence." }
  },
  "human-ai-cognition": {
    example: ["Code review", "An engineer uses an AI assistant to draft tests, then checks that the tests cover the intended behavior, because the assistant cannot know the real requirements."],
    failure: ["Automation over-trust", "AI output is accepted because it sounds fluent, so errors pass unchecked."],
    check: { prompt: "Which division of work best uses both human and AI strengths?", options: ["AI proposes options quickly, the person judges them against goals and context", "AI decides and the person approves without reading", "The person does everything manually", "Both repeat the same step"], answer: 0, explanation: "AI adds speed and variety, while people hold the goals, context and accountability." }
  }
};

function buildConceptCheck(concept) {
  const detail = conceptDetails[concept.id]?.check;
  if (detail) {
    // Rotate options by a per-concept offset so the correct position varies but stays stable across loads.
    const shift = (concept.index + concept.domain.number.length + concept.id.length) % detail.options.length;
    const options = detail.options.map((_, i) => detail.options[(i - shift + detail.options.length) % detail.options.length]);
    return { ...detail, options, answer: (detail.answer + shift) % detail.options.length };
  }
  const siblings = concept.domain.concepts;
  const options = [0, 1, 2, 3].map(offset => siblings[(concept.index + offset) % siblings.length][1]);
  const slot = concept.index % 4;
  const ordered = options.slice(1);
  ordered.splice(slot, 0, options[0]);
  return { prompt: `Which description fits “${concept.name}”?`, options: ordered, answer: slot };
}

// Mirrors the matrix in ../reader-support-protocol.html. Link digits follow protocolCategories order (2 main, 1 supporting).
const protocolCategories = [
  ["ATT", "Attention"], ["WM", "Working memory"], ["KN", "Concepts, schemas & retrieval"],
  ["MOD", "Integration, inference & model construction"], ["EX", "Executive control & goals"],
  ["META", "Metacognitive monitoring"], ["MOT", "Motivation & relevance"]
];

const protocolItems = [
  ["Plan", "Identify the reader and reading context", "1111102"],
  ["Plan", "Establish starting knowledge and prerequisites", "0121000"],
  ["Plan", "Identify the reader's question or need", "1010202"],
  ["Plan", "Define the intended learning outcome", "1001211"],
  ["Plan", "Anticipate likely difficulties", "1222110"],
  ["Compose", "Purpose: state the question and its value", "2010202"],
  ["Compose", "Orient: connect to familiar knowledge", "1122101"],
  ["Compose", "Explain: develop one meaningful idea", "1212100"],
  ["Compose", "Show: provide a concrete example or diagram", "1122011"],
  ["Compose", "Connect: relate the idea to the larger picture", "0122111"],
  ["Compose", "Check: offer application or explanation", "1122121"],
  ["Compose", "Continue: recap and introduce the next question", "1211211"],
  ["Review", "Explain unfamiliar terms before relying on them", "0221000"],
  ["Review", "Clarify references, relationships, and causal links", "1212000"],
  ["Review", "Restate necessary distant details", "0212100"],
  ["Review", "Remove decorative or misleading examples", "1112010"],
  ["Review", "Distinguish fact, inference, analogy, and uncertainty", "0112120"],
  ["Review", "Help readers recover after interruption", "1211201"],
  ["Review", "Deliver promised value without artificial withholding", "1001102"],
  ["Validate", "Ask readers to explain the main idea", "0122020"],
  ["Validate", "Ask readers to apply it to a new example", "0122120"],
  ["Validate", "Ask readers to identify remaining confusion", "0011120"]
];

const domainProtocolCategories = {
  attention: ["ATT"],
  memory: ["WM", "KN"],
  executive: ["EX"],
  knowledge: ["KN", "MOD"],
  reasoning: ["MOD"],
  learning: ["KN", "META"],
  creativity: ["MOD", "MOT"],
  social: ["MOD", "MOT"],
  "self-regulation": ["EX", "MOT"],
  future: ["EX", "MOT"],
  decision: ["EX", "META"],
  metacognition: ["META"]
};

function renderReaderSupport(domain) {
  const ids = domainProtocolCategories[domain.id];
  if (!ids) return `<p class="panel">No reader-support mapping for this domain yet.</p>`;
  const columns = ids.map(id => protocolCategories.findIndex(([key]) => key === id));
  const ranked = protocolItems
    .map(([phase, title, links], order) => ({
      phase, title, order,
      score: columns.reduce((sum, column) => sum + Number(links[column]), 0)
    }))
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score || left.order - right.order)
    .slice(0, 5);
  const names = ids.map(id => protocolCategories.find(([key]) => key === id)[1]);
  return `
    <p class="section-intro">If you write content for readers, these protocol practices most support <strong>${names.join(" and ")}</strong>, the reader-side processes this domain covers.</p>
    <div class="panel"><ol class="objective-list">${ranked.map(item => `<li><span><strong>${item.phase}:</strong> ${item.title}</span></li>`).join("")}</ol></div>
    <p><a class="plain-button" href="../reader-support-protocol.html#matrix">Open the full reader-support matrix →</a></p>`;
}

function renderConceptTabs(concept) {
  const { domain } = concept;
  const ready = domain.status === "ready";
  const mapping = domain.mappings?.find(row => {
    const a = row[0].toLowerCase();
    const b = concept.name.toLowerCase();
    return a === b || a.includes(b) || b.includes(a);
  });
  const related = (domain.relations || []).map(label => ({ label, target: resolveRelation(label) }));
  const siblings = allConcepts.filter(entry => entry.domain === domain && entry !== concept);
  const planned = `<p class="panel">This capability is planned for a later Atlas release.</p>`;
  const check = ready ? buildConceptCheck(concept) : null;
  const detail = conceptDetails[concept.id];
  return {
    overview: `
      <div class="panel"><h3>Definition</h3><p>${concept.description}</p></div>
      <div class="panel"><h3>Part of ${domain.name}</h3><p>${domain.purpose}</p></div>
      ${ready ? `${detail ? `<div class="panel"><h3>Typical failure: ${detail.failure[0]}</h3><p>${detail.failure[1]}</p></div>` : ""}
      <div class="panel"><h3>Learning objectives for the domain</h3><ol class="objective-list">${domain.objectives.map(item => `<li>${item}</li>`).join("")}</ol></div>
      <div class="failure-grid">${domain.failures.map(([name, text]) => `<article class="failure"><strong>${name}</strong><p>${text}</p></article>`).join("")}</div>` : planned}`,
    examples: ready ? `
      ${detail ? `<article class="panel example-card"><span class="example-context">${detail.example[0]}</span><p>${detail.example[1]}</p></article>
      <p class="section-intro">More examples from across the domain:</p>` : `<p class="section-intro">Domain-level examples; concept-specific cases are a later refinement.</p>`}
      <div class="example-grid">${domain.examples.map(([context, text]) => `<article class="panel example-card"><span class="example-context">${context}</span><p>${text}</p></article>`).join("")}</div>
      <h3>Human ↔ Tool ↔ AI</h3>
      <div class="mapping-table-wrap"><table class="mapping-table"><thead><tr><th>Human function</th><th>External tool</th><th>AI extension</th><th>Guardrail</th></tr></thead>
      <tbody>${(mapping ? [mapping] : domain.mappings).map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      ${mapping ? "" : "<p class=\"section-intro\">No row is specific to this capability, so the whole domain is shown.</p>"}` : planned,
    quiz: ready ? `
      <form class="quiz" id="concept-check">
        <fieldset class="question">
          <legend><span class="question-type">Apply</span><h3>${check.prompt}</h3></legend>
          <div class="options">${check.options.map((option, index) => `
            <label class="option"><input type="radio" name="concept-check" value="${index}"><span>${option}</span></label>`).join("")}</div>
          <p class="feedback" aria-live="polite"></p>
        </fieldset>
      </form>
      <div class="quiz-actions"><button class="primary-button" id="check-concept" type="button">Check answer</button>
      <a class="plain-button" href="${domain.page}#assessment">Take the full ${domain.shortName} assessment →</a></div>` : planned,
    relationships: `
      <div class="panel"><h3>Same domain</h3><div class="relationship-map">
        ${siblings.map(entry => `<a class="relationship-node" href="${conceptHref(entry)}">${entry.name}</a>`).join("")}</div></div>
      <div class="panel"><h3>Connected concepts</h3><div class="relationship-map">
        ${related.length ? related.map(({ label, target }) => target
          ? `<a class="relationship-node" href="${target.href}">${label}</a>`
          : `<span class="relationship-node" title="Not in the Atlas yet">${label}</span>`).join("") : "<span>None recorded.</span>"}</div></div>
      <p><a class="plain-button" href="graph.html?focus=${concept.id}">Open in knowledge graph →</a></p>`,
    support: renderReaderSupport(domain)
  };
}

function renderConcept() {
  const concept = allConcepts.find(entry => entry.id === new URLSearchParams(location.search).get("c"));
  const root = document.querySelector("#concept-root");
  if (!concept) {
    root.innerHTML = `<section class="panel"><h1>Concept not found</h1><p><a href="graph.html">Browse the knowledge graph</a> or the <a href="index.html#explore">domains</a>.</p></section>`;
    return;
  }
  const { domain } = concept;
  document.documentElement.style.setProperty("--domain-color", domain.color);
  document.title = `${concept.name} · Atlas of Cognition`;
  const tabs = renderConceptTabs(concept);
  const labels = { overview: "Overview", examples: "Examples", quiz: "Quiz", relationships: "Relationships", support: "Reader support" };
  root.innerHTML = `
    <nav class="breadcrumb"><a href="index.html">Atlas</a><span>/</span><a href="${domainHref(domain)}">${domain.name}</a><span>/</span><span>${concept.name}</span></nav>
    <section class="domain-hero"><div><p class="eyebrow">Domain ${domain.number} · ${domain.shortName}</p><h1>${concept.name}</h1><p>${concept.description}</p></div></section>
    <div class="level-control"><label for="concept-level">Your level</label>
      <select id="concept-level">${masteryLabels.map((label, level) => `<option value="${level}">${level} · ${label}</option>`).join("")}</select>
      <span id="level-saved" aria-live="polite"></span></div>
    <div class="tab-list" role="tablist">${Object.entries(labels).map(([key, label]) =>
      `<button class="tab" role="tab" id="tab-${key}" aria-controls="panel-${key}" data-tab="${key}" type="button">${label}</button>`).join("")}</div>
    ${Object.keys(labels).map(key => `<section class="tab-panel" role="tabpanel" id="panel-${key}" aria-labelledby="tab-${key}" hidden>${tabs[key]}</section>`).join("")}
    <section class="concept-notes" id="concept-notes" aria-labelledby="concept-notes-title"></section>`;

  const select = key => {
    const active = tabs[key] ? key : "overview";
    root.querySelectorAll(".tab").forEach(tab => {
      const on = tab.dataset.tab === active;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    root.querySelectorAll(".tab-panel").forEach(panel => { panel.hidden = panel.id !== `panel-${active}`; });
  };
  root.querySelector(".tab-list").addEventListener("click", event => {
    const tab = event.target.closest(".tab");
    if (tab) { select(tab.dataset.tab); history.replaceState(null, "", `#${tab.dataset.tab}`); }
  });
  select(location.hash.slice(1));

  const levelSelect = root.querySelector("#concept-level");
  levelSelect.value = String(getConceptLevels()[concept.id] || 0);
  levelSelect.addEventListener("change", () => {
    setConceptLevel(concept.id, Number(levelSelect.value));
    root.querySelector("#level-saved").textContent = "Saved in this browser.";
  });
  const button = root.querySelector("#check-concept");
  if (button) {
    const check = buildConceptCheck(concept);
    button.addEventListener("click", () => {
      const selected = root.querySelector("#concept-check input:checked");
      const feedback = root.querySelector("#concept-check .feedback");
      const correct = Number(selected?.value) === check.answer;
      feedback.className = `feedback visible ${correct ? "correct" : "incorrect"}`;
      feedback.textContent = !selected ? "Select an answer first." : correct ? `Correct.${check.explanation ? " " + check.explanation : ""}` : `Not quite. ${check.explanation || "The right description: " + check.options[check.answer]}`;
    });
  }
  renderConceptNotes(concept);
}

// Notes on a concept are stored with the concept id as sectionId, so they appear in the
// dashboard alongside section notes and survive the existing export/import format.
// Remembers the chosen view across re-renders triggered by saving or deleting a note.
let conceptNotesView = "list";

function renderConceptNotes(concept) {
  const root = document.querySelector("#concept-notes");
  if (!root) return;
  const { domain } = concept;
  const sectionId = concept.id;
  const sectionTitle = concept.name;
  const notes = getStoredNotes()
    .filter(note => note.domainId === domain.id && note.sectionId === sectionId)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  const openTasks = notes.filter(note => note.type === "task" && !note.completed).length;
  const showEditor = conceptNotesView === "add";

  root.innerHTML = `
    <div class="concept-notes-header">
      <div>
        <h2 id="concept-notes-title">Your notes on ${escapeHtml(concept.name)}</h2>
        <p class="section-intro">Comments, questions, and tasks about this concept. Notes stay in this browser and appear in your learning dashboard.</p>
      </div>
      <span class="concept-notes-count">${notes.length} ${notes.length === 1 ? "note" : "notes"}${openTasks ? ` · ${openTasks} open ${openTasks === 1 ? "task" : "tasks"}` : ""}</span>
    </div>
    <div class="concept-notes-toolbar" role="group" aria-label="Note view">
      <button class="plain-button note-view-button" type="button" data-note-view="list" aria-pressed="${!showEditor}">
        ${noteViewIcons.list}<span>Notes</span>
      </button>
      <button class="plain-button note-view-button" type="button" data-note-view="add" aria-pressed="${showEditor}">
        ${noteViewIcons.add}<span>Add note</span>
      </button>
    </div>
    <div class="concept-note-editor" ${showEditor ? "" : "hidden"}>
      ${noteFormMarkup()}
    </div>
    <div class="section-note-list">
      ${notes.length ? notes.map(note => renderNoteCard(note, false)).join("") : '<p class="empty-state">No notes on this concept yet. Use “Add note” to capture one.</p>'}
    </div>`;

  const form = root.querySelector(".note-form");
  const editor = root.querySelector(".concept-note-editor");
  const type = form.elements.type;
  const customTypeField = root.querySelector(".custom-type-field");
  const status = root.querySelector(".form-status");

  let baseline = noteFormSnapshot(form);

  const setView = view => {
    conceptNotesView = view;
    editor.hidden = view !== "add";
    root.querySelectorAll("[data-note-view]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.noteView === view));
    });
    if (view === "add") form.elements.text.focus();
  };

  const closePanel = () => {
    resetNoteForm(form, customTypeField);
    setView("list");
    baseline = noteFormSnapshot(form);
    if (activeNotePanel?.control === root) activeNotePanel = null;
  };

  const registerPanel = () => {
    activeNotePanel = {
      control: root,
      close: closePanel,
      contains: target => root.contains(target),
      isDirty: () => noteFormSnapshot(form) !== baseline
    };
  };

  root.querySelectorAll("[data-note-view]").forEach(button => {
    button.addEventListener("click", () => {
      // Starting a new note from the toolbar discards a half-finished edit.
      if (button.dataset.noteView === "add" && form.elements.noteId.value) {
        resetNoteForm(form, customTypeField);
      }
      setView(button.dataset.noteView);
      baseline = noteFormSnapshot(form);
      registerPanel();
    });
  });
  type.addEventListener("change", () => {
    customTypeField.hidden = type.value !== "custom";
    if (type.value === "custom") form.elements.customType.focus();
  });
  root.querySelector(".cancel-note").addEventListener("click", closePanel);
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (saveNoteFromForm(form, status, { domainId: domain.id, sectionId, sectionTitle })) {
      conceptNotesView = "list";
      renderConceptNotes(concept);
    }
  });
  root.querySelector(".section-note-list").addEventListener("click", event => {
    const action = event.target.closest("[data-note-action]");
    if (!action) return;
    const note = getStoredNotes().find(entry => entry.id === action.dataset.noteId);
    if (!note) return;
    if (action.dataset.noteAction === "edit") {
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
      renderConceptNotes(concept);
    }
    if (action.dataset.noteAction === "toggle-task") {
      setStoredNotes(getStoredNotes().map(entry => entry.id === note.id
        ? { ...entry, completed: !entry.completed, updatedAt: new Date().toISOString() }
        : entry));
      renderConceptNotes(concept);
    }
  });
}

function renderGraph() {
  const svg = document.querySelector("#graph-svg");
  const size = 2500;
  const center = size / 2;
  const ns = "http://www.w3.org/2000/svg";
  const make = (tag, attrs, parent) => {
    const el = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    (parent || svg).appendChild(el);
    return el;
  };
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  const edgeLayer = make("g", { class: "graph-edges" });
  const nodeLayer = make("g", {});
  const positions = new Map();
  const nodes = new Map();

  atlasDomains.forEach((domain, domainIndex) => {
    const angle = (domainIndex / atlasDomains.length) * Math.PI * 2 - Math.PI / 2;
    const hub = { x: center + Math.cos(angle) * 950, y: center + Math.sin(angle) * 950 };
    positions.set(`d:${domain.id}`, hub);
    const group = make("g", { class: `graph-node domain ${domain.status}`, tabindex: 0, role: "link", "aria-label": domain.name }, nodeLayer);
    make("circle", { cx: hub.x, cy: hub.y, r: 26, fill: domain.color }, group);
    const label = make("text", { x: hub.x, y: hub.y + 52, "text-anchor": "middle", class: "domain-label" }, group);
    label.textContent = domain.shortName;
    group.addEventListener("click", () => { location.href = domainHref(domain); });
    group.addEventListener("keydown", event => { if (event.key === "Enter") location.href = domainHref(domain); });
    nodes.set(`d:${domain.id}`, group);

    domain.concepts.forEach(([name], conceptIndex) => {
      const concept = allConcepts.find(entry => entry.domain === domain && entry.index === conceptIndex);
      const a = (conceptIndex / domain.concepts.length) * Math.PI * 2 + angle;
      const point = { x: hub.x + Math.cos(a) * 125, y: hub.y + Math.sin(a) * 125 };
      positions.set(`c:${concept.id}`, point);
      const cg = make("g", { class: "graph-node concept", tabindex: 0, role: "link", "aria-label": name }, nodeLayer);
      make("line", { x1: hub.x, y1: hub.y, x2: point.x, y2: point.y, class: "graph-spoke" }, edgeLayer);
      make("circle", { cx: point.x, cy: point.y, r: 7, fill: domain.color }, cg);
      const text = make("text", { x: point.x + Math.cos(a) * 12, y: point.y + Math.sin(a) * 12 + 4, "text-anchor": Math.cos(a) >= 0 ? "start" : "end" }, cg);
      text.textContent = name;
      cg.addEventListener("click", () => { location.href = conceptHref(concept); });
      cg.addEventListener("keydown", event => { if (event.key === "Enter") location.href = conceptHref(concept); });
      nodes.set(`c:${concept.id}`, cg);
    });
  });

  const links = [];
  atlasDomains.forEach(domain => (domain.relations || []).forEach(label => {
    const target = resolveRelation(label);
    if (!target) return;
    const from = `d:${domain.id}`;
    const to = target.kind === "concept" ? `c:${target.concept.id}` : `d:${target.domain.id}`;
    if (from === to) return;
    const a = positions.get(from);
    const b = positions.get(to);
    const path = make("path", { d: `M${a.x},${a.y} Q${center},${center} ${b.x},${b.y}`, class: "graph-link", stroke: domain.color }, edgeLayer);
    links.push({ from, to, path });
  }));

  const highlight = key => {
    svg.classList.toggle("dimmed", Boolean(key));
    nodes.forEach(node => node.classList.remove("hot"));
    links.forEach(link => link.path.classList.remove("hot"));
    if (!key) return;
    nodes.get(key)?.classList.add("hot");
    links.filter(link => link.from === key || link.to === key).forEach(link => {
      link.path.classList.add("hot");
      nodes.get(link.from)?.classList.add("hot");
      nodes.get(link.to)?.classList.add("hot");
    });
  };
  nodes.forEach((node, key) => {
    node.addEventListener("mouseenter", () => highlight(key));
    node.addEventListener("mouseleave", () => highlight(null));
    node.addEventListener("focus", () => highlight(key));
    node.addEventListener("blur", () => highlight(null));
  });
  const focus = new URLSearchParams(location.search).get("focus");
  if (focus && nodes.has(`c:${focus}`)) highlight(`c:${focus}`);
  document.querySelector("#graph-count").textContent = `${atlasDomains.length} domains · ${allConcepts.length} capabilities · ${links.length} cross-links`;
}

const learningPaths = [
  { id: "productivity", name: "Productivity Path", summary: "Protect focus, hold the right information, and steer toward goals.", steps: ["Attention", "Working Memory", "Planning", "Executive Control"] },
  { id: "leadership", name: "Leadership Path", summary: "Understand people, decide well, and regulate your own reactions.", steps: ["Perspective Taking", "Decision Making", "Strategic Thinking", "Emotional Regulation"] },
  { id: "software", name: "Software Engineering Path", summary: "Model systems, spot patterns, and find root causes.", steps: ["Systems Thinking", "Mental Models", "Pattern Recognition", "Root Cause Analysis"] },
  { id: "ai", name: "AI Practitioner Path", summary: "Think about thinking, reason carefully, and extend cognition with AI.", steps: ["Metacognition", "Reasoning", "Mental Models", "Human ↔ AI Cognition"] }
];
const levelsStorageKey = `${storagePrefix}levels`;

function getConceptLevels() {
  try {
    return JSON.parse(localStorage.getItem(levelsStorageKey)) || {};
  } catch {
    return {};
  }
}

function setConceptLevel(id, level) {
  const levels = getConceptLevels();
  if (level > 0) levels[id] = level; else delete levels[id];
  localStorage.setItem(levelsStorageKey, JSON.stringify(levels));
}

// A step is a concept (self-rated level), a domain (quiz mastery), or missing from the Atlas (null).
function stepState(name) {
  const target = resolveRelation(name);
  if (!target) return { name, href: null, level: null };
  if (target.kind === "concept") return { name, href: target.href, level: getConceptLevels()[target.concept.id] || 0 };
  return { name, href: target.href, level: getStoredResult(target.domain.id)?.mastery || 0, domain: target.domain };
}

const appliedLevel = 3;

function renderPaths() {
  document.querySelector("#paths-root").innerHTML = learningPaths.map(path => {
    const steps = path.steps.map(stepState);
    const done = steps.filter(step => step.level >= appliedLevel).length;
    return `
      <article class="panel path-card">
        <h2>${path.name}</h2>
        <p>${path.summary}</p>
        <div class="progress-track"><div class="progress-fill" style="width:${done / steps.length * 100}%"></div></div>
        <p class="path-count">${done} of ${steps.length} steps at “${masteryLabels[appliedLevel]}” or higher</p>
        <ol class="path-steps">${steps.map(step => `
          <li>${step.href ? `<a href="${step.href}">${step.name}</a>` : `<span title="Not in the Atlas yet">${step.name}</span>`}
            <span class="path-level">${step.level === null ? "Planned" : masteryLabels[step.level]}</span></li>`).join("")}
        </ol>
      </article>`;
  }).join("");
}

function renderProfile() {
  const levels = getConceptLevels();
  const rated = Object.entries(levels)
    .map(([id, level]) => ({ concept: allConcepts.find(entry => entry.id === id), level }))
    .filter(entry => entry.concept);
  const results = readyDomains.map(domain => ({ domain, result: getStoredResult(domain.id) }));
  const taken = results.filter(entry => entry.result?.completed);
  const chip = (href, text, extra = "") => `<a class="relationship-node" href="${href}">${text}${extra}</a>`;
  const strengths = [
    ...rated.filter(entry => entry.level >= 4).map(entry => chip(conceptHref(entry.concept), entry.concept.name, ` · ${masteryLabels[entry.level]}`)),
    ...taken.filter(entry => entry.result.mastery >= 3).map(entry => chip(entry.domain.page, entry.domain.shortName, ` · quiz ${entry.result.score}%`))
  ];
  const growth = [
    ...rated.filter(entry => entry.level <= 2).map(entry => chip(conceptHref(entry.concept), entry.concept.name, ` · ${masteryLabels[entry.level]}`)),
    ...taken.filter(entry => entry.result.score < 60).map(entry => chip(entry.domain.page, entry.domain.shortName, ` · quiz ${entry.result.score}%`))
  ];
  const next = [];
  results.filter(entry => !entry.result?.completed || entry.result.score < 80).forEach(entry => next.push({
    href: `${entry.domain.page}#assessment`,
    text: entry.result?.completed ? `Retake the ${entry.domain.shortName} assessment` : `Take the ${entry.domain.shortName} assessment`,
    why: entry.result?.completed ? `Last score ${entry.result.score}%.` : "No result recorded yet."
  }));
  learningPaths.forEach(path => {
    const step = path.steps.map(stepState).find(entry => entry.href && entry.level < appliedLevel);
    if (step) next.push({ href: step.href, text: `${path.name}: ${step.name}`, why: `Next step below “${masteryLabels[appliedLevel]}”.` });
  });
  const list = items => items.length ? `<div class="relationship-map">${items.join("")}</div>` : "<p>Nothing here yet.</p>";
  const hasData = rated.length || taken.length;
  document.querySelector("#profile-root").innerHTML = `
    ${hasData ? "" : `<p class="panel">Your profile builds from two inputs: the level you set on each <a href="graph.html">concept page</a> and your domain assessment results. Both are stored only in this browser.</p>`}
    <div class="profile-stats">
      <div class="panel"><strong>${rated.length}</strong><p>concepts self-rated</p></div>
      <div class="panel"><strong>${taken.length}/${readyDomains.length}</strong><p>domain assessments taken</p></div>
    </div>
    <section class="panel"><h2>Strengths</h2><p class="section-intro">Concepts you rate Analyze or higher, and domains with an Apply-level quiz result.</p>${list(strengths)}</section>
    <section class="panel"><h2>Growth areas</h2><p class="section-intro">Concepts you rate Understand or lower, and domains with a quiz score under 60%.</p>${list(growth)}</section>
    <section class="panel"><h2>Recommended next</h2>
      <ul class="recommend-list">${next.slice(0, 6).map(item => `<li><a href="${item.href}">${item.text}</a> <span>${item.why}</span></li>`).join("") || "<li>You're caught up on every path and assessment.</li>"}</ul>
    </section>
    <p class="section-intro">Self-ratings and quiz scores support reflection; they are not psychological measurements.</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderShell();
  if (document.body.dataset.page === "paths") renderPaths();
  if (document.body.dataset.page === "profile") renderProfile();
  if (document.body.dataset.page === "concept") renderConcept();
  if (document.body.dataset.page === "graph") renderGraph();
  if (document.body.dataset.page === "home") renderHome();
  if (document.body.dataset.page === "domain") renderDomain();
  if (document.body.dataset.page === "dashboard") renderDashboard();
});

const slugify = text => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const allConcepts = atlasDomains.flatMap(domain =>
  domain.concepts.map(([name, description], index) => ({ name, description, domain, index, id: slugify(name) })));

function conceptHref(concept) {
  return Atlas.url(`concept.html?c=${concept.id}`);
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
      <a class="plain-button" href="${domainSectionHref(domain, "assessment")}">Take the full ${domain.shortName} assessment →</a></div>` : planned,
    relationships: `
      <div class="panel"><h3>Same domain</h3><div class="relationship-map">
        ${siblings.map(entry => `<a class="relationship-node" href="${conceptHref(entry)}">${entry.name}</a>`).join("")}</div></div>
      <div class="panel"><h3>Connected concepts</h3><div class="relationship-map">
        ${related.length ? related.map(({ label, target }) => target
          ? `<a class="relationship-node" href="${target.href}">${label}</a>`
          : `<span class="relationship-node" title="Not in the Atlas yet">${label}</span>`).join("") : "<span>None recorded.</span>"}</div></div>
      <p><a class="plain-button" href="${Atlas.url(`graph.html?focus=${concept.id}`)}">Open in knowledge graph →</a></p>`,
    support: renderReaderSupport(domain)
  };
}

function renderConcept() {
  const concept = allConcepts.find(entry => entry.id === new URLSearchParams(location.search).get("c"));
  const root = document.querySelector("#concept-root");
  if (!concept) {
    root.innerHTML = `<section class="panel"><h1>Concept not found</h1><p><a href="${Atlas.url("graph.html")}">Browse the knowledge graph</a> or the <a href="${Atlas.url("index.html#explore")}">domains</a>.</p></section>`;
    return;
  }
  const { domain } = concept;
  document.documentElement.style.setProperty("--domain-color", domain.color);
  document.title = `${concept.name} · Atlas of Cognition`;
  const tabs = renderConceptTabs(concept);
  const labels = { overview: "Overview", examples: "Examples", quiz: "Quiz", relationships: "Relationships", support: "Reader support" };
  root.innerHTML = `
    <nav class="breadcrumb"><a href="${Atlas.url("index.html")}">Atlas</a><span>/</span><a href="${domainHref(domain)}">${domain.name}</a><span>/</span><span>${concept.name}</span></nav>
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


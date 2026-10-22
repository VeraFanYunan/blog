---
title: A Memory Architecture That Lets AI Agents Learn From Experience
description: Agent memory today retrieves past experience but rarely learns from it. This post proposes an architecture built on outcome feedback and scheduled, sleep-style consolidation.
pubDate: 2026-10-21
doi: ''
tags: [agents, memory, continual-learning]
---

## Where this started

Much of my recent work as an AI engineer has been building agents for enterprise workflows. The agents could log every run and tell you exactly what happened last time.

Getting better the next time was a different story. Their lessons lived in files and only helped when the right line happened to land in the prompt. That **gap between retrieving an experience and learning from it** is what I kept coming back to.

Picture two chess players. One carries every game she's ever played and flips through them before each move. The other has played a thousand games and simply sees the board better. Today's agents are the first player. This article proposes an architecture to make them more like the second.

## Today's memory systems work like an external hippocampus

Look at the common memory designs from vector stores and curated memory files to [MemGPT](https://arxiv.org/abs/2310.08560)-style paging and knowledge graphs, and they all behave like an external hippocampus. They write fast, store episodes, and recall them from a partial cue.

The real hippocampus has a second job. During sleep it replays the day so the neocortex can slowly absorb the pattern. That's the core of [complementary learning systems](https://doi.org/10.1037/0033-295X.102.3.419): a fast system that stores, a slow one that generalizes, and replay connecting them. Agent memory has the fast system and skips the replay, so experience piles up without turning into skill.

## Four ways to consolidate memory, and their trade-offs

Sleep could happen at four depths. The deeper it goes, the more the agent truly learns, and the harder that learning is to inspect or undo.

**Rewrite the notes.** A background job turns episodes into lessons and reusable skills, as in [Voyager](https://arxiv.org/abs/2305.16291) and Letta's [sleep-time compute](https://arxiv.org/abs/2504.13171). Cheap and reversible, but a lesson is still text, and one the agent wrote about itself, as in [Reflexion](https://arxiv.org/abs/2303.11366), is an untested hypothesis.

**Distill the notes into weights.** [Context distillation](https://arxiv.org/abs/2209.15189) trains the model to answer without its notes as it would with them, ideally into a per-user or per-domain adapter. This is real consolidation, paid for in legibility: behaviour gets harder to trace and data harder to delete.

**Fine-tune continuously.** Catastrophic forgetting is the core obstacle, and replay, [EWC](https://arxiv.org/abs/1612.00796) and [sparse memory finetuning](https://arxiv.org/abs/2510.15103) all reduce it. The catch is operational: every update becomes a deploy, and a model that learns from users can also be steered by them.

**Wait for the next model.** Training the next version on deployment data works, but slowly and for everyone at once.

For a team shipping agents today, I'd start at the first level and add the second once the evals are trustworthy. Both depend on an input most memory systems never collect: what happened after the agent acted.

## The proposed architecture

Without outcomes there's no credit assignment, and without credit assignment, consolidation is just summarization. So outcomes sit at the centre of this design.

The architecture I'd advocate has three layers: an online loop that tracks outcomes, three memory stores, and a nightly consolidation job.

<figure>
  <a href="../../images/agent-memory-architecture.svg"><img src="../../images/agent-memory-architecture.svg" alt="Agent memory architecture. An online loop retrieves memories ranked by utility, acts while logging which memory IDs it retrieved, and tracks explicit, implicit and delayed outcomes into an append-only episodic log. A nightly consolidation job samples episodes by surprise and outcome, reflects on wins versus losses, validates lessons with held-out replay, then merges and decays, writing into semantic and procedural memory. Optional adapter distillation sits behind an eval gate." width="760" height="516" loading="lazy" /></a>
  <figcaption>The online loop writes every episode, with its outcome, to the log. Sleep reads the log and writes back into the stores the loop retrieves from.</figcaption>
</figure>

**The log is the source of truth.** Years on Tier-0 systems at DoorDash left me with one reflex: treat episodes as an append-only event log and everything else as a derived view. Change the consolidation logic and you rebuild semantic and procedural memory from the log. Delete a user's episode and every lesson derived from it is invalidated. When the agent does something odd, you can trace which experiences taught it.

**Every episode records which memories it retrieved.** That one field is what makes memory learnable. Pair it with outcomes: explicit (ratings), implicit (accepted as-is, heavily edited, question re-asked) and delayed (the PR merged, the tests passed, the email got a reply). Delayed signals are the most valuable and the most annoying, because you need a join on episode ID days later.

**Memories earn their rank.** Retrieval scores similarity, recency, importance and utility, where utility is each memory's track record. This is where my statistics instincts kick in: a memory retrieved before a success didn't necessarily cause it, and memories that fire on easy tasks will look brilliant. So treat utility as a causal estimate. Compare against similar tasks where the memory stayed in storage, and occasionally hold back a top-ranked memory on purpose. A little exploration buys an honest signal.

**Sleep runs four steps.** Sample episodes weighted by surprise and outcome, the same idea as [prioritized experience replay](https://arxiv.org/abs/1511.05952). Reflect by contrasting wins with losses, because failures alone teach timidity. Validate each candidate lesson by replaying held-out past tasks with and without it; if it doesn't help, it doesn't ship. Merge what survives, track supporting and contradicting evidence, and let weak memories fade. Lessons that stay useful graduate to procedural memory and, eventually, to an adapter behind an eval gate.

**Guard against the known failure modes.** Optimize for user approval and you build a sycophant. Let the agent validate its own lessons on the same data and you get confirmation bias. Learn from a single episode and you get superstition. Learn from web content and you get prompt injection with a long half-life.

## What it takes to build

None of this needs a new model. It needs an episode schema, an outcome join, a utility column and a nightly job with an eval gate. Plumbing.

It's also the difference between an agent with a good notebook and an agent with judgment.

If you're building agent memory, I'd like to compare notes, especially on delayed outcomes. That's where I think the real work is.

## Further reading

- Packer et al. (2023). [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560)
- Behrouz, Zhong & Mirrokni (2025). [Titans: Learning to Memorize at Test Time](https://arxiv.org/abs/2501.00663)
- Shinn et al. (2023). [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366)
- Wang et al. (2023). [Voyager: An Open-Ended Embodied Agent with Large Language Models](https://arxiv.org/abs/2305.16291)
- Lin et al. (2025). [Sleep-time Compute: Beyond Inference Scaling at Test-time](https://arxiv.org/abs/2504.13171)
- Snell, Klein & Zhong (2022). [Learning by Distilling Context](https://arxiv.org/abs/2209.15189)
- Kirkpatrick et al. (2017). [Overcoming catastrophic forgetting in neural networks](https://arxiv.org/abs/1612.00796)
- Lin et al. (2025). [Continual Learning via Sparse Memory Finetuning](https://arxiv.org/abs/2510.15103)

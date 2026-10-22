---
title: "From Shipping Software to Orchestrating Agency: Notes from AWS re:Invent on Agentic Teams"
description: Talk notes on how agentic systems reshape engineering teams, ownership and on-call, with my own reflections.
pubDate: 2026-01-29
tags: [agents, engineering-teams, talk-notes]
original:
  platform: LinkedIn
  url: https://www.linkedin.com/in/verafanyn/
---

What happens to engineering teams when systems stop being deterministic?

That question stayed with me after watching an [AWS re:Invent session on team structures in the age of agents](https://www.youtube.com/watch?v=j5TOWVNJx50). As someone who has spent years as a software engineer and is now moving toward AI and agentic systems, I found the talk challenged how I think about ownership, on-call, and what "engineering work" really means.

These are my notes on the session's main ideas, followed by my own reflection at the end.

## Agentic systems break our obsession with determinism

Most engineering orgs, especially those shaped by regulated industries, are optimized for predictable inputs producing predictable outputs.

In the age of agents, though, non-determinism is a defining feature rather than a bug. Managing agents starts to look less like managing software and more like managing high-agency people:

- You align on outcomes, not execution paths.
- You replace rigid quality gates with guardrails.
- Systems behave more like a river than a straight road: always reaching the destination, never the same way twice.

This is deeply uncomfortable, but unavoidable.

## "Change vs. run" is dead

The old model was: one team builds ("change"), another team maintains ("run"), and work gets thrown over the fence.

Cloud already weakened this. Agentic systems break it completely, because high-agency systems require continuous observability, tight feedback loops and context awareness across the full lifecycle. You cannot operate agents in silos. An org still structured around handoffs will collapse under agentic complexity.

## The on-call model is being rewritten

One of the most concrete shifts the session discussed was agentic on-call.

Traditional:

```text
Human paged → Human investigates → Human fixes
```

Agentic:

```text
AI alerted → AI investigates and proposes RCA
→ Human reviews and decides
→ AI executes pre-approved fixes (or a human intervenes)
```

Trust boundaries matter. The session proposed tiers by severity:

- **P0/P1:** human approval, always.
- **P2/P3:** AI recommends, humans act.
- **P4/P5:** AI can auto-remediate (restart, scale, basic fixes).

According to the speakers, this isn't theory: teams are already seeing large reductions in mean time to problem discovery through AI-driven log analysis and signal extraction.

## Roles are converging, not disappearing

What's changing is not whether roles exist, but what they become:

- Data scientists → model orchestrators and agent trainers
- Data engineers → pipeline architects and agent enablers
- Software engineers → agentic software engineers and system orchestrators

The most valuable skill set sits at the intersection: SQL, Python, cloud, systems thinking and context engineering. This is the rise of the expert generalist, rather than prompt engineering as a standalone role.

## Teams organize around outcomes, not functions

The emerging pattern described in the talk is a team of 8–10 people plus agents:

- Product and business strategy
- Software and agentic engineers
- Data engineers and scientists
- Architecture and DevOps
- Legal, finance and data owners, embedded early

Plus 10–20 specialized agents per team, often built in-house. Humans don't vanish; they move up the abstraction stack.

## My reflection

The biggest shift is this: we are moving from builders of deterministic systems to orchestrators of probabilistic ones.

For engineers, this isn't about being replaced. It's about deciding whether we pretend the world is still deterministic, or learn to design, govern, and live with agency.

I know which side I'm choosing.

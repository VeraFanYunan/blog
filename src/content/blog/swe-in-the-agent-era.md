---
title: "SWE in the Agent Era: From Code Writers to System Governors"
description: With agents writing code, generation stops being the bottleneck. Evaluation is, and the engineer's job moves to defining what correct means.
pubDate: 2026-03-19
tags: [agents, software-engineering, evaluation]
original:
  platform: LinkedIn
  url: https://www.linkedin.com/in/verafanyn/
---

Jensen Huang said something in his [GTC 2026 keynote](https://www.techradar.com/pro/this-is-as-big-of-a-deal-as-html-as-big-of-a-deal-as-linux-nvidia-nemoclaw-looks-to-make-openclaw-safer-and-more-effective-for-business-use) that I haven't been able to shake:

> Mac and Windows are the operating systems for the personal computer. OpenClaw is the operating system for personal AI.

Looking at how we're actually building with agents right now, this already feels true.

Something structural is shifting in software engineering. The work itself is moving up a level.

We've seen this pattern before. With Kubernetes, engineers stopped manually operating services and started defining desired states. Controllers handle reconciliation. The complexity didn't go away; it got reorganized.

Agents are doing the same thing to code. Instead of implementing logic directly, we now define constraints, design execution environments, build feedback loops, and let the system iterate. There's even a name for it: harness engineering.

## Generation is not the bottleneck. Evaluation is.

Here's what becomes obvious once you're in it. There is a structural asymmetry that feels a lot like the P vs NP intuition: generating a correct solution is hard, while verifying one is often easier.

That changes what matters. The engineer's role shifts toward defining what "correct" means, building evaluators, and shaping feedback loops, rather than producing the solution directly. The gap tells you where the leverage actually lives.

It's also where many agent failures come from: system gaps rather than model limitations. Agents fail because they are optimizing against incomplete or implicit signals. Architecture constraints aren't encoded, quality standards live in people's heads, and trade-offs are undocumented. If "good" isn't specified in a machine-readable way, the system has no way to converge there.

## Local loops close; system-level loops don't yet

We are not at full system-level autonomy. Current LLM-based systems can close local feedback loops pretty well: pass tests, fix bugs, make scoped changes. But they don't reliably close the loop at the level of system architecture, long-term evolution, and abstraction boundaries. That higher-order control is still ours.

None of this is completely new, either. CI/CD pipelines, test harnesses, linters, compilers: we've always built systems that regulate themselves. What's changed is the executor. It used to be a human. Now it's an agent, and iteration speed went from discrete to continuous.

What is new is the degree to which this pattern now applies to software creation itself.

## From code writer to system governor

If we take this seriously, the shift isn't about replacing engineers. It's about changing what engineering optimizes for: from writing code to designing systems that can generate and validate correct code. The role of the software engineer is moving from code writer to system governor.

And if AI really does become infrastructure, the core skill won't be implementation. It'll be defining the feedback loops the system runs on.

Curious how others are seeing this in practice. Is evaluation the new bottleneck in your work?

---
title: "DDIA Still Applies. Even to Agents."
description: I read DeepSeek's Super-Agent design and kept recognizing chapters of DDIA.
pubDate: 2026-11-06
tags: [agents, distributed-systems, system-design]
---

Reading about [DeepSeek's Super-Agent architecture](https://github.com/deepseek-ai/dsh-superagent-prototype) today, I had a strong sense of déjà vu. Most of its design choices are straight out of *Designing Data-Intensive Applications*, the book that taught a lot of us backend engineers to think in trade-offs.

The principles carry over. What changes is where the trade-offs land, because the workload is now an LLM.

## 1. Router–worker = control plane / data plane

A router dispatches tasks, and workers run in isolated contexts. In a normal system the router is cheap. Here it's often a model call, so its latency and its mistakes get added to every single task.

<figure>
  <img src="../../images/super-agent-router-worker.png" alt="Router–worker architecture. Triggers from GitHub, IM and CI flow into a router acting as the control plane, handling policy, dispatch and coordination. The router fans out to three workers, A for PR review, B for CI debugging and C for research, which run as isolated concurrent executions." width="615" height="474" loading="lazy" />
  <figcaption>Simplified view: the router coordinates, workers run in isolation. The original design also lets some events go straight to a worker.</figcaption>
</figure>

Isolated contexts keep workers focused, but each one has to be re-briefed, and that costs tokens. Let them share context instead, and you're right back to stale reads: two workers acting on different versions of the same repo.

## 2. Event-driven agents = pub/sub

Agents react to CI failures, PR comments and messages instead of waiting for prompts. That means you inherit everything that comes with pub/sub: at-least-once delivery, ordering and backpressure.

Running Tier-0 services at DoorDash taught me your handler will run twice, eventually. With agents it's worse. **A retry isn't a replay**, because the model may decide something different the second time.

And backpressure now has a price tag. When events arrive faster than inference can keep up, the queue grows, and so does the bill.

## 3. Fast / slow paths = hierarchical filtering

Rules handle the predictable cases, and the LLM gets the ambiguous ones. Underneath, this is a precision–recall trade-off.

Filter loosely and you pay for reasoning you didn't need. Filter aggressively and the events that actually needed reasoning get dropped. Silently, too, because nothing errors on a skipped event. That's the part that worries me most: you won't know until someone asks why the agent never responded.

## 4. Context management = memory hierarchy

This is the analogy I find most interesting, probably because I've been [thinking a lot about agent memory](https://verafanyunan.github.io/blog/posts/agent-memory-that-learns/) lately.

The context window is a cache. Keep the working set in, evict the rest, retrieve by reference. As with any cache, a hit costs something and a miss costs latency. Here, a hit costs tokens on every call, and a miss costs a retrieval round-trip plus the risk of fetching the wrong thing.

Summarization adds a failure mode caches don't have: the content itself drifts, and the agent keeps reasoning over it without knowing.

## Old problems, new worker

None of these problems are new. Distributed systems solved versions of them years ago, and honestly, that's reassuring. We're not starting from zero.

What's new is that the worker is probabilistic, expensive, and makes its own decisions. So the same trade-offs land in different places.

If your copy of DDIA is gathering dust, it's worth pulling it off the shelf and rereading it with agents in mind.

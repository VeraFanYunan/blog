---
title: "Scaling ML Systems: It's Not About the Model"
description: In production, scaling ML systems is less about changing the model and more about controlling how data and feedback flow through the system.
pubDate: 2026-03-26
tags: [ml-systems, data, feedback-loops]
original:
  platform: LinkedIn
  url: https://www.linkedin.com/in/verafanyn/
---

Over the past few months, working across self-supervised learning, retrieval pipelines, and agent workflows, I kept hitting the same wall. It took a few of these moments to realize:

In practice, scaling ML systems is less about changing the model, and more about improving how data flows through the system.

## ML systems are data systems with a model inside

At small scale, model-centric thinking works. A better model yields better results. That intuition is real. But as systems grow, the loop matters more than any single component in it:

```text
Data → Features → Model → Output → Feedback → Data
```

Most production failures live in that loop rather than in the model weights. Noisy inputs. Training-serving skew. Biased sampling. Delayed labels. Feedback signals that don't actually reflect what you're trying to optimize. A better model doesn't fix any of that. It processes bad signals more efficiently.

There's a diagram from Google's 2015 paper, [Hidden Technical Debt in Machine Learning Systems](https://proceedings.neurips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf), that has been circulating ever since: ML code as a tiny black box, dwarfed by the surrounding infrastructure. It went viral because everyone recognized their own system in it.

## The real scaling problem is entropy

Not in the strict information-theoretic sense, but in the engineering sense: uncertainty, inconsistency, noise. As systems grow, these compound. Distributions drift, pipelines go async, reward signals get noisier. Left unchecked, entropy propagates upstream and downstream.

The work of scaling ML systems is largely the work of controlling that entropy.

Which means the highest-leverage interventions usually aren't model changes. They're things like schema enforcement and data contracts, consistent preprocessing, controlled sampling, and evaluation loops that are actually reliable.

None of that touches model architecture.

## Once you see this pattern, it's everywhere

In self-supervised learning, the gains in [BYOL](https://arxiv.org/abs/2006.07733) and [SimCLR](https://arxiv.org/abs/2002.05709) come from how data is augmented and paired, not from model depth. In RAG, output quality is gated by retrieval, not generation. In agent systems, what determines success is the design of the evaluation loop, not how capable the underlying model is.

The model sets the ceiling. Data flow determines whether you ever get close to it.

## A reframe that's been useful

We say "ML is becoming software engineering." I think it's more precise to say ML is becoming systems engineering for learning systems.

And in those systems, the hardest problem isn't building the model. It's designing pipelines that can learn reliably in a noisy, evolving world, and knowing where the actual signal is.

If you're building at scale, the questions worth obsessing over aren't about architecture. They're about how data enters your system, how signals get constructed, and how feedback actually flows back in.

That's where the leverage is.

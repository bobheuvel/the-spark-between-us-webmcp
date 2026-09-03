# Devpost submission copy

## Project name

SPARK — Evidence Before Action

## Tagline

A shared evidence layer where humans and agents turn research into justified action.

## Inspiration

AI agents are becoming capable of researching a question and acting on their conclusions. Permission is necessary, but it is not sufficient: an agent can be fully authorized and still act on duplicated sources, a causal leap, or unresolved counterevidence. SPARK explores the missing layer between information and action.

## What it does

SPARK gives humans and browser agents one shared evidence workspace. The agent records claims, source metadata, provenance links, counterevidence, and insights through structured WebMCP tools. SPARK deterministically exposes evidence gaps and a confidence ceiling—an evidence posture, never a probability of truth. Before a consequential action, the agent calls `prepare_action`. If the evidence does not justify the stakes, the action is blocked with explicit reasons.

The demo begins with three sources claiming a 40% productivity increase. SPARK makes their dependency visible: all three ultimately cite one pilot, and that pilot measured response time rather than productivity. An independent quality audit also reports higher escalation rates. Three apparent sources collapse into one evidence lineage, and the proposed full replacement of a support team is blocked. The agent reframes the action as a bounded 90-day pilot; only then can a human approve it in the UI.

## Why WebMCP

Without WebMCP, an agent must scrape a visual research board and guess how claims, sources, and actions relate. SPARK exposes that epistemic structure directly. `get_workspace_state` gives the live shared context; mutation tools create typed claims and evidence; `link_source_lineage` records derivation; `get_evidence_gaps` returns deterministic findings; and `prepare_action` turns the evidence graph into an auditable decision boundary.

This is a collaboration that was difficult before: the agent does the cognitive labor of collecting, decomposing, and challenging evidence; SPARK preserves provenance and enforces the evidence discipline; the human owns values, acceptable uncertainty, and consequential approval.

There is deliberately no `approve_action` WebMCP tool. The agent cannot lower the standard or approve itself. It may call `execute_approved_action` only after a human uses the visible control.

## How we built it

SPARK is a React/TypeScript application using the WebMCP imperative API. It registers ten tools with strict bounded JSON Schemas, `additionalProperties: false`, read-only hints, untrusted-content hints, and abortable React lifecycle registration. A deterministic client-side analysis engine identifies missing evidence, single or correlated source lineages, causal leaps, unresolved counterevidence, unsupported forecasts, and weak recommendation foundations. The app requires no backend, model API, account, or API key and remains usable as a normal human interface when WebMCP is unavailable.

## What we learned

The most dangerous failure is often not false information but false confidence. Citation count is not evidence independence; an observed metric is not automatically the outcome named in a headline; and a promising result is not permission to scale an intervention beyond what was tested. WebMCP can carry more than commands—it can carry the reasoning structure humans need to judge an agent's proposed action.

## What's next

The next step is a portable evidence graph that can connect research across multiple WebMCP-enabled sites while preserving origin, consent, and uncertainty. Teams could define domain-specific evidence standards for journalism, public policy, medicine, procurement, and organizational decisions without turning SPARK into a centralized truth oracle.

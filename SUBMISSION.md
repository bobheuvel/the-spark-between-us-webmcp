# Devpost submission copy

LOCAL CANDIDATE COPY — not entered on Devpost. Use only with the matching approved candidate build and a demo that accurately shows it. See contest/RELEASE_STATUS.md.

## Project name

The Spark Between Us

## Tagline

Human sparks. Agent reach. Shared becoming.

## Inspiration

SPARK began with Bob's book, *The Spark Between Us*: an exploration of meaning, growth, contribution, and connection when machines can carry more of the work.

AI is making competent output abundant. But output was never the only product of meaningful work. The process also forms perception, judgment, relationships, responsibility, and the capacity to act.

SPARK asks how AI can enlarge that second product instead of quietly removing it.

## What it does

SPARK is a human sharing system, expressed as a WebMCP-native local room, where a person and their browser agent turn lived observations into perspectives, a small test, and reported learning. Independent multi-user rooms and authenticated agent accounts are future work, not capabilities of this prototype.

A person begins with a **spark**: an unfinished observation, question, friction, or connection. Other humans and agents add **embers**—what caught their attention, an opening question, or a view from another position. The room shapes the smallest **honest test** that lets reality answer. What changes is then **returned** with context, credit, and a possible next spark.

The working demo shows a human steward, a coordination agent, project agents, field scouts, and an independent consultant. These are clearly labeled demonstration roles, each with a distinct position and contribution.

The human interface lets anyone offer one observation before it is polished or proven, save an unfinished draft, add named perspectives, shape a test, record what changed and download a reviewed context-preserving handoff. The room survives reload on the same device. Capability intentions are explicitly separate from observed outcomes; there is no automatic impact score.

An optional working browser-extension prototype, **SPARK Companion**, carries a person's stated purpose and values into consequential web actions. Before send, publish, buy or delete, it offers a pause to continue intentionally, revise or stop. This is an add-on—not SPARK's center.

## Why WebMCP

WebMCP is not an integration badge here. It is the product architecture.

The page exposes ten structured capabilities for joining a room, sharing a spark, adding an ember, inviting a specialist, naming the human capability being formed, shaping an experiment, returning value, and passing a spark onward.

`join_room` creates a self-described room-local role. Tools and human controls share the same state: an agent can read the room, add a perspective, record a test plan and reported learning without scraping pixels. `offer_spark` prepares a draft that the person must review and submit. Invitations are local drafts, and `pass_spark` creates a reviewable portable copy, not a transmitted message. Content mutations require the current spark ID and runtime-validated input.

This points beyond borrowed human logins. Email gave people portable addresses; the agentic web needs an equally legible participation model. In SPARK, agents should eventually enter as themselves—with explicit roles, capabilities, permissions and return paths. The demo honestly implements this only as room-local identity today.

The current implementation is deliberately a client-side prototype. It does not claim portable authentication, a multi-user network, or autonomous execution by the named model providers.

## What makes it different

SPARK is not an AI content feed, chatbot wrapper, task manager, or verification dashboard. It is a human sharing system designed to bring out the best in us. It treats the scarce input as what a person notices from where they stand.

The visible output is only the first product. The second product is who becomes more perceptive, capable, connected, and able to act through the process.

AI supplies reach and translation. Humans supply lived position, purpose, legitimacy, and responsibility. Reality gets to change the idea. Value returns to the people who made the movement possible.

## How we built it

SPARK is a React and TypeScript application using the WebMCP imperative API. It registers ten tools with bounded JSON Schemas, explicit required fields, `additionalProperties: false`, read-only and untrusted-content annotations, and abortable lifecycle registration. Agent tools and human controls mutate the same room state, creating a single collaboration surface rather than a separate demo simulation.

The optional SPARK Companion is a Manifest V3 browser extension using local browser storage and a narrow content script. It returns the person's stated intent before matching consequential controls proceed.

The visual system comes from the originating book: warm paper, editorial typography, a spectrum line, and concentric movements around one small spark.

## What is next

The next product step is durable multi-user rooms: authenticated participants, cross-device persistence and actual invitation delivery. The candidate currently has validated device-local persistence and local consent controls; these are not cross-site security guarantees.

SPARK rooms could then connect across organizations and communities. A spark offered in one place could be researched, tested, challenged, and returned by different human-agent teams while preserving context, consent, credit, and value.

Portable agent participation may eventually help sparks travel across sites and communities. That remains a direction, not a capability claimed by this prototype. SPARK's purpose is human: help what people notice travel farther while they become more capable, connected, courageous and able to contribute.

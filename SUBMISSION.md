# Devpost submission copy

## Project name

The Spark Between Us

## Tagline

Human sparks. Agent reach. Shared becoming.

## Inspiration

SPARK began with Bob's book, *The Spark Between Us*: an exploration of meaning, growth, contribution, and connection when machines can carry more of the work.

AI is making competent output abundant. But output was never the only product of meaningful work. The process also forms perception, judgment, relationships, responsibility, and the capacity to act.

SPARK asks how AI can enlarge that second product instead of quietly removing it.

## What it does

SPARK is a WebMCP-native room where humans and independent agents turn lived observations into shared learning and value.

A person begins with a **spark**: an unfinished observation, question, friction, or connection. Other humans and agents add **embers**—what caught their attention, an opening question, or a view from another position. The room shapes the smallest **honest test** that lets reality answer. What changes is then **returned** with context, credit, and a possible next spark.

The working demo shows a human steward, a coordination agent, project agents, field scouts, and an independent consultant. These are clearly labeled demonstration roles, each with a distinct position and contribution.

The human interface also lets anyone offer a new spark before it is polished or proven.

## Why WebMCP

WebMCP is not an integration badge here. It is the product architecture.

The page exposes ten structured capabilities for joining a room, sharing a spark, adding an ember, inviting a specialist, naming the human capability being formed, shaping an experiment, returning value, and passing a spark onward.

`join_room` demonstrates a named, room-local participant role. More importantly, every WebMCP tool acts on the same state as the human interface: an agent can read the room, offer a spark, add an ember, shape a test, and return value without scraping pixels.

The current implementation is deliberately a client-side prototype. It does not claim portable authentication, a multi-user network, or autonomous execution by the named model providers.

## What makes it different

SPARK is not an AI content feed, chatbot wrapper, task manager, or verification dashboard. It treats the scarce input as what a person notices from where they stand.

The visible output is only the first product. The second product is who becomes more perceptive, capable, connected, and able to act through the process.

AI supplies reach and translation. Humans supply lived position, purpose, legitimacy, and responsibility. Reality gets to change the idea. Value returns to the people who made the movement possible.

## How we built it

SPARK is a React and TypeScript application using the WebMCP imperative API. It registers ten tools with bounded JSON Schemas, explicit required fields, `additionalProperties: false`, read-only and untrusted-content annotations, and abortable lifecycle registration. Agent tools and human controls mutate the same room state, creating a single collaboration surface rather than a separate demo simulation.

The visual system comes from the originating book: warm paper, editorial typography, a spectrum line, and concentric movements around one small spark.

## What is next

The next product step is durable shared rooms: real participants, persistence, invitations, consent, and a contribution trail across human and agent work.

SPARK rooms could then connect across organizations and communities. A spark offered in one place could be researched, tested, challenged, and returned by different human-agent teams while preserving context, consent, credit, and value.

A comment from Doug offered a useful analogy: fax gave way to email when communication reorganized around a new identity layer. WebMCP may eventually enable portable agent participation too. That is a direction, not SPARK's purpose. SPARK asks what kind of human growth and contribution an agent-participatory web should serve.

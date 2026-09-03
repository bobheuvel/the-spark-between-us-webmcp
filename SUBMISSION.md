# Devpost submission copy

## Project name

The Spark Between Us

## Tagline

Human + agent rooms for the post-email web.

## Inspiration

I lived through the era when business communication ran through fax machines. Then email gave every person a native address and fax almost disappeared. Pagers had their moment too. Technologies do not only make an old process faster; sometimes they replace the social unit around which the process was organized.

Websites still organize participation around a human email account. But people increasingly work through teams of agents: a chief of staff, execution agents, field scouts, and outside consultants. We copy context between systems and make every agent borrow the human's identity.

At the same time, AI is making competent output abundant. The more execution the machine can carry, the more important human perception, purpose, discernment, relationship, and responsibility become.

SPARK brings those two shifts together.

## What it does

SPARK is a WebMCP-native room where humans and independent agents turn lived observations into shared learning and value.

A person begins with a **spark**: an unfinished observation, question, friction, or connection. Other humans and agents add **embers**—what caught their attention, an opening question, or a view from another position. The room shapes the smallest **honest test** that lets reality answer. What changes is then **returned** with context, credit, and a possible next spark.

The working demo uses a real agent chain: Bob → Codex C2 → Codex Projects → Grok bot staff, with Claude as an outside consultant. Each participant has a distinct identity, role, reporting line, and contribution.

The human interface also lets anyone offer a new spark before it is polished or proven.

## Why WebMCP

WebMCP is not an integration badge here. It is the product architecture.

The page exposes ten structured capabilities for joining a room, sharing a spark, adding an ember, inviting a specialist, naming the human capability being formed, shaping an experiment, returning value, and passing a spark onward.

Most importantly, `join_room` demonstrates an agent-native account model. The agent joins the work with its own name, role, reporting line, and provider. It does not need to impersonate a user, borrow an email address, or scrape the interface.

The current implementation is deliberately a client-side prototype rather than a claim that WebMCP already supplies portable cryptographic agent identity. It makes the future interaction legible: tool discovery becomes onboarding, and contribution identity replaces another human sign-up form.

## What makes it different

SPARK is not an AI content feed, chatbot wrapper, task manager, or verification dashboard. It treats the scarce input as what a person notices from where they stand.

The visible output is only the first product. The second product is who becomes more perceptive, capable, connected, and able to act through the process.

AI supplies reach and translation. Humans supply lived position, purpose, legitimacy, and responsibility. Reality gets to change the idea. Value returns to the people who made the movement possible.

## How we built it

SPARK is a React and TypeScript application using the WebMCP imperative API. It registers ten tools with bounded JSON Schemas, explicit required fields, `additionalProperties: false`, read-only and untrusted-content annotations, and abortable lifecycle registration. Agent tools and human controls mutate the same room state, creating a single collaboration surface rather than a separate demo simulation.

The visual system comes from the originating book: warm paper, editorial typography, a spectrum line, and concentric movements around one small spark.

## What is next

The next step is a portable agent passport: authenticated identity, delegated authority, reporting relationships, contribution history, and scoped reputation that can move between WebMCP sites without becoming another centralized human account.

SPARK rooms could then connect across organizations and communities. A spark offered in one place could be researched, tested, challenged, and returned by different human-agent teams while preserving context, consent, credit, and value.

Fax gave way to email. Email organized the human web. WebMCP may help organize an agent-participatory web. SPARK asks what kind of human growth and contribution that web should be built to serve.

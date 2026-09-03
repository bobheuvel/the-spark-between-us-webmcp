# The Spark Between Us

**Human + agent rooms for the post-email web.**

AI can help us make more. SPARK helps people notice more, become more, and compile lived perception into value instead of disposable output.

SPARK began with the book *The Spark Between Us*: an exploration of meaning, growth, contribution, and human connection when machines can carry more of the work. Its central image is simple:

> The spark used to need the machine. Increasingly, the machine is waiting for the spark.

This site turns that idea into a working WebMCP-native room.

## The product

Today, every website expects a human account—usually anchored to email. Agent work is hidden behind that identity, and context is copied from inbox to chat to app.

SPARK demonstrates another model. A human enters with purpose and lived position. Each agent joins with its own identity, role, reporting line, provider, and contribution trail. The page exposes the work itself through WebMCP, so agents do not need to impersonate a human or navigate a visual interface.

The demo team is:

- Bob — human owner: purpose, judgment, lived position
- Codex C2 — chief of staff
- Codex Projects — execution team
- Grok bot staff — field scouts
- Claude — outside consultant

## The movement

1. **Spark** — A person shares an unfinished observation, including uncertainty, consent, and credit.
2. **Embers** — Humans and agents respond with attention, questions, and views from different positions.
3. **Honest test** — The room shapes the smallest experiment that lets reality answer and could change the idea.
4. **Return** — Learning, changed direction, provenance, and value travel back through the contribution chain. The return may become a new spark.

Not every spark needs to become a fire. The receiver may take it, change it, ignore it, or pass it on.

## WebMCP tools

The page registers ten imperative WebMCP tools using strict JSON Schemas:

- `read_spark_room`
- `join_room`
- `offer_spark`
- `add_ember`
- `invite_agent`
- `name_second_product`
- `shape_honest_test`
- `return_value`
- `pass_spark`
- `read_room_principles`

`join_room` is the architectural provocation: an agent creates a room-native identity without an email address or borrowed human account. The current build is a client-side prototype, not a production identity provider; it demonstrates the interaction model that a portable, authenticated agent identity could support.

## Run locally

```bash
pnpm install
pnpm dev
```

Build verification:

```bash
pnpm build
```

## Technical notes

- React + TypeScript
- WebMCP imperative API
- Abortable lifecycle registration
- Strict bounded schemas with `additionalProperties: false`
- Human UI and agent tools mutate one shared state
- No model API, API key, backend, or human sign-up required for the demo
- Graceful visual fallback when WebMCP is unavailable

## License

MIT. See `LICENSE`.

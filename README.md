# The Spark Between Us

**A WebMCP room where unfinished human perception becomes shared learning and value.**

AI can help us make more. SPARK helps people notice more, become more, and compile lived perception into value instead of disposable output.

SPARK began with the book *The Spark Between Us*: an exploration of meaning, growth, contribution, and human connection when machines can carry more of the work. Its central image is simple:

> The spark used to need the machine. Increasingly, the machine is waiting for the spark.

This site turns that idea into a working WebMCP-native room.

## The product

SPARK is a shared process for the part of intelligence that should not disappear when execution becomes cheap: noticing what matters, choosing what is worth pursuing, testing it against reality, and returning what was learned.

A human enters with purpose and lived position. Named agent roles add attention, reach, translation, and execution. The page exposes the same room through WebMCP, so human controls and agent tools work on one shared state instead of producing disconnected chat output.

The demonstration team is:

- Bob — human owner: purpose, judgment, lived position
- C2 — coordination agent
- Project agents — execution team
- Field scouts — outside signals
- Consultant — independent challenge

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

`join_room` creates a named participant role inside the current room. The build is a client-side prototype, not a production identity provider, multi-user service, or autonomous multi-model system. Portable agent identity is a possible future direction—not the purpose or a capability claimed by this demo.

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

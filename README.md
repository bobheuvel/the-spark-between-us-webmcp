# The Spark Between Us

**A human sharing system where unfinished perception becomes shared learning, capability and value.**

AI can help us make more. SPARK helps people notice more, become more, and compile lived perception into value instead of disposable output.

SPARK began with the book *The Spark Between Us*: an exploration of meaning, growth, contribution, and human connection when machines can carry more of the work. Its central image is simple:

> The spark used to need the machine. Increasingly, the machine is waiting for the spark.

This site turns that idea into a working WebMCP-native **local room**. It is not a multi-user service. Human controls and a browser agent collaborate in the same page; portable JSON copies can be reviewed and carried elsewhere by a person.

## The product

SPARK is a human sharing system for bringing out the best in us. It gives the part of intelligence that should not disappear when execution becomes cheap—a person's attention, lived position, courage, judgment and contribution—somewhere to travel.

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

## Optional SPARK Companion

`extension/` contains a working Manifest V3 browser-extension prototype. It stores a person's purpose and values locally, then pauses before selected consequential web actions such as send, publish, buy or delete. The person can continue intentionally, revise, or stop.

The Companion is an optional add-on, not SPARK's center. SPARK's purpose remains human sharing and shared becoming.

## WebMCP tools

The page registers ten imperative WebMCP tools using bounded JSON Schemas and runtime validation:

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

Important tool semantics:

- `offer_spark` prepares a draft for human review; it cannot replace the active spark or overwrite a saved draft.
- Content-write tools require `expectedSparkId` from `read_spark_room`, rejecting stale writes.
- `invite_agent` prepares a local invitation, never contacts an outside agent.
- `shape_honest_test` records a plan; no experiment is performed automatically.
- `return_value` records reported learning, not verified impact, and sends no message.
- `pass_spark` opens a full portable snapshot for review. Only a human click downloads it; no transmission is performed.
- Sharing boundaries and attribution are statements, not authenticated ownership or cross-site security. A user with page control can alter local data.

## Try the complete human journey

1. Share one observation. Name and extra context are optional; an unfinished draft survives closing the composer and reload.
2. Add a perspective with a name; optionally cite a source. Earlier perspectives remain available in Keep the context.
3. Take it to reality: describe one test, contact with reality, a result that would change your mind, a boundary and a steward.
4. After actually trying it, Return what changed. Do not treat sample or QA text as a real result. Capability change may remain unassessed.
5. Review a portable copy, inspect its contents and download it if appropriate. Sharing elsewhere is your separate action.

The starting observation and five roles are examples. No named agent provider is invoked by this app. State is stored in localStorage on this origin; use one tab, and do not rely on it as a secure vault or backup. Cross-device sync and automatic import of exported files are not implemented. Corrupt saved data is left untouched with an error; export current work before clearing site data. Withdrawal removes local spark/derived content and legacy room/draft storage, but cannot recall downloaded or shared copies.

The direction matters: an agent should not need to borrow a human login and impersonate its owner. SPARK makes the near-term interaction model visible now—named roles, explicit capabilities, boundaries, reporting lines and return paths—while treating durable independent agent accounts across sites as the next infrastructure layer.

## Run locally

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Build verification:

```bash
pnpm build
node --test contest/TEST_EVIDENCE/room.test.mjs
pnpm exec tsc --noEmit --incremental false
```

## Technical notes

- React + TypeScript
- WebMCP imperative API
- Abortable lifecycle registration
- Strict bounded schemas with `additionalProperties: false`
- Human UI and agent tools mutate one shared state
- No model API, API key, backend, or human sign-up required for the demo
- Graceful visual fallback when WebMCP is unavailable
- Optional local-first browser companion for intent-before-action prompts

## Campaign evidence and release

`contest/ROUND_LEDGER.json` and `contest/ITERATION_REPORT.md` preserve ten sequential local implementation milestones. `contest/TEST_EVIDENCE` contains actual test/build logs and browser workflows, with unverified paths explicitly marked. See `contest/RELEASE_STATUS.md` before associating this branch with a public site or video. The public baseline and this local candidate are different until an approved release occurs.

## License

MIT. See `LICENSE`.

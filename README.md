# SPARK — Evidence Before Action

**A shared truth-seeking layer for humans and agents.**

SPARK is an agent-native evidence workspace built for the 2026 OpenAI WebMCP Challenge. It gives a browser agent structured tools to record claims, evidence, source provenance, counterevidence, insights, and proposed actions. A deterministic evidence gate then limits how much confidence can flow from that research into consequential action.

> Agents don't only need permission before acting. They need evidence before certainty.

SPARK is not a fact checker or truth oracle. It makes the structure beneath a conclusion inspectable:

`claim → evidence → provenance → inference → uncertainty → insight → action`

## The demo

A company sees three sources claiming a 40% support-productivity gain. SPARK reveals that all three trace back to one pilot which measured response time, not productivity. An independent audit reports an 18% increase in escalations. The agent's full-replacement proposal is blocked; a bounded 90-day pilot becomes ready for a human decision.

The memorable reveal is **3 citations → 1 original evidence lineage**. More citations did not mean more independent evidence.

## What makes it WebMCP-native

The application registers ten imperative WebMCP tools with `document.modelContext.registerTool()`:

| Tool | Role |
| --- | --- |
| `get_workspace_state` | Read the inquiry, evidence graph, gaps, insight, and action state |
| `create_inquiry` | Establish question, intended decision, stakes, and mode |
| `add_claim` | Record factual, causal, forecast, recommendation, opinion, or value claims |
| `add_evidence` | Attach candidate evidence with source type, stance, and directness |
| `link_source_lineage` | Show when one source derives from another |
| `add_counterevidence` | Deliberately retain disconfirming evidence |
| `get_evidence_gaps` | Run deterministic evidence-posture checks |
| `record_insight` | Separate observation, inference, uncertainty, and learning |
| `prepare_action` | Gate a proposed action against the evidence posture |
| `execute_approved_action` | Execute a simulated action only after human approval |

There is intentionally **no `approve_action` tool**. The human approval button exists only in the visible UI. An agent calling `execute_approved_action` too early receives `HUMAN_APPROVAL_REQUIRED`.

All tool inputs use bounded JSON Schemas with `additionalProperties: false`, enum constraints where practical, and WebMCP read-only/untrusted-content annotations. WebMCP is progressive enhancement: the full human interface continues to work in browsers without `document.modelContext`.

## Run locally

Requirements: Node.js 22.13+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. For local WebMCP testing, use a supported browser with WebMCP enabled.

Production build:

```bash
pnpm build
pnpm start
```

No backend, model API, API key, external data source, or account is required. The research scenario uses clearly fictional `example.test` fixtures so judging is deterministic.

## Judge flow

1. Open the app and expand **WebMCP connected** to inspect the ten-tool surface.
2. Notice the 3→1 lineage and the distinction between response time and productivity.
3. In ACT mode, read why the full-replacement action is blocked.
4. Click **Propose bounded pilot**.
5. Click the human-only **Human: approve pilot** control.
6. Click **Agent: execute approved action** and inspect the activity trail.
7. Switch to LEARN mode to see observation, inference, and transferable insight separated.

## Architecture

- Vinext / React / TypeScript
- Imperative WebMCP API
- Deterministic in-browser evidence analysis
- Local browser persistence
- Cloudflare Worker-compatible Sites output
- No AI API: the visiting browser agent is already the intelligence

## License

MIT — see [LICENSE](LICENSE).

# Actual WebMCP verification — R07

2026-09-04 ~08:17 Amsterdam, Codex in-app browser, localhost:3000. Used browser `webmcp.fetchTools()` and tool handle calls, not a mocked registry or page-evaluate substitute.

Discovery: all ten names, schemas and annotations returned. Content-write tools require expectedSparkId; read tools marked readOnlyHint. Names self-described, not authenticated.

| Tool | Actual result and read-back |
|---|---|
| read_spark_room | Returned current room JSON, spark-01 |
| read_room_principles | Returned five human-growth principles |
| join_room | JOINED, UUID 00624148-df62-4a62-aa5a-8129f1f8c5fe; QA agent rendered in UI with reporting line Bob |
| add_ember | EMBER_ADDED; named question and example.org source in shared room |
| invite_agent | INVITATION_DRAFTED_NOT_SENT; local question stored, no external message |
| name_second_product | SECOND_PRODUCT_NAMED; UI showed Practise listening before proposing solutions |
| shape_honest_test | HONEST_TEST_SHAPED; UI question, test, contact, boundary and steward matched supplied synthetic fields |
| return_value | VALUE_RETURNED; UI showed explicit QA simulation and no proven-impact wording |
| pass_spark | HANDOFF_DRAFT_NOT_SENT; inherited human consent and credit, reviewRequired true |
| offer_spark | DRAFT_READY_FOR_HUMAN_REVIEW; composer displayed draft; immediate read-back preserved existing spark, embers, test and return |

Negative calls: add_ember with old-spark returned STALE_SPARK, stateUnchanged true. javascript: source returned ERROR before mutation. Subsequent read showed exactly the two intended embers; no rejected additions. Per-tool negative coverage still pending beyond these two calls; unit coverage is not browser coverage.

UI modal focus moved into draft. Results are synthetic QA data, not claims of a real participant study. Human approval controls are app-level boundaries, not protection against a same-origin script or an agent with unrestricted computer control.

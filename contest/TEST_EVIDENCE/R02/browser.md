# R01/R02 browser verification

2026-09-04, Codex in-app browser, local http://localhost:3000, tab 4.

1. Share a spark opened composer; only I noticed required, optional context collapsed.
2. Entered synthetic text: `QA: people need time to finish a thought.`
3. Closed composer, reloaded page, reopened composer.
4. AX state showed exact draft text restored.
5. Offered it without name/context. Room showed author You, exact observation, default unfinished uncertainty and credit You.

PASS: actual UI draft/reload and single-field contribution. WebMCP notification lists ten tools, but invocation not tested at this checkpoint. Existing room persistence remains a separate defect to fix.

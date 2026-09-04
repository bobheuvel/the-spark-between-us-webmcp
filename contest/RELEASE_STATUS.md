# SPARK release status

As of 2026-09-04 ~08:48 Europe/Amsterdam. Candidate is local only; no final contest submission has been made by this task.

## Three different states

| State | Evidence |
|---|---|
| Published baseline | Source 0eab53e8203de38ea232709614650a6c9c03eff5. Sites deployment appgdep_6a99f10080648191b08a80acddc17bdd read-only verified succeeded, completion 2026-09-03T22:17:26.906493Z. https://spark-evidence-before-action.bobiaan.chatgpt.site |
| Local candidate | Branch campaign/spark-ten-rounds. R01–R10 commits and source hashes retained. Latest exact source hashes in TEST_EVIDENCE/release-2026-09-04T06-45-22-430Z/result.json; all four checks passed. That elevated run could not resolve git on its PATH, so parentRevision is blank; independently checked parent was 3ab4dfe60f14310a57468945216ff2e0c52ed38c. Not pushed or deployed. |
| Submitted entry | NOT VERIFIED / no submission observed. Last Devpost page showed registration success and empty project list. Bob must create/fill/submit the actual entry and retain confirmation. |

Public repository: https://github.com/bobheuvel/the-spark-between-us-webmcp . No campaign push performed.
Existing public video: https://youtu.be/2IwWWUBe5_s . Previous verification: 2:56.61, public. This campaign did not rewatch or replace it. It predates the candidate's new controls. Do not claim it demonstrates those new controls; use the candidate script to record a truthful matching demo if releasing this candidate.

## Candidate validation

- Ten real sequential code rounds, each with tests/build rerun and exact hashes: ROUND_LEDGER.json.
- Release regression: 20 unit tests, TypeScript, scoped lint and production build PASS in release-2026-09-04T06-45-22-430Z, including final CSS-only receipt layout fix. The 06-44 rerun retained a build-output EPERM failure while preview held the output; preview was stopped before the successful approved retry.
- Actual in-app browser: all ten WebMCP tools discovered/invoked; all ten reject unknown fields; stale ID and unsafe source rejected. Valid changed tools retested as documented in R10/browser.md.
- Human spark → ember → test → return form flow PASS using synthetic records and keyboard activation.
- Draft and complete-room reload PASS; completed-stage keyboard revisiting PASS; modal focus/Escape/focus return PASS; 390x844 layout inspected.
- Clean frozen-lockfile installation and build from archive 3ab4dfe PASS after approved dependency-access retry. Initial offline-cache failure retained, with precise follow-up in TEST_EVIDENCE/clean-install-1788503525943/followup.md. Later source refinements use unchanged dependencies and separate release checks.
- Final production runtime: all ten actual tools accepted valid calls; duplicate draft overwrite rejected; visible data-URI handoff decoded and matched original credit, consent and learning trail. See TEST_EVIDENCE/production-final.md. Not a claim that the public deployment contains these changes.
- Browser destructive withdrawal, denied storage, full screen-reader/Tab-only audit, 200% text-only enlargement and separate Chrome compatibility: NOT VERIFIED. Domain tests cover withdrawal/legacy cleanup and corrupt storage. These are not security certifications.

## Scope and rights

- Root MIT LICENSE present. All 35 direct installed dependency manifests read: 30 MIT, 2 Apache-2.0, 1 ISC, 2 MIT OR Apache-2.0. Exact package versions/licenses retained in release dependency-licenses.json.
- This is metadata evidence, not full transitive license clearance. Complete transitive notice review before claiming full legal compliance.
- No package or lockfile changes, new model service, paid integration, secret, external message or new image asset introduced during the campaign.
- Existing og.png, favicon.svg, video-cards.html and Companion zip hashes retained in release evidence. Existing image/book/music/video rights were NOT independently established in this campaign. Bob must verify ownership/permission and final video third-party content.
- Extension code and sibling projects untouched. Optional Companion remains separately owned; no claims about its new validation made here.

## Contest checklist and freeze

Organizer [extension notice](https://openai.com/webmcp-challenge/) explicitly says September 4 at 1am Pacific after a 12-hour outage extension: **10:00 Amsterdam / 08:00 UTC**. Devpost header agrees; older prose in [rules](https://webmcp.devpost.com/rules) and FAQ retains the prior deadline. Use the explicit organizer extension; recheck immediately before submission.

Required final checks for Bob:

1. Confirm personal eligibility, ownership and any declarations. Registration alone is not entry submission.
2. Approve a specific public candidate release, or deliberately submit the earlier baseline. Match public source, app, text and video; never imply local-only work is deployed.
3. Ensure live link works without access restrictions, public repository contains license/source/run instructions, and public YouTube demo is under three minutes with audible explanation and accurate working flow.
4. Complete any CAPTCHA personally; review final entry and submit. Save the project URL and final confirmation.
5. Freeze the exact submitted revision/site/video at final submission and certainly by deadline. Do not modify a submitted repo/site after the deadline. Maintain judge access through judging.

Multiple entries are allowed only if unique and substantially different, at organizer discretion. Do not duplicate SPARK under another title or assume a Companion add-on automatically qualifies separately.

Competitiveness: stronger interaction than the baseline, with demonstrated WebMCP value. Major limitation is no actual multi-user network. Winner/top-ten claims are not justified by these checks. See COMPETITOR_COMPARISON.md.

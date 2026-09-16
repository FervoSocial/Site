# Post-Founder Review Phase 0 — reconciliation and verification

Date: 16 September 2026. Status: Phase 0 approved by the Product Owner with the classification correction below. Documentation-only commit and branch push authorised after successful checks; implementation, merge and deployment remain unauthorised. The original verification observations below record the pre-commit review snapshot.

## Baseline and evidence

- Remote: `FervoSocial/Site`, fetched `phase2/source-of-truth` at the expected `ae16985f32b939c591372f141ffa9ff8493b7890`; initial tree clean.
- Local review branch: `post-founder-review/phase0-reconcile`, unchanged HEAD at that baseline.
- Isolated checkout: `/private/tmp/fervo-reconcile-20260916`. The existing preview workspace was not a Git checkout; it was not used as the authoritative editing baseline.
- Both supplied attachments were readable. The instruction text defines this pass; [the handover](07_POST_FOUNDER_REVIEW_HANDOVER_2026-09-16.md) is a later explicit decision delta, not a replacement source pack.
- The handover transcription matches the extracted DOCX text after line-separator normalisation and trimming surrounding whitespace; no substantive wording was changed.
- The already-authenticated local `/home` preview was inspected without modifying credentials, sessions or application behaviour. It runs from the older local workspace, not this reconciliation checkout. Directory comparison found matching `app`, `components` and `lib` source files, except extra local `.DS_Store` files and an `_sites-preview` directory; it is corroborating visual evidence, not proof of identical environments or a complete browser audit.

## Explicit supersessions

- Permanent five-item navigation → icon-led Home/Feed, Create, Clubs & Events, Messages, public Profile, and Health/Safety/Advice destinations. Explore is not permanent navigation; Search/results remain possible.
- Required large For You / Local-Your Area / Following tabs → one Feed with Public, Nearby/Distance and Friends views. Friends-of-Friends is an audience permission, not a feed view.
- Professionals as an initial launch surface → architecture retained, public launch deferred until owner reactivation.
- Profile opening account management → public-facing member profile, with secondary owner settings.
- Any interpretation of Reels-style wording as a separate launch product → ordinary text/picture/short-video posts; responsive mobile web, no required native app.
- Initials-only presentation is not the desired default where member images exist. Identity/category rings remain distinct from other indicators.
- Static gold imagery alone does not fulfil the new subtle-flame-motion requirement. Accessible restrained motion is a future implementation task.

The Feed heading “Descubra no seu ritmo” is marked for removal from the main Feed, not an instruction to remove the landing-page tagline. Member STI dates, medical-test uploads and health-status trust claims are excluded. Existing history is retained with supersession notices rather than rewritten as if the new decisions had always applied.

## Retained decisions

Individual verified accounts with linked shared profiles; separate private/legal and public pseudonymous identities; adult verification; approximate location and anti-triangulation concerns; consent-based messaging/media; revocable media permissions; safety not paywalled; shared profile architecture; Brazilian Portuguese; dark/purple/gold identity; current v1.3 commercial configuration and non-conflicting founding rules; legal/provider launch gates; and outstanding production/security/data work all remain in force. Commercial JSON, prices and runtime configuration are unchanged.

## Implementation drift — verified source, not completed target

| Area | Existing implementation and evidence | Approved target / outstanding work |
| --- | --- | --- |
| Navigation | `components/navigation/AppShell.tsx`: Home, Explore, Create, Messages, Profile; Profile links `/me` | Revised destinations; Search instead of permanent Explore; public Profile |
| Home | `components/feed/FeedShell.tsx`, `lib/i18n.ts`: three old tabs, mock filtering, old heading | One Feed with three revised selectable views; no fourth Friends-of-Friends view |
| Create/Search | AppShell Create opens informational sheet; header search has no working search action | Ordinary post composer and discovery tools remain future implementation |
| Explore | `components/discovery/ExploreShell.tsx`: four category routes and fixture results | Existing routes remain untouched; new navigation/search treatment not implemented |
| Clubs/events | `components/profile/OrganisationProfile.tsx`, `lib/club-event-placeholder.ts`, event route: shared demo profiles/event | Dedicated launch discovery/feed surface not yet built |
| Professionals | Professional shell, `/explore/professionals`, `luiza-educadora` demo and registration choice remain exposed | Launch deferral is documented, not yet enforced by UI/code |
| Profile/account | `/me` displays account data/logout/billing; `/profile/:handle` renders fixtures, not the current member’s editable public profile | Public member Profile and secondary settings remain separate future work |
| Safety | `/safety` and `/help` are public placeholders | Dedicated Health/Safety/Advice editorial destination not implemented |
| Images/rings | Feed/profile initials and abstract placeholders; card-type colour variants | Real available profile images and separate identity/category ring and badge model not implemented |
| Gold/motion | `app/globals.css`: static gold-smoke raster; hero entrance/transitions exist. Ambient glow has a reduced-motion-gated drift rule but `.ambient-glow` is `display: none` | Actual subtle golden-flame movement is absent; retain reduced-motion support in later work |
| Permissions | Current foundations do not complete linked-profile/Friends/Friends-of-Friends audience rules | Retained production/privacy/data work remains open |
| Billing | `lib/billing-placeholder.ts` imports historical v1.1 fixture | v1.3 remains documentation authority; runtime migration needs separate approval |

Demo-link mismatch: feed handles such as `clube-aurora`, `espaco-horizonte` and `marina-luz` are not recognised organisation/professional fixtures and fall back to a private-member example. Recognised organisation fixtures include `espaco-aurora`, `casa-livre`, `ponto-violeta`, `coletivo-lume`; professional fixture is `luiza-educadora`. The event route currently renders the same example regardless of identifier. Recorded, not fixed.

## Remaining decisions

No unresolved contradiction blocks this documentation reconciliation. The following remain **DECISION REQUIRED**, not implementation assumptions:

- Final Portuguese view labels, navigation arrangement on small screens, destination URLs and search/results treatment.
- Ring taxonomy/colours, badge count/priority and proposed chilli Save/Hot/Favourite meaning; unspecified “move” interaction details.
- Exact Friends/Friends-of-Friends consent/audience/backend semantics; ranking is not defined by these UI decisions.
- Clubs/events promotional products, entitlements and final commercial surface details.
- Future professional filter semantics and the anchor for any retained professional launch-window offer require confirmation only if the phase is reactivated; do not infer them from initial launch. Legal/provider approval remains a separate launch gate.
- Outstanding provider, security, retention, permission and launch-gate decisions remain as recorded in the retained source pack.

Professionals are **DEFERRED / OWNER REACTIVATION REQUIRED**, not a normal unresolved `DECISION REQUIRED`. The area must remain out of launch scope until the Product Owner explicitly reactivates that phase. Its architectural retention and future open details do not authorise launch inclusion.

## Approved immediate sequence

Post-Founder Phase 0 verification/reconciliation → 1 low-risk visuals/motion → 2 navigation and one-Feed/multiple-view shell → 3 Clubs & Events → 4 public Profile/secondary account settings → 5 privacy/data alignment. Professionals deferred. This numbering is distinct from the long-term production roadmap and marks none of its outstanding phases complete.

## Validation and scope boundary

- `git diff --check`: passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: passed all 15 tests and its prerequisite production build. Vinext reports its existing static route-classification limitation; build succeeds.
- These tests verify the existing implementation, including the older five-navigation/three-tab contracts; passing does not mean the revised target is implemented.
- Dependencies installed from the committed lockfile using `npm ci --ignore-scripts --no-audit --no-fund` solely for checks; manifests and lockfile unchanged.
- No JSON changed; commercial configuration preserved. No application, schema, migration, dependency, hosting, environment, database or preview data included in the changes.
- Build/test output remains local and ignored. Final changes consist only of the Markdown reconciliation and two new Markdown documents. Nothing staged or committed.

Owner approval now authorises the documentation checkpoint only, subject to passing pre-commit checks. Earlier “pending owner review” wording in the baseline/status narrative records the original review snapshot; this approval supersedes that status, not any outstanding implementation gate. A separate approval is still required for any implementation.

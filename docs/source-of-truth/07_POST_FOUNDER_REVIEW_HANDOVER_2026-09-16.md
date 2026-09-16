# Product Owner handover — 16 September 2026

> Faithful text transcription of `Fervo_Social_Post_Founder_Review_Codex_Handover_2026-09-16.docx`. Original wording and order are retained below; table cells appear on consecutive lines. This is the approved decision delta, not a replacement for non-conflicting source-pack decisions. Implementation remains subject to a separately approved pass.

FERVO SOCIAL
Post-Founder Website Review
& Codex Handover
Updated product direction after founder website validation
Date
16 September 2026
Status
Current approved handover for product/UI implementation planning
Use
Add to project Sources and provide to the “Fervo-Social > CODEX stru…” chat
Authority
Supersedes older Fervo decisions only where this document explicitly says so; all other Stage 2 / source-of-truth decisions remain in force.

Core instruction
Do not treat this handover as permission to redesign or rebuild the entire product at once. Convert the approved changes into controlled implementation phases, verify each phase in the authenticated preview, and preserve existing security/authentication controls.

1. Purpose and authority
This document records the founder decisions made after reviewing the existing Fervo Social website/preview and clarifying the checklist comments. It is intended to give the implementation/Codex chat an updated, concise product position before generating technical prompts.
Source basis: the reconstructed Fervo Social project state, the founder website checklist, and the clarifications agreed immediately after that review. This document is a delta/update to the wider project source of truth, not a replacement for the complete migration synthesis.
Decision rule
Where this document explicitly marks an item as “superseded”, use the new position. Where it is silent, retain the existing Fervo Social source-of-truth decision. Do not fill gaps by assumption.

2. Updated launch product position
The launch product should be focused on verified adult social discovery and community, not on building every possible future feature. The current launch direction is:
Individually verified adult accounts as the identity foundation.
Linked relationship/shared profiles (for example couples, trios or other linked configurations) built from verified individual accounts.
One primary social Feed with selectable views/filters.
Post creation for text, images and short video; posts remain linked to the author profile/feed.
Private messaging with the previously agreed safety/permission model.
Rich public-facing member profiles, with settings/account controls separated from the public profile experience.
Dedicated Clubs & Events discovery/feed surface.
Health / Safety / Advice information area.
Responsive website/mobile-web first. No native application required for initial launch.
Deferred from initial public launch: professional profiles/area, Reels as a separate product, native apps, and other previously deferred advanced features.
3. Navigation: approved revision
The previous permanent five-item navigation rule is superseded by this founder review. The product should use a cleaner icon-led navigation model, with desktop labels available on hover where appropriate.
Destination
Purpose
Launch status
Home / Feed
Main social feed; selectable Public, Nearby/Distance and Friends views.
Launch
Create
Create a normal Fervo post containing text, pictures and/or short video.
Launch
Clubs & Events
Filtered/discovery feed for club and event content, with search, highlights and future paid placement.
Launch
Messages
Private messaging using familiar social/messaging conventions.
Launch
Profile
Public-facing member profile. Account/settings are secondary controls inside/behind Profile.
Launch
Health / Safety / Advice
Static/editorial guidance area updated from time to time; source for official Fervo safety/education posts.
Launch
Professionals
Dedicated professional discovery surface. Keep architecture/roadmap, but do not expose at launch.
Deferred

Explore: remove as a permanent navigation destination. Search remains available through a search control and can lead to dedicated result pages.
Fale Conosco: do not use as a major permanent sidebar destination. Place it in static-page/footer/help areas and other sensible support entry points.
4. Home / Feed model
There is one Feed. The visible “views” are filters applied to that Feed, not separate social products.
Working view
Meaning
Status
Public
Public posts selected/ordered according to relevance and the user’s preferences.
Approved concept
Nearby / Distance
Same Feed filtered to the user’s chosen geographic scope. Exact final Portuguese label remains open.
Approved concept
Friends
Same Feed filtered to social connections and the audience permissions of other members.
Approved concept

Friends of Friends is not a fourth Feed view. It is an audience/privacy permission. A member can decide whether content/profile visibility extends to friends of friends. The Friends view can surface eligible content according to those permissions.
Superseded: the old visible three-tab treatment “Para você / Perto de você / Seguindo” as the required UI. The new design should use a cleaner control for switching Feed views rather than permanently displaying three large tabs.
5. Create and media: no Reels at launch
Create should follow familiar mainstream social-media creation patterns so users do not need to learn a novel composer.
A Fervo post can contain text, pictures and/or short video.
Regardless of media type, the content is a post linked to the author’s profile/feed.
Do not create a separate Reels product at launch.
A future immersive media-viewing mode may be explored later, but it is not part of the current implementation scope.
Cost/scope reason
Avoiding a separate Reels system reduces media-processing, ranking, moderation, storage/bandwidth and UX complexity while still allowing short video inside ordinary posts.

6. Dynamic feel and golden-flame movement
The website currently feels too static. The founder explicitly wants more visual dynamism. This is an approved design requirement, not an optional polish item.
Add subtle movement/animation to the golden flame motif so the brand feels alive rather than static.
Use lightweight motion and micro-interactions where they improve responsiveness and perceived quality (for example hover/focus transitions and gentle state changes).
Do not make the experience visually noisy or animation-heavy. Motion should support the product, not compete with profiles/content.
Prefer lightweight CSS/SVG-style animation or similarly efficient implementation where suitable; avoid introducing heavy video/animation assets merely to create movement.
Respect reduced-motion/accessibility preferences when implementing animation.
Main-page copy: remove “Descubra no seu ritmo” from the main feed view unless a later design review explicitly restores it.
7. Profile imagery, rings and quick status signals
Replace generic initials in profile circles with the member’s profile image wherever an image is available.
Make the profile image/ring treatment larger and more visually prominent, closer to familiar Instagram-style profile presentation.
Ring colour represents a defined identity/account category signal only; it must not simultaneously encode gender identity, orientation, relationship composition and membership plan.
Use separate badges/chips/status indicators for composition, intention, activity, availability or commercial/sponsored state.
The exact visual form of badges/chips is not locked. Avoid overloading the profile image with too many simultaneous bubbles.
Information requirement: Fervo should communicate profile composition, intention/availability, activity state and commercial/sponsored state quickly, without forcing the user to open every profile.
8. Interaction icons and cleaner UI
Do not permanently write obvious labels such as “Like” beside universally recognised interaction icons unless usability testing shows they are needed.
Explore a small red chilli-pepper icon as a distinctive Fervo visual for Save/Hot/Favourite behaviour. The exact final icon/function naming still needs design validation.
Move/report actions should be visually secondary rather than competing with primary engagement actions.
Desktop sidebar should be clean and icon-led; labels may appear on hover/tooltips.
Mobile uses responsive website/mobile-web presentation; no native app is required for this phase.
9. Public profile vs account/settings
The Profile destination should open the member’s public-facing profile experience, not a settings dashboard. Account administration belongs behind a secondary settings/account control.
Public-facing profile may include optional member-supplied information
Display name (real name is not required publicly).
Biography / About.
Age and other permitted profile basics.
Optional body/physical information the member chooses to disclose.
Height, smoking/drinking preferences, zodiac sign and similar optional social information.
Sexual orientation/preferences and relationship/lifestyle information.
Interests, expectations and what the member is looking for.
Languages spoken and education level.
Health claims are explicitly dropped from the member profile. Do not add STI-test dates, uploaded medical tests, “clean” status or other user-entered medical claims as profile trust signals.
Secondary account/settings area should contain: verification, privacy, security, billing/plan controls (where applicable), account settings and other owner-only administration.
10. Clubs & Events
Clubs & Events are a launch surface and should have their own dedicated discovery/feed destination. Conceptually, this is a filtered and controllable view of Fervo content rather than a completely separate social network.
Show club and event posts/content.
Provide search and relevant filters.
Support highlighted/promoted placements and time-limited visibility products when commercially enabled.
Allow Fervo to control advertising/promotion inventory without overwhelming the general member Feed.
Keep club/event profile, event detail and related information accessible from this surface.
11. Professionals: architecture retained, launch deferred
Current decision
Professional profiles/area remain part of the Fervo Social roadmap but are NOT part of the initial public launch. This resolves the earlier project contradiction about day-one professional activation.

Reasoning recorded by the founder: initial concern about cost, and more importantly the risk that early users, partners or investors could misread Fervo as primarily an escort/service marketplace rather than an adults-only social/community platform.
When the professional area is activated later, retain these product principles:
A professional profile derives from an individually verified adult identity/account; do not create a separate unverified identity system.
The area should function as social/professional discovery, not as Fervo-operated booking or transaction infrastructure.
Fervo should not initially process service payments, set service prices, assign clients, take commissions, or operate as the intermediary for the underlying service.
Discovery/filter language should focus carefully on identity, interests/preferences and permitted self-description rather than Fervo publishing a structured catalogue of sexual services.
Users may write their own biography/self-description subject to Fervo Terms, Content Rules, applicable law and moderation policies. Do not assume Terms alone eliminate platform obligations.
The founder’s future concept may combine gallery-style profile results with ordinary feed posts and advertising/highlight inventory, but this requires a later dedicated design/legal review before implementation.
Implementation instruction now: do not add the Professionals icon/page to the launch navigation and do not spend launch budget building the full professional surface unless the Product Owner explicitly reactivates it.
12. Health / Safety / Advice
Create a clear static/editorial destination for safer meetings, safer sex, consent, encounter safety, where to seek help, and related guidance.
The content can be updated periodically and can act as the source material for official Fervo Social educational posts.
Keep educational guidance separate from individual member health-status claims.
Fale Conosco/support access should be easy to find from this area and other appropriate help/account locations.
13. Messaging
The existing messaging direction remains valid. The founder did not identify a need for a novel messaging pattern. Use familiar social-media / Messenger / WhatsApp-like interaction conventions while preserving Fervo’s existing text-first introduction, consent and media-permission safety rules.
14. What is explicitly superseded or removed
Previous/ambiguous position
Current position
Permanent five-item Home / Explore / Create / Messages / Profile rule
Superseded by the revised icon-led navigation in this handover.
Explore as permanent top-level destination
Removed. Search remains available through search controls/results pages.
Professional profiles potentially at launch
Resolved: deferred from initial public launch; architecture retained for later.
Separate Reels-style product at launch
Not included. Short video is allowed inside ordinary posts.
Member health/STI testing fields or claims
Dropped. Health education stays in Health / Safety / Advice.
Initials as primary profile-orb content
Use profile image wherever available.
Large always-visible feed tabs as required UI
Use a cleaner view-switch control for Feed filtering.
15. Items intentionally not locked by this review
Do not silently invent these during implementation. They need later design/product/legal decisions or technical validation:
Final Portuguese names for Public / Nearby-Distance / Friends views.
Exact identity-ring colour taxonomy and accessibility treatment.
Exact badge/chip visual language and maximum number visible at once.
Exact function/name of the chilli-pepper interaction icon.
Final ranking logic for Public and Nearby/Distance views.
Detailed friends-of-friends privacy/data rules and edge cases.
Full backend permissions/data model changes needed to support the revised UI.
Professional discovery/filter semantics, moderation and legal treatment before the professional area is activated.
Final paid advertising/highlight products for Clubs & Events.
16. Recommended Codex implementation sequence
Use small, reviewable phases. Do not combine visual polish, navigation restructuring, backend privacy work and deferred professional features into one large change.
Phase 0 - Verify current state - Confirm the active repository/branch, current source-of-truth files, build/test status and authenticated preview. Do not bypass auth/verification. Do not change code if the target state cannot be verified.
Phase 1 - Low-risk visual/dynamic improvements - Remove “Descubra no seu ritmo”; add subtle golden-flame motion; improve micro-interactions; replace initials with profile images where available; enlarge ring/profile presentation; simplify obvious icon labels; add hover labels/tooltips where appropriate.
Phase 2 - Navigation and Feed view shell - Implement the revised top-level navigation and one-Feed/multiple-view UI. Remove permanent Explore destination. Keep final labels configurable/provisional if necessary.
Phase 3 - Clubs & Events surface - Build/refine the dedicated filtered discovery/feed surface using existing club/event data/shells before inventing new backend systems.
Phase 4 - Profile experience - Rework Profile toward a rich public-facing member profile; move owner-only settings/account controls behind a secondary settings area. Do not add health-status claims.
Phase 5 - Privacy/data alignment - Implement or plan the backend/data changes required for Friends / Friends-of-Friends audience permissions and other functionality that cannot be safely represented as UI-only state.
Deferred - Professionals - Do not implement the full professional area now. Preserve architecture/notes for a later, separately approved phase.
17. Codex working rules for these changes
Before editing, inspect the current source-of-truth documents and current code. Report any contradiction between this handover and newer explicit project decisions instead of choosing silently.
Keep implementation changes narrowly scoped to the approved phase.
Do not introduce a native app, Reels system, professional marketplace, service-payment flow, health-status feature or other deferred capability as “helpful” extra work.
Do not weaken authentication, age-verification, route protection, privacy, moderation or media-safety controls to make the preview easier.
Preserve existing backend functionality unless the approved change explicitly requires modification.
For each phase, run the repository’s normal validation checks (for example typecheck, lint, build/tests where applicable) and report results.
Provide a concise change summary, files changed, any new assumptions, screenshots/preview route guidance, and a list of unresolved issues after each phase.
Stop and ask for Product Owner approval before moving from one materially different phase to the next.
18. Definition of success for the next website review
The website feels visibly more alive and responsive, including subtle movement in the golden flame brand element.
The Home experience is cleaner and clearly communicates that Public, Nearby/Distance and Friends are views of one Feed.
Navigation is simpler despite the addition of Clubs & Events and Health/Safety; there is no redundant permanent Explore destination.
Posts remain normal profile-linked posts; the UI does not imply a separate Reels product.
Profile presentation is more image-led, richer and closer to familiar social/dating interaction patterns without copying another product literally.
The launch build does not expose the deferred professional area.
No health-status claims are added to member profiles.
Founder can review changes in an authenticated preview without bypassing real route/auth flows.
19. Handover note for the implementation chat
Use this document first
In the “Fervo-Social > CODEX stru…” chat, treat this handover as the current founder-approved delta after the website review. Reconcile it with the existing source of truth, then generate one Codex prompt at a time for the recommended implementation sequence. Do not send Codex a single all-in-one rewrite prompt.

End of handover - 16 September 2026

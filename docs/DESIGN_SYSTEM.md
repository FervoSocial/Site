# Design system

## Visual direction

The [16 September founder delta](source-of-truth/07_POST_FOUNDER_REVIEW_HANDOVER_2026-09-16.md) supplies the approved targets. Post-Founder Phase 1 implemented restrained authenticated-background movement, interaction feedback, larger existing avatar/ring treatments and accessible interaction labels. Post-Founder Phase 2 now implements the revised icon-led launch navigation and lighter one-Feed view switch, pending Product Owner review. The future image/ring taxonomy, additional badge design and chilli-pepper concept remain unimplemented.

### Phase 2 navigation and Feed shell

- Desktop uses a narrow six-destination icon rail. Clubs & Events uses an original heart-and-tail community symbol, and Messages uses an original speaking-and-listening profile symbol. Every destination retains an accessible name and a visual label on hover or keyboard focus; no destination depends on hover for activation.
- Mobile retains five generous bottom controls: Home, Clubs & Events, Create, Messages and More. The accessible More sheet contains Profile, Health/Safety/Advice and Search instead of forcing six crowded bottom-bar destinations. Mobile navigation remains **PROVISIONAL / PRODUCT OWNER REVIEW PENDING**.
- Search remains in the desktop/tablet header and in the mobile More sheet. It reuses `/explore/profiles`; Explore is no longer permanent navigation.
- The Home masthead uses the Fervo Social wordmark followed by initials-based friend activity orbits. A solid purple ring and restrained neon glow indicate recent demo activity; initials remain the safe fallback until approved profile images exist.
- The one Feed uses three consistently sized icon-only view controls for the provisional concepts `Público`, `Distância` and `Amigos`. People, radar and friend-pair icons replace the previous segmented text control while retaining accessible names, focus/hover tooltips, a shape-based selected marker and explicit keyboard focus ring. The icons remain visible on touch devices without depending on hover. These are local demo filters, not separate feeds, real ranking or real geolocation.
- `/clubs-events` is one vertical mixed discovery surface. Existing Club and Event fixtures are interleaved, with textual type chips plus distinct restrained accents and direct links to the existing Club profile and Event detail demonstrations. It does not add filtering, promotion, ranking or backend behaviour.
- Professionals are absent from launch navigation, Feed fixtures and discovery category shortcuts. Existing direct demonstration routes remain dormant implementation evidence.
- Profile still points to `/me` until the separately approved Phase 4 can connect the signed-in member to a real public-facing profile without using a misleading fictional identity.

### Phase 1 visual implementation

- Authenticated `AppShell` keeps the existing gold-smoke asset unchanged and presents it through two fixed, clipped layers. A 48-second primary wave and softer 64-second counter-wave follow closed paths with gentle, opposing horizontal/vertical swell. Only transform and very small opacity changes animate, while all content remains stationary. The secondary layer is masked toward the outer atmosphere so it does not cloud the reading area. The treatment carries no prominent header control.
- Reduced-motion preference keeps the original background static, removes the counter-flow layer and removes the added interaction transitions. No video, new image or animation dependency is used.
- Interaction colour/border feedback takes 150–180ms; no delayed actions, moving click targets or animated page layouts. Existing navigation and feed tabs are retained.
- Feed avatars are 64px desktop/56px small-screen (previously 48/44); discovery circles 92px (previously 72); message avatars 56px (previously 48). Profile-header borders are more prominent, and mobile profile circles grow to a maximum 280px. Existing colours and separate account/status labels are retained, not a final category taxonomy.
- The image-replacement objective is **partially implemented**: no suitable approved profile-photo asset exists in the current fixture set. Initials/abstract backgrounds remain safe fallbacks; no portrait was invented or fetched.
- Feed actions retain accessible names and pressed states. Like/Save keep their existing focus/hover tooltips; Comment, Message and Report now use clear icon-only presentation with explicit accessible labels and explanatory `title` text while remaining disabled demonstrations. Search/notification header buttons retain equivalent labels without gaining new functionality.
- Home replaces the old HOME heading and introductory sentence with the Fervo Social wordmark and recent-activity orbit row. Small-screen wordmark and orbit spacing is tightened without changing hierarchy or mobile navigation. No realistic member portraits were invented; landing copy is unchanged.

Fervo Social uses a calm, modern social-platform aesthetic:

- Very dark matte background
- Soft white text
- Purple/lilac as the primary brand and interaction colour
- Gold as a secondary atmospheric and emphasis colour
- Restrained glow, generous space, and rounded surfaces

Gold must not replace purple for primary calls to action or make the product resemble a black-and-gold luxury campaign. The stronger gold smoke composition belongs primarily to the landing hero; application pages reuse the atmosphere more quietly.

## Current tokens

The canonical implementation lives in `:root` in `app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#0B0B12` | Base application background |
| `--surface` | `#151522` | Standard dark surface |
| `--surface-raised` | `#1E1E2E` | Raised cards and sheets |
| `--surface-soft` | `#11111A` | Deep secondary surface |
| `--purple` | `#8B5CF6` | Primary brand and action colour |
| `--purple-bright` | `#A855F7` | Purple gradients and highlights |
| `--neon-dark-violet` | `#9400D3` | Neon glow accent |
| `--gold` | `#D4AF37` | Secondary gold accent |
| `--gold-light` | `#F2C14E` | Gold edge light and micro-detail |
| `--text` | `#F5F3FF` | Primary soft-white text |
| `--muted` | `#A9A3B5` | Secondary text |
| `--success` | `#34D399` | Success state |
| `--warning` | `#F59E0B` | Warning state |
| `--error` | `#EF4444` | Error state |
| `--focus` | `#C4B5FD` | Keyboard focus outline |

Current corner radii are 12, 20, and 28 pixels. Primary actions and compact status chips use pill shapes.

## Backgrounds

The approved gold-smoke asset is `public/fervo-gold-smoke-v2.png`.

- Landing page: matte black with prominent glossy gold smoke around the outside and a clean dark centre behind the logo.
- Application shell: the same asset under stronger dark radial and linear overlays so content remains calm and readable.
- Cards: opaque dark gradients. Gold may appear as a one-pixel edge light, subtle glow, or small detail.

Do not introduce grain, noisy particles, symmetrical gold halos, or product-ad compositions.

## Typography

The application uses Geist through `next/font/google`, with Arial/Helvetica fallbacks.

- Headlines: bold, tightly tracked, compact line height.
- Body text: soft white or muted lavender-grey with generous line height.
- Eyebrows: small uppercase text with wide tracking.
- Labels: accessible names remain required. Recognisable interaction icons need not have permanent visible labels unless usability testing requires them; desktop navigation may use hover labels.

## Actions

- Primary buttons use a purple-to-bright-purple gradient, rounded pill shape, white text, and a soft violet glow.
- Secondary actions use a dark translucent fill and restrained border.
- Gold is reserved for atmospheric highlights, location details, dividers, tiny status points, or an occasional card edge light.
- Disabled placeholder actions remain visible with reduced opacity and a non-interactive cursor.
- Active states include text changes such as `Seguindo` or `Guardado`; colour is supplemental.

## Cards and surfaces

- Use the shared dark surface language rather than pure black boxes.
- Borders should usually be low-contrast soft white or lilac.
- Prefer one soft shadow and one subtle inset highlight.
- Cards may carry a short gold line along the top edge, but the card identity should remain predominantly purple/dark.
- Account-type and verification meaning must be expressed in text as well as colour.

## Glow rules

- Purple glow is part of the core brand and may appear on the logo, primary actions, selected navigation, and profile/media placeholders.
- Gold glow is secondary and should remain local to background atmosphere or small highlights.
- Avoid stacking multiple strong glows on ordinary controls.
- Focus outlines must remain distinct from decorative glow.

## Responsive behavior

- Design mobile first, with a 360-pixel-wide device as a minimum target.
- At 820 pixels and below, navigation becomes a fixed five-control bottom bar with an accessible More sheet for the remaining launch destinations and Search.
- Dense action rows may reflow; meaningful accessible labels remain required.
- Touch targets should stay close to or above 44 pixels.
- Use `100svh` and safe-area insets where full-height or fixed mobile navigation is involved.

## Accessibility expectations

- Keep semantic landmarks, headings, lists, forms, tabs, and dialog roles.
- Every icon-only visual has an accessible text label.
- Use `aria-current`, `aria-selected`, `aria-pressed`, and `disabled` where state requires them.
- Keyboard focus uses a visible two-pixel lavender outline.
- Never communicate gender, orientation, profile class, verification, or availability through colour alone.

# Design system

## Visual direction

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
- Labels: always remain readable at mobile sizes; do not rely on icon-only controls.

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
- At 820 pixels and below, the desktop navigation becomes a fixed five-item bottom bar and the header simplifies.
- Dense action rows may reflow into smaller grids; labels must remain visible.
- Touch targets should stay close to or above 44 pixels.
- Use `100svh` and safe-area insets where full-height or fixed mobile navigation is involved.

## Accessibility expectations

- Keep semantic landmarks, headings, lists, forms, tabs, and dialog roles.
- Every icon-only visual has an accessible text label.
- Use `aria-current`, `aria-selected`, `aria-pressed`, and `disabled` where state requires them.
- Keyboard focus uses a visible two-pixel lavender outline.
- Never communicate gender, orientation, profile class, verification, or availability through colour alone.

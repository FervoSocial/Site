# Fervo Social app icon system

The Fervo Social website wordmark remains unchanged. These assets are only for installed web-app/PWA identity and a future app-state treatment.

## Approved states

- **Online / active:** `public/icons/fervo-chilli-flame-*.png` — the primary web-app icon.
- **Offline / inactive:** `public/icons/fervo-chilli-smoke-*.png` — reserved for a future state-specific app icon.

Both supplied source images are preserved as `*-master.png`. The 180, 192, and 512 pixel PNGs retain transparency and use a 22% transparent safe area around the supplied artwork to avoid harsh clipping under common rounded-square and circular masks.

## Current integration

`public/manifest.webmanifest` identifies the app as **Fervo Social** and uses the flame icon at 192 and 512 pixels. The root layout supplies the same primary icon and a 180 pixel Apple touch icon.

Dynamic online/offline icon switching is **not currently implemented**. It requires a separately approved app-state/service-worker design; the smoke assets are intentionally stored but not selected by the manifest.

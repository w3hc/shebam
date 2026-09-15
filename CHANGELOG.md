# Changelog

## Unreleased

### Added

- HTTP security headers and Content-Security-Policy in `next.config.ts` (previously missing entirely), scoped to this app's own origins (Optimism RPC, w3pk endpoints, `unpkg.com` for build verification) while keeping the `nfc=*` permission needed by the NFC tap-to-pay page
- `templateVersion` field in `package.json`, tracking sync status against the genji template
- `hasLocalCredentials()`, `hasPersistentSession()`, and `setPersistentSessionDuration()` on the W3PK context
- `docs/LEGAL.md` and `docs/ROADMAP.md`
- Terms of service link in the header menu

### Changed

- Synced chassis code with genji template v3.1.1: CI workflow (template-version check, format check), lint config, dependency bumps (chakra, next, w3pk, eslint, etc.)
- Login flow in `Header.tsx` now checks `hasLocalCredentials()` before prompting, with a safe fallback to the registration modal on any unexpected error
- Settings page's session-duration slider now updates the live w3pk instance directly via `setPersistentSessionDuration()`, instead of forcing a logout/login round-trip

### Removed

- AI-powered security inspection feature (settings page UI and the underlying `w3pk` `inspect`/`inspectNow` wiring), disabled to match the genji template

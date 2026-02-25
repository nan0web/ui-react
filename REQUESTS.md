# Requests

## ~~Problem: `workspace:*` dependencies break isolated install~~

**Target**: `package.json`
**Status**: ✅ DONE (v1.1.0)
**Date**: 2026-02-13

Resolved: all `workspace:*` replaced with concrete versions.

---

## ~~useSortableList — React Hook for Sortable Lists~~

**Target**: `src/hooks/useSortableList.js`
**Status**: ✅ DONE (v1.1.0)
**Date**: 2026-02-16

Implemented with `localStorage` persistence and `onChange` callback.

---

## ~~Universal Documentation Blocks (Phase 8 MVP)~~

**Target**: `src/Blocks/*`
**Status**: ✅ DONE (v1.1.0)
**Date**: 2026-02-22

Implemented: Nav, Sidebar, Alert, Markdown, ThemeToggle, LangSelect, CodeBlock, Page.
Exported from `src/Blocks/index.js`.

---

## Extraction: I-Bank Components

**Target**: `src/components/*`
**Status**: NEW
**Date**: 2026-02-25

**Problem**:
General-purpose components currently living inside `ibank.ua` should be extracted to `@nan0web/ui-react`.

**Required Components**:

- `GDPRConsent`: Headless cookie consent logic
- `FeedbackForm`: Core form submission with validation
- `NewsPost`: Generic article/post template

**Exclusions (Proprietary)**: Calculators, Banking Lists, Order Forms remain in `ibank.ua`.

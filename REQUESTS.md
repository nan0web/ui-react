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

## ~~Extraction: I-Bank Components~~

**Target**: `src/components/*`
**Status**: ✅ DONE
**Date**: 2026-02-25

**Problem**:
General-purpose components currently living inside `ibank.ua` should be extracted to `@nan0web/ui-react`.

**Required Components**:

- `GDPRConsent`: Headless cookie consent logic
- `FeedbackForm`: Core form submission with validation
- `NewsPost`: Generic article/post template

**Exclusions (Proprietary)**: Calculators, Banking Lists, Order Forms remain in `ibank.ua`.

---

## ~~🚨 Відключення логування через Proxy (Від credits)~~

**Target**: `src/context/UIContextValue.jsx`
**Status**: ✅ DONE
**Date**: 2026-03-10

**Problem**:
Функція перекладу `t`, яка рекурсивно передається в усі компоненти, обгорнута у `#proxy`, що призводить до тисяч викликів `console.debug()` при кожному рендері інтерфейсу. Просимо ввести окремий `dev-debug` прапорець у конфігурації для `UIContextValue` (або взагалі прибрати proxy для `t`), замість примусового логування, щоб інтерфейс працював оптимально і консоль залишалась чистою.

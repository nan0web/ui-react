# next.md — @nan0web/ui-react

> Версія: **1.1.0**
> Оновлено: 2026-02-25

## ✅ Виконано у v1.1.0

- **Видалено `react-bootstrap`** — нуль UI залежностей, чистий HTML + Bootstrap CSS
- **Dot-notation** — `Alert.warning.lg` → `<Alert className="warning lg" />`
- **Universal Blocks** — Nav, Sidebar, Alert, Markdown, ThemeToggle, LangSelect, Page
- **Header** переписаний на нативний HTML (−97 kB)
- **`useSortableList`** hook із `localStorage` persistence
- **Autocomplete** та **TreeView** компоненти + рендерери
- **ProvenDocs README** — 45 тестів, dual YAML/JSX приклади
- **Playground** — єдиний каталог OLMUI
- **Українська документація** (`docs/uk/README.md`)
- **CHANGELOG.md**

## 🔜 Наступні кроки (v1.2.0)

### 1. Компоненти з I-Bank (Extraction)

- `GDPRConsent`: Headless logic для cookie consent
- `FeedbackForm`: Core form submission з валідацією
- `NewsPost`: Generic article/post template

### 2. Sandbox розширення

- Props Editor для інтерактивної демонстрації
- Додати Forms, Modals, Cards приклади

### 3. Spec System (довготермінове)

- `src/specs/core/Spec.js` — базовий клас з `from()` + `toJson()`
- Build-time витягування метаданих з JSDoc
- Автоматична валідація enum/boolean/number типів

## 📋 Pre-publish Checklist

1. ✅ Тести проходять (`npm run test:jsx` + `npm run test:docs`)
2. ✅ `react-bootstrap` видалено
3. ✅ `workspace:*` замінено на конкретні версії
4. ✅ CHANGELOG.md оновлено
5. ⬜ `npm publish`

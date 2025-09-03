# NaN•Web UI React

User interface components for React with the extensible application.

## Data

The data source is present in three ways:
1. `@nan0web/db` with the rendered json files for browser SSG version with `@nan0web/db-browser` for reading the data
1. protected data is covered with authorization `@nan0web/auth-core`, `@nan0web/auth-server`, `@nan0web/auth-browser`.

## Auth

### Forms
1. Registration with confirmation when enabled.
1. Reset and confirm password.
1. Sign in (default provider is email)
1. 2fa sign in when enabled
1. Sign in with a provider
1. Sign out
1. Delete account

# Системна інструкція переносу компонентів у @nan0web/ui-react

Коли ми працюємо з архітектурою NaN•Web, кожен компонент повинен дотримуватись базових принципів агностичності, типізації та доведеної роботи. Ця інструкція покаже, як правильно переносити компоненти, моделі та функціонал з інших проєктів (наприклад `usarch.org/certificates` і `nan.web/packages/verse`) у бібліотеку `@nan0web/ui-react`.

---

## ✅ Перенос із `usarch.org/certificates/src/Model`

Дані моделі повинні бути перенесені у форматі типізованих JS класів. Також створено спеціальні сценарії `*.test.js`, що покривають всі функції моделі:

### Перенос основної моделі Certificate
```js
// ui-react/src/models/Certificate.js
class Certificate {
  /** @type {string} */
  id
  /** @type {Date} */
  date
  /** @type {string} */
  img
  /** @type {CertificateConfig} */
  config
  /** @type {CertificateOwner} */
  owner
  /** @type {Lesson} */
  lesson

  /**
   * @param {object} props
   * @param {string} props.id
   * @param {Date} props.date
   * @param {string} props.img
   * @param {CertificateConfig} props.config
   * @param {CertificateOwner} props.owner
   * @param {Lesson} props.lesson
   */
  constructor(props = {}) {
    const {
      id,
      date,
      img,
      owner,
      lesson,
      config,
    } = props
    this.id = id
    this.date = date
    this.img = img
    this.owner = CertificateOwner.from(owner)
    this.lesson = Lesson.from(lesson)
    this.config = CertificateConfig.from(config)
    if (!this.date && this.lesson) {
      this.date = this.lesson.date
    }
  }
  
  toString() {
    return [
      this.owner,
      this.lesson,
    ].join("\n")
  }
  
  static from(props = {}) {
    if (props instanceof Certificate) return props
    return new Certificate(props)
  }
}

export default Certificate
```

### Перенос допоміжних моделей
Всі допоміжні моделі (`CertificateConfig`, `CertificateFields`, `ThumbOptions`, `TextColumns`, `TextOptions`) переносяться аналогічно, дотримуючись правила:
1. Всі властивості мають типізовані коментарі JSDoc.
1. Усі конструктори створюють екземпляр ініціалізуючи властивості з вхідних даних.
1. У кожного класу є `static from()` метод для створення екземпляра.

---

## ✨ Перенос із `nan.web/packages/verse/src/Human`

### Модель Contact
```js
// ui-react/src/models/Contact.js
class Contact {
  static ADDRESS = "address:"
  static EMAIL = "mailto:"
  static TELEPHONE = "tel:"
  static WEBSITE = "https://"

  /** @type {string} */
  type
  /** @type {string} */
  value

  /**
   * @param {object | string} props
   * @param {string} [props.type=Contact.ADDRESS]
   * @param {string} [props.value=""]
   */
  constructor(props = {}) {
    if ("string" === typeof props) {
      props = Contact.parse(props)
    }
    const {
      type = Contact.ADDRESS,
      value = "",
    } = props
    this.type = String(type)
    this.value = String(value)
  }
  
  toString() {
    return this.type + this.value
  }

  /**
   * @param {string} input
   * @returns {Contact}
   */
  static parse(input) {
    const props = String(input)
    let value = props
    let type = Object.values(Contact).find(str => props.startsWith(str))
    
    if (type) {
      value = props.slice(type.length)
    } else {
      if (/^[a-z0-9\._\-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(props)) {
        type = Contact.EMAIL
      } else if (/^[\+\-\(\)\s\d]{6,}$/.test(props)) {
        type = Contact.TELEPHONE
      } else if (/^https?:\/\//.test(props)) {
        type = Contact.WEBSITE
      } else {
        type = Contact.ADDRESS
      }
    }
    return new Contact({ type, value })
  }

  static from(props) {
    if (props instanceof Contact) return props
    return new this(props)
  }
}

export default Contact
```

### Модель Gender
```js
// ui-react/src/models/Gender.js
import namesMen from "./names.men.js"
import namesWomen from "./names.women.js"
import Name from "./Name.js"

class Gender {
  /** @type {number} */
  value

  /**
   * @param {number | boolean} input
   */
  constructor(input) {
    this.value = -1
    if ("number" === typeof input) {
      this.value = input < 0 ? -1 : input > 0 ? 1 : 0
    }
    if ("boolean" === typeof input) {
      this.value = Number(input)
    }
  }

  toString() {
    return this.value === 1 ? "men's gender" : 
           this.value === 0 ? "women's gender" : 
           "unknown gender"
  }

  toNumber() {
    return this.value
  }

  /**
   * @param {string | Name} str
   * @returns {Gender}
   */
  static parse(str) {
    const name = str instanceof Name ? str : Name.parse(str)
    
    if ("1" === str) return new Gender(1)
    if ("0" === str) return new Gender(0)
    if (["-1", "-", ""].includes(str)) return new Gender(-1)

    for (let word of name.value) {
      const [cleanName] = word.split("(")
      const variants = [
        cleanName,
        cleanName.slice(0, 1).toLocaleUpperCase() + cleanName.slice(1),
        cleanName.slice(0, 1).toLocaleUpperCase() + cleanName.slice(1).toLocaleLowerCase(),
      ]
      
      for (const variant of variants) {
        if (namesMen.includes(variant)) return new Gender(1)
        if (namesWomen.includes(variant)) return new Gender(0)
      }
    }
    return new Gender(-1)
  }

  static from(input) {
    if (input instanceof Gender) return input
    if ("string" === typeof input) return this.parse(input)
    return new Gender(input)
  }
}

export default Gender
```

### Модель Name
```js
// ui-react/src/models/Name.js
import names from "./names.js"

const aliasMap = new Map(names)
const namesList = [...namesMen, ...namesWomen]

function findAlias(word, variants) {
  for (const variant of variants) {
    if (aliasMap.has(variant)) {
      return `${variant}(${aliasMap.get(variant)})`
    }
    for (const [name, aliases] of aliasMap) {
      if (aliases.includes(variant)) {
        return `${name}(${variant})`
      }
    }
  }
  return word
}

class Name {
  /** @type {string[]} */
  value

  /**
   * @param {string[]} input
   */
  constructor(input) {
    this.value = input
  }

  toString() {
    return this.value.join(" ")
  }

  /**
   * @param {string} str
   * @returns {Name}
   */
  static parse(str) {
    const words = String(str).replace(/\s+/g, " ").split(" ")
    const output = []
    
    for (let word of words) {
      if (word.includes("(")) {
        output.push(word)
        continue
      }
      
      const variants = [
        word,
        word.slice(0, 1).toLocaleUpperCase() + word.slice(1),
        word.slice(0, 1).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase(),
      ]
      
      output.push(findAlias(word, variants))
    }
    
    output.sort((a, b) => -namesList.indexOf(a) + namesList.indexOf(b))
    return new Name(output)
  }

  static from(input) {
    if (input instanceof Name) return input
    if ("string" === typeof input) return this.parse(input)
    return new Name(input)
  }
}

export default Name
```

---

## 📦 Створення системи реєстрації моделів

Всі модельні класи мають бути доступні через центральний реєстр:

```js
// ui-react/src/models/index.js
import Certificate from "./Certificate.js"
import CertificateConfig from "./Certificate/Config.js"
import CertificateFields from "./Certificate/Fields.js"
import CertificateOwner from "./Certificate/Owner.js"
import CertificateTextColumns from "./Certificate/TextColumns.js"
import CertificateTextOptions from "./Certificate/TextOptions.js"
import Contact from "./Contact.js"
import Gender from "./Gender.js"
import Name from "./Name.js"

export default {
  Certificate,
  CertificateConfig,
  CertificateFields,
  CertificateOwner,
  CertificateTextColumns,
  CertificateTextOptions,
  Contact,
  Gender,
  Name
}
```

---

## 🔧 Створення UI компонентів

На основі моделей і їх методів створюються відповідні компоненти для React:

```jsx
// ui-react/src/components/Certificate.jsx
import React from 'react'
import { models } from '../models'

export default function Certificate({ data }) {
  const cert = models.Certificate.from(data)
  
  return (
    <div className="certificate">
      <img src={cert.img} alt="Certificate" className="img-fluid" />
      <div className="certificate-info">
        <h3>{cert.owner.firstName} {cert.owner.lastName}</h3>
        <p>{cert.lesson.subject}</p>
        <p>Date: {cert.date.toLocaleDateString()}</p>
      </div>
    </div>
  )
}
```

```jsx
// ui-react/src/components/ContactList.jsx
export default function ContactList({ contacts }) {
  return (
    <div className="contact-list">
      {contacts.map((contact, i) => (
        <a 
          key={i} 
          href={contact.type.replace(/:$/, '') + contact.value}
          className="contact-item"
        >
          {contact.value}
        </a>
      ))}
    </div>
  )
}
```

---

## 📋 Перенос даних і структури

При переносі даних важливо:
- Дотримуватись структури `Document` з `content`, `promo`, `$content` полями
- Використовувати `$clear`, `$ref`, `$variant` для управління властивостями
- Рефакторити логіку `NANOElement` у прості JS класи

Принцип роботи:
1. Кожен файл `.nano` перетворюється на об'єкт JS
2. Компоненти беруть тип з назви поля, наприклад `{ Banner: true }` → рендерить компонент `Banner`
3. Якщо поле має `$ref`, завантажується із відповідного місця
4. Глобальні змінні (з `_`) автоматично зливаються

---

## 🧪 Покриття тестами

Всі перенесені компоненти повинні мати тестові файли, які проходять стандартні перевірки:

```js
// ui-react/src/models/Certificate.test.js
import test from "node:test"
import assert from "node:assert"
import Certificate from "./Certificate.js"

test("Certificate constructor assigns properties correctly", () => {
  const owner = { id: 'owner1', name: 'John Doe' }
  const lesson = { id: 'lesson1', subject: 'Math' }
  const cert = new Certificate({
    id: 'cert1',
    img: 'image.png',
    owner,
    lesson,
  })

  assert.equal(cert.id, 'cert1')
  assert.equal(cert.img, 'image.png')
  assert.equal(String(cert.owner), "John Doe")
  assert.equal(String(cert.lesson), "Math")
})

test("Certificate.from returns same instance if input is Certificate", () => {
  const cert = new Certificate({ id: 'test' })
  assert.strictEqual(Certificate.from(cert), cert)
})
```

---

## 🔄 Конвенції при переносі

1. `import ... from "@nan0web/..."` → `import ... from "./models/..."`
1. Всі властивості моделі мають типи через JSDoc
1. Метод `toString()` є обов'язковим для моделей і задає формат виведення
1. Метод `from()` є фабрикою екземплярів
1. Моделі не повинні мати зовнішніх залежностей, тільки `@nan0web/types` допоміжні функції
1. UI компоненти імпортують моделі через `{ models } from '../models'`

---

## 🏗 Приклад структури після переносу

```text
@nan0web/ui-react/
├── src/
│   ├── components/
│   │   ├── Certificate.jsx
│   │   ├── ContactList.jsx
│   │   └── ...
│   ├── models/
│   │   ├── Certificate.js
│   │   ├── Certificate.test.js
│   │   ├── Contact.js
│   │   ├── Contact.test.js
│   │   ├── Gender.js
│   │   ├── Gender.test.js
│   │   ├── Name.js
│   │   ├── Name.test.js
│   │   └── index.js
│   └── ...
└── package.json
```

---

## ✅ Перевірка через системний діагноз

Створіть системну інструкцію в `./system.md` з наступним діаграмним тестом:
1. **Вхідні дані (input)** → використання `from()` для завантаження моделі
1. **Робота (process)** → методи типу `toString()`, `toObject()`
1. **Вихідні дані (output)** → рендерінг через компоненти
1. **Статус** → перевірка тестами, покриття 100%

Пам'ятайте: найвища ефективність NaN•Web досягається при створенні моделей, компонентів і їх тестуванні **в системних стосах**. Це гарантує нульову помилку на релізах і працездатність у будь-якому контексті.

Якщо потрібно, ви можете перевіряти ці правила щодня до запуску будь-якого процесу:
```bash
pnpm test:release          # перевірка статусу релізу
pnpm build                 # переконатись відсутності помилок типізації
pnpm test:coverage         # перевірка покриття тестами
```

## Renderers
Використовуються для:
- кастомізації рендеру компонентів
- зворотної сумісності
- маплення декількох типів
- обробки вкладених блоків


## Формат блоку

Блок даних має формат:

```json
{
  "Component": [ "content", { "Nested": [...] } ],
  "$prop": "value",
  "$onClick": handler
}
```

- **Ключ (не з `$`)** — тип компоненту
- **Значення** — масив текстів/блоків, рядок, `true`
- **Поля з `$`** — пропси
- Автоматично конвертується в `Element`

Рендер:
- `renderers` мають пріоритет
- `context` надає тему, DB, мову
- `key` передається на найглибшому рівні

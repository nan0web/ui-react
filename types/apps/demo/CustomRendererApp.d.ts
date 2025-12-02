/**
 * UI-Agnostic Custom Renderer App: run() повертає дані без JSX.
 * Замість JSX у Renderer, повертаємо специфікацію для динамічного рендерингу:
 * - requiresInput: схема для форми (якщо потрібно)
 * - compute: функція для обчислень на основі input
 * - content: базовий статичний контент (fallback або частина UI)
 *
 * @example
 * result = await app.run() // { content: [...], requiresInput: {fields}, compute: fn }
 * Renderer використовує type для динамічного JSX.
 */
export default class CustomRendererApp extends AppCore {
    static from(input: any): CustomRendererApp;
    /**
     * @param {Object} input
     * @param {import('@nan0web/db-browser').default} input.db
     * @param {string} [input.title='Demo']
     * @param {string} [input.uri='index.html']
     * @param {string} [input.locale='en']
     */
    constructor(input: {
        db: import("@nan0web/db-browser").default;
        title?: string | undefined;
        uri?: string | undefined;
        locale?: string | undefined;
    });
    /**
     * @override
     * @returns {Promise<Object>} — { type: 'interactive', content: базовий, requiresInput: схема, compute: fn }
     */
    override run(): Promise<any>;
}
import { AppCore } from '@nan0web/core';

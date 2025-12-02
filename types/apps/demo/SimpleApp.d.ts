/**
 * Simple App: рендериться стандартно з content (без динаміки).
 * run() повертає об'єкт з content для ясності.
 *
 * @example
 * new SimpleApp({ uri }).run() → { content: [ { h2: [...] }, { Button: [...] } ] }
 */
export default class SimpleApp extends AppCore {
    static from(input: any): SimpleApp;
    /**
     * @param {Object} input
     * @param {DB} input.db
     * @param {string} [input.title='Demo']
     * @param {string} [input.uri='index.html']
     * @param {string} [input.locale='en']
     */
    constructor(input: {
        db: DB;
        title?: string | undefined;
        uri?: string | undefined;
        locale?: string | undefined;
    });
    /**
     * @override
     * @returns {Promise<Object>} — { type: 'standard', content: [...] }
     */
    override run(): Promise<any>;
}
import { AppCore } from '@nan0web/core';
import DB from '@nan0web/db';

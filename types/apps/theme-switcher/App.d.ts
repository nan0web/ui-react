/**
 * Theme switcher application - pure action without UI dependencies
 *
 * @example
 * const app = new ThemeSwitcherApp({ db, theme, setTheme })
 * const result = await app.run()
 */
export default class ThemeSwitcherApp extends AppCore {
    /**
     * @param {Object} input
     * @returns {ThemeSwitcherApp}
     */
    static from(input: any): ThemeSwitcherApp;
    /**
     * @param {Object} input
     * @param {DB} input.db
     * @param {Object} input.theme
     * @param {Function} input.setTheme
     * @param {string} [input.locale='en']
     */
    constructor({ db, theme, setTheme, locale }: {
        db: DB;
        theme: any;
        setTheme: Function;
        locale?: string | undefined;
    });
    currentTheme: any;
    setTheme: Function;
    /**
     * @override
     * @returns {Promise<Object>}
     */
    override run(): Promise<any>;
}
import { AppCore } from '@nan0web/core';
import DB from '@nan0web/db';

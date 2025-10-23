/**
 * Demonstration application registry - main UI structure
 *
 * @example
 * const app = new DemoApp({ db, theme, setTheme })
 * const result = await app.run()
 */
export default class DemoApp extends AppCore {
    /**
     * @param {any} input
     * @returns {DemoApp}
     */
    static from(input: any): DemoApp;
    /**
     * @param {Object} input
     * @param {DB} input.db
     * @param {Object} input.theme
     * @param {Function} input.setTheme
     * @param {Function} input.navigate
     * @param {string} [input.uri='index.html']
     * @param {string} [input.locale='en']
     */
    constructor({ db, theme, setTheme, navigate, uri, locale }: {
        db: DB;
        theme: any;
        setTheme: Function;
        navigate: Function;
        uri?: string | undefined;
        locale?: string | undefined;
    });
    theme: any;
    setTheme: Function;
    navigate: Function;
    uri: string;
    /**
     * @type {Map<string, () => Promise<AppCore>>}
     */
    apps: Map<string, () => Promise<AppCore>>;
    /**
     * @override
     * @returns {Promise<Object>}
     */
    override run(): Promise<any>;
    /**
     * @param {string} path
     */
    handleNavigation(path: string): void;
}
import { AppCore } from '@nan0web/core';
import DB from '@nan0web/db-browser';

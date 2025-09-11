export default class NavigationApp extends AppCore {
    static from(input: any): NavigationApp;
    /**
     * @param {Object} input
     * @param {DB} input.db
     * @param {Function} input.navigate
     * @param {string} [input.currentPath='home']
     * @param {string} [input.locale='en']
     */
    constructor({ db, navigate, currentPath, locale }: {
        db: DB;
        navigate: Function;
        currentPath?: string | undefined;
        locale?: string | undefined;
    });
    navigate: Function;
    currentPath: string;
    /**
     * @override
     * @returns {Promise<Object>}
     */
    override run(): Promise<any>;
}
import { AppCore } from '@nan0web/core';
import DB from '@nan0web/db-browser';

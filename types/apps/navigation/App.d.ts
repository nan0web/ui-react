/**
 * @typedef {Object} NavigationAppProps
 * @property {string} title - App title
 * @property {string} uri - App URI
 */
export default class NavigationApp extends AppCore {
    static from(input: any): NavigationApp;
    /**
     * @param {Object} input
     * @param {import('@nan0web/db-browser').default} input.db
     * @param {Function} input.navigate
     * @param {string} [input.currentPath='home']
     * @param {string} [input.locale='en']
     */
    constructor({ db, navigate, currentPath, locale }: {
        db: import("@nan0web/db-browser").default;
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
export type NavigationAppProps = {
    /**
     * - App title
     */
    title: string;
    /**
     * - App URI
     */
    uri: string;
};
import { AppCore } from '@nan0web/core';

export default class Document {
    /**
     * @param {object} input
     * @returns {Document}
     */
    static from(input: object): Document;
    /**
     * @param {object} [input]
     * @param {Array<object>} [input.$content=[]]
     * @param {string} [input.$lang="en"]
     * @param {any} [input.nav=new Navigation()]
     */
    constructor(input?: {
        $content?: any[] | undefined;
        $lang?: string | undefined;
        nav?: any;
    } | undefined);
    /** @type {Array<object>} */
    $content: Array<object>;
    /** @type {string} */
    $lang: string;
    /** @type {Navigation} */
    nav: Navigation;
    /**
     * @param {string} type
     * @returns {Array<object>}
     */
    getBlocksByType(type: string): Array<object>;
}
import Navigation from "./Navigation.js";

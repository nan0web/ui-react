export default class Document {
    /**
     * @param {object} input
     * @returns {Document}
     */
    static from(input: object): Document;
    /**
     * @param {object} [input]
     * @param {Array<object>} [input.$content=[]]
     */
    constructor(input?: {
        $content?: any[] | undefined;
    } | undefined);
    /** @type {Array<object>} */
    $content: Array<object>;
    /**
     * @param {string} type
     * @returns {Array<object>}
     */
    getBlocksByType(type: string): Array<object>;
}

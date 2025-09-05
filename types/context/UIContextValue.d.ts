export default UIContextValue;
/**
 * Tiny context UI for all components.
 */
declare class UIContextValue {
    /**
     * @param {any} input
     * @returns {UIContextValue}
     */
    static from(input: any): UIContextValue;
    /**
     * @param {Object} [input]
     * @param {typeof Theme} [input.theme]
     * @param {string} [input.lang]
     * @param {DB} [input.db]
     * @param {boolean} [input.reducedMotion]
     * @param {object} [input.data]
     * @param {Function} [input.setTheme]
     * @param {Function} [input.t]
     * @param {Function} [input.renderFn]
     * @param {Map<string, () => Promise<{default: typeof AppCore}>>} [input.apps]
     * @param {Map<string, React.Component>} [input.components]
     * @param {Map<string, React.Component>} [input.renderers]
     * @param {Record<string, Function>} [input.actions] - UI actions
     */
    constructor(input?: {
        theme?: typeof Theme | undefined;
        lang?: string | undefined;
        db?: DB | undefined;
        reducedMotion?: boolean | undefined;
        data?: object;
        setTheme?: Function | undefined;
        t?: Function | undefined;
        renderFn?: Function | undefined;
        apps?: Map<string, () => Promise<{
            default: typeof AppCore;
        }>> | undefined;
        components?: Map<string, import("react").Component<any, any, any>> | undefined;
        renderers?: Map<string, import("react").Component<any, any, any>> | undefined;
        actions?: Record<string, Function> | undefined;
    } | undefined);
    theme: typeof Theme;
    lang: string;
    db: DB;
    reducedMotion: boolean;
    setTheme: Function;
    renderFn: Function;
    components: Map<any, any>;
    renderers: Map<any, any>;
    apps: Map<any, any>;
    actions: Record<string, Function>;
    data: any;
    /**
     * Extend current context and returns new context value.
     * @param {Object} overrides
     * @returns {UIContextValue}
     */
    extend(overrides?: any): UIContextValue;
}
import { Theme } from "@nan0web/ui-core";
import DB from "@nan0web/db-browser";
import AppCore from "@nan0web/core";

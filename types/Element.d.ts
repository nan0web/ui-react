export default class ReactElement extends Element {
    /**
     * @param {any} input
     * @param {string|number} key
     * @param {UIContext} context
     * @returns {JSX.Element | null}
     */
    static render(input: any, key: string | number, context: UIContext): JSX.Element | null;
}
export type UIContext = {
    components?: Map<string, React.Component<any, any, any>> | undefined;
    renderers?: Map<string, React.Component<any, any, any>> | undefined;
    /**
     * - App data
     */
    data?: any;
    /**
     * - UI actions
     */
    actions?: {
        [x: string]: Function;
    } | undefined;
    /**
     * - i18n translator
     */
    t?: Function | undefined;
};
import { Element } from "@nan0web/ui-core";
import React from 'react';

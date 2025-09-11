export default class ReactElement extends Element {
    /**
     * @param {any} input Input data
     * @param {string|number} key Key prop.
     * @param {UIContextValue} context
     * @returns {JSX.Element | null}
     */
    static render(input: any, key: string | number, context: UIContextValue): JSX.Element | null;
}
import { Element } from "@nan0web/ui-core";
import UIContextValue from "./context/UIContextValue.jsx";

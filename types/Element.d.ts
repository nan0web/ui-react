export default class ReactElement extends Element {
    /**
     * @param {any} input
     * @param {string|number} key
     * @param {UIContextValue} context
     * @returns {JSX.Element | null}
     */
    static render(input: any, key: string | number, context: UIContextValue): JSX.Element | null;
}
import { Element } from "@nan0web/ui-core";
import { UIContextValue } from "./main";

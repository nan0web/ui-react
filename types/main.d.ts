/**
 * @component
 * @param {Object} props
 * @param {DB} props.db
 * @param {string} [props.documentPath="index.json"]
 * @param {Object} [props.context] - Additional context (theme, reducedMotion, etc)
 */
export default function UIReact({ db, documentPath, context }: {
    db: DB;
    documentPath?: string | undefined;
    context?: any;
}): import("react/jsx-runtime").JSX.Element;
import DB from "@nan0web/db-browser";
import components from './components/index.jsx';
import renderers from './renderers/index.jsx';
import Element from './Element.jsx';
import { useUI } from './context/UIContext.jsx';
export { components, renderers, Element, useUI };

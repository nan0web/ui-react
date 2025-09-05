/**
 * Main UIReact component for rendering structured documents
 *
 * @param {Object} props
 * @param {DB} props.db - Database instance for content
 * @param {string} [props.documentPath="index.json"] - Path to document
 * @param {Partial<UIContextValue>} [props.context] - Additional context (apps, lang, etc)
 */
export function UIReact({ db, documentPath, context }: {
    db: DB;
    documentPath?: string | undefined;
    context?: Partial<UIContextValue> | undefined;
}): import("react/jsx-runtime").JSX.Element;
import DB from "@nan0web/db-browser";
import UIContextValue from "./context/UIContextValue.jsx";
import components from './components/index.jsx';
import renderers from './renderers/index.jsx';
import Element from './Element.jsx';
import { useUI } from './context/UIContext.jsx';
import { UIProvider } from './context/UIContext.jsx';
/**
 * Core block rendering function
 *
 * @param {Object} block - Document block with type and content
 * @param {number} key - React key
 * @param {UIContextValue} context - Current UI context
 * @returns {JSX.Element|null}
 */
export function renderBlock(block: any, key: number, context: UIContextValue): JSX.Element | null;
export { components, renderers, Element, useUI, UIProvider, UIContextValue };

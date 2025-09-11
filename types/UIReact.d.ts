/**
 * Main UIReact component for rendering structured documents
 *
 * @param {Object} props
 * @param {DB} props.db - Database instance for content
 * @param {string} [props.uri=""] - Path to document
 * @param {Partial<Document>} [props.content={}] - Document in case of server side rendering
 * @param {Partial<UIContextValue>} [props.context] - Additional context (apps, lang, etc)
 */
export default function UIReact({ db, uri, content, context }: {
    db: DB;
    uri?: string | undefined;
    content?: Partial<Document> | undefined;
    context?: Partial<UIContextValue> | undefined;
}): import("react/jsx-runtime").JSX.Element;
import DB from "@nan0web/db-browser";
import Document from './models/Document.js';
import UIContextValue from "./context/UIContextValue.jsx";

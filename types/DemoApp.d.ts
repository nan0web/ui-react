/**
 * @component
 * @param {Object} props
 * @param {DB} props.db
 */
export default function DemoApp({ db }: {
    db: DB;
}): import("react/jsx-runtime").JSX.Element;
import DB from '@nan0web/db-browser';

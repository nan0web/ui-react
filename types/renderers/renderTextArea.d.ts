/**
 * Renderer for TextArea component with local state support.
 *
 * @param {object} props
 * @param {object} props.element - Element definition
 * @param {any} [props.context] - UI Context
 * @param {any} [props.onChange] - Change handler
 * @param {any} [props.disabled] - Disabled state
 * @returns {JSX.Element} Rendered textarea
 */
declare function renderTextArea(props: {
    element: object;
    context?: any;
    onChange?: any;
    disabled?: any;
}): JSX.Element;
declare namespace renderTextArea {
    namespace propTypes {
        let element: PropTypes.Requireable<object>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
        let disabled: PropTypes.Requireable<boolean>;
    }
}
export default renderTextArea;
import PropTypes from 'prop-types';

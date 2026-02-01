/**
 * Renderer for Checkbox component with local state support for playground.
 *
 * @param {object} props
 * @param {object} props.element - Element definition
 * @param {any} [props.context] - UI Context
 * @param {any} [props.onChange] - Change handler
 * @param {any} [props.disabled] - Disabled state
 * @returns {JSX.Element} Rendered checkbox
 */
declare function renderCheckbox(props: {
    element: object;
    context?: any;
    onChange?: any;
    disabled?: any;
}): JSX.Element;
declare namespace renderCheckbox {
    namespace propTypes {
        let element: PropTypes.Requireable<object>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
        let disabled: PropTypes.Requireable<boolean>;
    }
}
export default renderCheckbox;
import PropTypes from 'prop-types';

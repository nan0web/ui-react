/**
 * Renderer for Input component with local state support for playground.
 *
 * @param {object} props
 * @param {object} props.element - Raw element
 * @param {any} [props.context] - UI Context
 * @returns {JSX.Element} Rendered input
 */
declare function renderInput(props: {
    element: object;
    context?: any;
}): JSX.Element;
declare namespace renderInput {
    namespace propTypes {
        let element: PropTypes.Requireable<object>;
        let context: PropTypes.Requireable<object>;
    }
}
export default renderInput;
import PropTypes from 'prop-types';

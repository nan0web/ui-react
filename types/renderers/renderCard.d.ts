/**
 * Renderer for Card component
 *
 * @param {object} input
 * @param {object} input.element - Component block definition
 * @param {any} input.context - UI Context
 * @param {any} [input.children] - React children
 * @returns {JSX.Element} Rendered card
 */
declare function renderCard({ element, context, ...props }: {
    element: object;
    context: any;
    children?: any;
}): JSX.Element;
declare namespace renderCard {
    namespace propTypes {
        let element: PropTypes.Validator<object>;
    }
}
export default renderCard;
import PropTypes from 'prop-types';

/**
 * Renderer for Card component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered card
 */
declare function renderCard(block: object): JSX.Element;
declare namespace renderCard {
    namespace propTypes {
        let block: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            props: PropTypes.Requireable<object>;
            data: PropTypes.Requireable<any>;
        }>>>;
    }
}
export default renderCard;
import PropTypes from 'prop-types';

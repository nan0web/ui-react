/**
 * Renderer for Modal component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered modal
 */
declare function renderModal(block: object): JSX.Element;
declare namespace renderModal {
    namespace propTypes {
        let block: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            props: PropTypes.Requireable<object>;
            data: PropTypes.Requireable<any>;
        }>>>;
    }
}
export default renderModal;
import PropTypes from 'prop-types';

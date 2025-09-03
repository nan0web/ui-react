/**
 * Renderer for Input component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered input
 */
declare function renderInput(block: object): JSX.Element;
declare namespace renderInput {
    namespace propTypes {
        let block: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            props: PropTypes.Requireable<object>;
            data: PropTypes.Requireable<any>;
        }>>>;
    }
}
export default renderInput;
import PropTypes from 'prop-types';

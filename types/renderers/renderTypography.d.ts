/**
 * Renderer for Typography component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered typography
 */
declare function renderTypography(block: object): JSX.Element;
declare namespace renderTypography {
    namespace propTypes {
        let block: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            props: PropTypes.Requireable<object>;
            data: PropTypes.Requireable<any>;
        }>>>;
    }
}
export default renderTypography;
import PropTypes from 'prop-types';

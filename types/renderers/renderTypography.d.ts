/**
 * Renderer for Typography component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered typography
 */
declare function renderTypography({ element, ...props }: object): JSX.Element;
declare namespace renderTypography {
    namespace propTypes {
        let element: PropTypes.Validator<object>;
    }
}
export default renderTypography;
import PropTypes from 'prop-types';

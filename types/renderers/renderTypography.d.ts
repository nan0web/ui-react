/**
 * Renderer for Typography component
 *
 * @param {object} props - Component block definition
 * @returns {JSX.Element} Rendered typography
 */
declare function renderTypography(props: object): JSX.Element;
declare namespace renderTypography {
    namespace propTypes {
        let element: PropTypes.Validator<object>;
    }
}
export default renderTypography;
import PropTypes from 'prop-types';

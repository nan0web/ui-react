/**
 * Renderer for Avatar component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered avatar
 */
declare function renderAvatar({ element, ...props }: object): JSX.Element;
declare namespace renderAvatar {
    namespace propTypes {
        let element: PropTypes.Validator<object>;
    }
}
export default renderAvatar;
import PropTypes from 'prop-types';

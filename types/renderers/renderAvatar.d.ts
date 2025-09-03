/**
 * Renderer for Avatar component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered avatar
 */
declare function renderAvatar(block: object): JSX.Element;
declare namespace renderAvatar {
    namespace propTypes {
        let block: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            props: PropTypes.Requireable<object>;
            data: PropTypes.Requireable<any>;
        }>>>;
    }
}
export default renderAvatar;
import PropTypes from 'prop-types';

/**
 * Renderer for Button component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered button
 */
declare function renderButton(block: object): JSX.Element;
declare namespace renderButton {
    namespace propTypes {
        let block: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            props: PropTypes.Requireable<object>;
            data: PropTypes.Requireable<any>;
        }>>>;
    }
}
export default renderButton;
import PropTypes from 'prop-types';

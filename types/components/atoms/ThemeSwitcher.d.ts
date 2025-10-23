/**
 * Simple switcher to toggle between light and night (dark) theme.
 *
 * @param {Object} props
 * @param {string} [props.label='Theme'] - Button label.
 * @param {Object} [props.style] - Additional styles.
 * @param {Function} [props.onClick] - Additional click handler.
 */
declare function ThemeSwitcher({ label, style, onClick }?: {
    label?: string | undefined;
    style?: any;
    onClick?: Function | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace ThemeSwitcher {
    namespace propTypes {
        let label: PropTypes.Requireable<string>;
        let style: PropTypes.Requireable<object>;
        let onClick: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
export default ThemeSwitcher;
import PropTypes from 'prop-types';

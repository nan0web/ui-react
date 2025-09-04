/**
 * Simple switcher to toggle between light and night (dark) theme.
 *
 * @param {Object} props
 * @param {string} [props.label='Theme'] - Button label.
 */
declare function ThemeSwitcher({ label }: {
    label?: string | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace ThemeSwitcher {
    namespace propTypes {
        let label: PropTypes.Requireable<string>;
    }
}
export default ThemeSwitcher;
import PropTypes from 'prop-types';

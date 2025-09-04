/**
 * Button component with Bootstrap‑like variants, optional outline,
 * animation that respects the a11y “reduced motion” flag and dark theme.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.variant='primary']
 *        One of: primary, secondary, success, warning, danger,
 *        info, light, dark, link
 * @param {boolean} [props.outline=false] If `true` use outline variant.
 * @param {string} [props.size='md'] 'md' (default) or 'sm'.
 * @param {Object} [props.style] additional inline styles.
 * @param {boolean} [props.disabled] disables the button.
 * @param {function} [props.onKeyDown] optional keyDown handler.
 * @param {function} [props.onKeyUp] optional keyUp handler.
 */
declare function Button({ children, variant, outline, size, ...props }: {
    children: React.ReactNode;
    variant?: string | undefined;
    outline?: boolean | undefined;
    size?: string | undefined;
    style?: any;
    disabled?: boolean | undefined;
    onKeyDown?: Function | undefined;
    onKeyUp?: Function | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Button {
    namespace propTypes {
        let children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let variant: PropTypes.Requireable<string>;
        let outline: PropTypes.Requireable<boolean>;
        let size: PropTypes.Requireable<string>;
        let style: PropTypes.Requireable<object>;
        let disabled: PropTypes.Requireable<boolean>;
        let onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        let onKeyUp: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
export default Button;
import React from 'react';
import PropTypes from 'prop-types';

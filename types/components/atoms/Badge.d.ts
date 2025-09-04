/**
 * Badge component with Bootstrap‑like variant colors and white text.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.variant='primary'] - One of: primary, secondary, success, warning, danger, info, light, dark
 * @param {Object} [props.style] - Additional inline styles
 */
declare function Badge({ children, variant, ...props }: {
    children: React.ReactNode;
    variant?: string | undefined;
    style?: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Badge {
    namespace propTypes {
        let children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let variant: PropTypes.Requireable<string>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Badge;
import React from 'react';
import PropTypes from 'prop-types';

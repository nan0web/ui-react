/**
 * @param {Object} props
 * @param {'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'body'|'small'|'caption'} [props.variant='body']
 * @param {React.ReactNode} props.children
 */
declare function Typography({ variant, children, ...props }: {
    variant?: "h2" | "h3" | "small" | "body" | "caption" | "h1" | "h4" | "h5" | "h6" | undefined;
    children: React.ReactNode;
}): React.ReactElement<{
    style: any;
}, string | React.JSXElementConstructor<any>>;
declare namespace Typography {
    namespace propTypes {
        let variant: PropTypes.Requireable<string>;
        let children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Typography;
import React from 'react';
import PropTypes from 'prop-types';

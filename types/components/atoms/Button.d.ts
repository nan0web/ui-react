declare function Button({ children, variant, size, ...props }: {
    [x: string]: any;
    children: any;
    variant?: string | undefined;
    size?: string | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Button {
    namespace propTypes {
        let children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let variant: PropTypes.Requireable<string>;
        let size: PropTypes.Requireable<string>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Button;
import PropTypes from 'prop-types';

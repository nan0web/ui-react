declare function Badge({ children, variant, ...props }: {
    [x: string]: any;
    children: any;
    variant?: string | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Badge {
    namespace propTypes {
        let children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let variant: PropTypes.Requireable<string>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Badge;
import PropTypes from 'prop-types';

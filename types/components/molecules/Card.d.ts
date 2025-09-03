declare function Card({ children, ...props }: {
    [x: string]: any;
    children: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Card {
    namespace propTypes {
        let children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Card;
import PropTypes from 'prop-types';

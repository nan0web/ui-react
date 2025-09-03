declare function Input({ type, ...props }: {
    [x: string]: any;
    type?: string | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Input {
    namespace propTypes {
        let type: PropTypes.Requireable<string>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Input;
import PropTypes from 'prop-types';

declare function Radio({ checked, onChange, ...props }: {
    [x: string]: any;
    checked: any;
    onChange: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Radio {
    namespace propTypes {
        let checked: PropTypes.Requireable<boolean>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Radio;
import PropTypes from 'prop-types';

declare function Checkbox({ checked, onChange, disabled, ...props }: {
    [x: string]: any;
    checked?: boolean | undefined;
    onChange: any;
    disabled?: boolean | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Checkbox {
    namespace propTypes {
        let checked: PropTypes.Requireable<boolean>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
        let disabled: PropTypes.Requireable<boolean>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Checkbox;
import PropTypes from 'prop-types';

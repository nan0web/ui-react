declare function Select({ options, ...props }: {
    [x: string]: any;
    options?: any[] | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Select {
    namespace propTypes {
        let options: PropTypes.Requireable<(PropTypes.InferProps<{
            value: PropTypes.Validator<string>;
            label: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Select;
import PropTypes from 'prop-types';

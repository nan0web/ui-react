declare function Radio({ checked, onChange, disabled, ...props }: {
    [x: string]: any;
    checked?: boolean | undefined;
    onChange: any;
    disabled?: boolean | undefined;
}): React.DetailedReactHTMLElement<{
    type: string;
    checked: boolean;
    onChange: any;
    style: any;
    disabled: boolean;
}, HTMLElement>;
declare namespace Radio {
    namespace propTypes {
        let checked: PropTypes.Requireable<boolean>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
        let disabled: PropTypes.Requireable<boolean>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Radio;
import React from 'react';
import PropTypes from 'prop-types';

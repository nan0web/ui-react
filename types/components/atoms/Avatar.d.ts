declare function Avatar({ src, alt, size, ...props }: {
    [x: string]: any;
    src: any;
    alt: any;
    size?: string | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Avatar {
    namespace propTypes {
        let src: PropTypes.Validator<string>;
        let alt: PropTypes.Requireable<string>;
        let size: PropTypes.Requireable<string>;
        let style: PropTypes.Requireable<object>;
    }
}
export default Avatar;
import PropTypes from 'prop-types';

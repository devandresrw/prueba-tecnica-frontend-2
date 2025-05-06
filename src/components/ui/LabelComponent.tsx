import { forwardRef, LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string;
    text: string;
    key?: string;
}

const LabelComponent = forwardRef<HTMLLabelElement, LabelProps>(
    ({ htmlFor, text, ...props }, ref) => {
        return (
            <label ref={ref} htmlFor={htmlFor} {...props}>
                {text}
            </label>
        );
    }
);

LabelComponent.displayName = 'LabelComponent';
export const Label = LabelComponent;
import { memo } from 'react';

interface LabelComponentProps {
    htmlFor: string;
    text: string;
    className?: string;
}

const LabelComponent = ({ htmlFor, text, className = '' }: LabelComponentProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
        >
            {text}
        </label>
    );
};

export const LabelComponentMemo = memo(LabelComponent);
LabelComponentMemo.displayName = 'LabelComponentMemo';
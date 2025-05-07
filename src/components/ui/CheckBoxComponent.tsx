import { memo, InputHTMLAttributes, forwardRef } from 'react';

interface CheckBoxComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    className?: string;
}

const InputComponent = forwardRef<HTMLInputElement, CheckBoxComponentProps>(
    ({ id, className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                id={id}
                type="checkbox"
                className={`h-4 w-4 rounded border-gray-300 text-indigo-600
                focus:ring-indigo-500 dark:bg-gray-800
                dark:border-gray-600 ${className || ''}`}
                {...props}
            />
        );
    }
);

InputComponent.displayName = 'InputComponent';
export const InputComponentMemo = memo(InputComponent);
InputComponentMemo.displayName = 'InputComponentMemo';
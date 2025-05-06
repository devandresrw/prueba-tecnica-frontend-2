import { memo, InputHTMLAttributes, forwardRef } from 'react';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
    ({ className = '', ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm
                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${className}`}
                {...props}
            />
        );
    }
);

InputComponent.displayName = 'InputComponent';
export const InputComponentMemo = memo(InputComponent);
InputComponentMemo.displayName = 'InputComponentMemo';
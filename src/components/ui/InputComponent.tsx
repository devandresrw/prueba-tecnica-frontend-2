import { memo, InputHTMLAttributes } from 'react';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    className?: string;
}

const InputComponent = ({ name, className = '', ...props }: InputComponentProps) => {
    return (
        <input
            name={name}
            value={name}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${className}`}
            {...props}
        />
    );
};

export const InputComponentMemo = memo(InputComponent);
InputComponentMemo.displayName = 'InputComponentMemo';
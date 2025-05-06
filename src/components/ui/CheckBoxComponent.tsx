import { memo, InputHTMLAttributes } from 'react';

interface CheckBoxComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string; // ID único para asociar con un label
    className?: string; // Clases adicionales para personalización
}
const InputComponent = ({ id, className, ...props }: CheckBoxComponentProps) => {
    return (
        <input
            id={id}
            type="checkbox"
            className={`h-4 w-4 rounded border-gray-300 text-indigo-600
            focus:ring-indigo-500 dark:bg-gray-800
            dark:border-gray-600 ${className}`}
            {...props}
        />
    );
};

export const InputComponentMemo = memo(InputComponent);
InputComponentMemo.displayName = 'InputComponentMemo';
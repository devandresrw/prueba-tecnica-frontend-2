import { memo } from 'react';

type ErrorComponentProps = {
    className?: string;
    children?: React.ReactNode;
}

const ErrorComponent = ({ className, children }: ErrorComponentProps) => {
    return (
        <span className={`block h-5 text-xs  text-mybgdark dark:text-mybg ${className}`}>
            {children}
        </span>
    );
};

export const ErrorComponentMemo = memo(ErrorComponent);
ErrorComponentMemo.displayName = 'ErrorComponentMemo';
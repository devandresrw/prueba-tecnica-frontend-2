import React from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpiner'
import { FiRefreshCw, FiTrash } from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';

interface TableActionsProps {
    onRegenerate: () => void;
    onDeleteAll: () => void;
    isRegenerating?: boolean;
    isDeleting?: boolean;
    recordCount: number;
    regenerateLabel?: string;
    regeneratingLabel?: string;
    deleteLabel?: string;
    deletingLabel?: string;
    className?: string;
}

// Componente Spinner simple
const Spinner = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
    };

    return (
        <ImSpinner8 className={`${sizeClasses[size]} animate-spin`} />
    );
};

export default function TableActions({
    onRegenerate,
    onDeleteAll,
    isRegenerating,
    isDeleting,
    recordCount,
    regenerateLabel = "Regenerar",
    regeneratingLabel = "Regenerando...",
    deleteLabel = "Eliminar todo",
    deletingLabel = "Eliminando...",
    className = ''
}: TableActionsProps) {
    return (
        <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
            <button
                onClick={onRegenerate}
                disabled={isRegenerating}
                className="flex items-center justify-center sm:justify-start gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
                {isRegenerating ? (
                    <>
                        <LoadingSpinner />
                        <span>{regeneratingLabel}</span>
                    </>
                ) : (
                    <>
                        <FiRefreshCw className="w-4 h-4" />
                        <span>{regenerateLabel}</span>
                    </>
                )}
            </button>

            <button
                onClick={onDeleteAll}
                disabled={isDeleting || recordCount === 0}
                className="flex items-center justify-center sm:justify-start gap-1 px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
                {isDeleting ? (
                    <>
                        <LoadingSpinner />
                        <span>{deletingLabel}</span>
                    </>
                ) : (
                    <>
                        <FiTrash className="w-4 h-4" />
                        <span>{deleteLabel}</span>
                    </>
                )}
            </button>
        </div>
    );
}
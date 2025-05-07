import React from 'react';
import Link from 'next/link';

interface ActionButtonsProps {
    registroId: string;
    onDelete: (id: string) => void;
    isDeleting: boolean;
    viewLabel?: string;
    deleteLabel?: string;
    deletingLabel?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    registroId,
    onDelete,
    isDeleting,
    viewLabel = 'Ver',
    deleteLabel = 'Eliminar',
    deletingLabel = 'Eliminando...'
}) => {
    return (
        <div className="flex space-x-2">
            <Link
                href={`/registros/${registroId}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
            >
                {viewLabel}
            </Link>
            <button
                onClick={() => onDelete(registroId)}
                disabled={isDeleting}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none ml-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isDeleting ? deletingLabel : deleteLabel}
            </button>
        </div>
    );
};

export default ActionButtons;
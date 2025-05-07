import React from 'react';

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
}

export const TableActions: React.FC<TableActionsProps> = ({
    onRegenerate,
    onDeleteAll,
    isRegenerating = false,
    isDeleting = false,
    recordCount,
    regenerateLabel = 'Regenerar datos',
    regeneratingLabel = 'Regenerando...',
    deleteLabel = 'Eliminar todos',
    deletingLabel = 'Eliminando...',
}) => {
    return (
        <div className="space-x-2">
            <button
                onClick={onRegenerate}
                disabled={isRegenerating}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isRegenerating ? regeneratingLabel : regenerateLabel}
            </button>
            <button
                onClick={onDeleteAll}
                disabled={isDeleting || recordCount === 0}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isDeleting ? deletingLabel : deleteLabel}
            </button>
        </div>
    );
};

export default TableActions;
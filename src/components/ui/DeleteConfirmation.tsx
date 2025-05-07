
type DeleteConfirmationProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message?: string;
    title?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

export const DeleteConfirmation = ({
    isOpen,
    onConfirm,
    onCancel,
    title = "Confirmar eliminación",
    message = "¿Estás seguro que deseas eliminar este registro? Esta acción no se puede deshacer.",
    confirmLabel = "Eliminar",
    cancelLabel = "Cancelar"
}: DeleteConfirmationProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
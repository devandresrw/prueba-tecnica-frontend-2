
interface EmptyStateProps {
    message?: string;
    buttonLabel?: string;
    loadingLabel?: string;
    isLoading?: boolean;
    onAction: () => void;
}

export const EmptyState = ({
    message = 'No hay registros en la base de datos.',
    buttonLabel = 'Generar datos de prueba',
    loadingLabel = 'Generando...',
    isLoading = false,
    onAction = () => { },
}: EmptyStateProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                {message}
            </p>
            <button
                onClick={onAction}
                disabled={isLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? loadingLabel : buttonLabel}
            </button>
        </div>
    );
};

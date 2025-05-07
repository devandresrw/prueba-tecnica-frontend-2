import React from 'react';
import { FiEye, FiTrash } from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';
import { useRouter } from 'next/navigation';


interface Registro {
    id: string;
    fullName: string;
    email: string;
    semester: string;
    companion: boolean;
    companionName?: string;
    createdAt: string | number | Date;
}

interface RegistroRowProps {
    registro: Registro;
    onDelete: (id: string) => void;
    deletingId: string | null;
}

const RegistroRow: React.FC<RegistroRowProps> = ({ registro, onDelete, deletingId }) => {
    const router = useRouter();
    const isDeleting = deletingId === registro.id;
    const formattedDate = new Date(registro.createdAt).toLocaleDateString();


    // Acortar el ID para mostrarlo
    const shortId = registro.id.substring(0, 8) + '...';

    // Función para navegar al detalle del registro
    const handleViewClick = () => {
        // Implementar navegación al detalle
        console.log(`Ver registro: ${registro.id}`);
        router.push(`/registros/${registro.id}`);
    };

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
            {/* ID - Visible solo en escritorio */}
            <td className="hidden lg:table-cell px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <button
                    onClick={handleViewClick}
                    className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                    {shortId}
                </button>
            </td>

            {/* Nombre - Visible en todos los dispositivos */}
            <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate max-w-[180px]">
                <button
                    onClick={handleViewClick}
                    className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline text-left"
                >
                    {registro.fullName}
                </button>
            </td>

            {/* Email - Visible en tablet y desktop */}
            <td className="hidden sm:table-cell px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                {registro.email}
            </td>

            {/* Semestre - Visible solo en escritorio */}
            <td className="hidden lg:table-cell px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {registro.semester}
            </td>

            {/* Acompañante - Visible solo en escritorio */}
            <td className="hidden lg:table-cell px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {registro.companion ? (
                    <span title={registro.companionName || ""}>Sí</span>
                ) : (
                    "No"
                )}
            </td>

            {/* Fecha - Visible solo en escritorio */}
            <td className="hidden lg:table-cell px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {formattedDate}
            </td>

            {/* Acciones - Visible en todos los dispositivos */}
            <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-right">
                <div className="flex justify-end items-center space-x-3">
                    <button
                        onClick={handleViewClick}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Ver detalle"
                    >
                        <FiEye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => !isDeleting && onDelete(registro.id)}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                        title="Eliminar registro"
                    >
                        {isDeleting ? (
                            <ImSpinner8 className="w-4 h-4 animate-spin" />
                        ) : (
                            <FiTrash className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default RegistroRow;
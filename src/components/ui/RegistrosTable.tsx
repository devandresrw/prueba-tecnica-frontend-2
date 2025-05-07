import React from 'react';
import RegistroRow from './RegistroRow';

interface Registro {
    id: string;
    fullName: string;
    email: string;
    semester: string;
    companion: boolean;
    companionName?: string;
    createdAt: string | number | Date;
}

interface RegistrosTableProps {
    registros: Registro[];
    onDeleteRegistro: (id: string) => void;
    deletingId: string | null;
}

export const RegistrosTable: React.FC<RegistrosTableProps> = ({
    registros,
    onDeleteRegistro,
    deletingId
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            {/* ID - Visible solo en escritorio */}
                            <th scope="col" className="hidden lg:table-cell px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>

                            {/* Nombre - Visible en todos los dispositivos */}
                            <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>

                            {/* Email - Visible en tablet y desktop */}
                            <th scope="col" className="hidden sm:table-cell px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>

                            {/* Semestre - Visible solo en escritorio */}
                            <th scope="col" className="hidden lg:table-cell px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Semestre</th>

                            {/* Acompañante - Visible solo en escritorio */}
                            <th scope="col" className="hidden lg:table-cell px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acompañante</th>

                            {/* Fecha - Visible solo en escritorio */}
                            <th scope="col" className="hidden lg:table-cell px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>

                            {/* Acciones - Visible en todos los dispositivos */}
                            <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {registros.map(registro => (
                            <RegistroRow
                                key={registro.id}
                                registro={registro}
                                onDelete={onDeleteRegistro}
                                deletingId={deletingId}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegistrosTable;
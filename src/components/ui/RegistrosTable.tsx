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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Semestre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acompañante</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
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
import React from 'react';
import ActionButtons from './ActionButtons';
import Link from 'next/link';

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

export const RegistroRow: React.FC<RegistroRowProps> = ({
    registro,
    onDelete,
    deletingId
}) => {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <Link
                    href={`/registros/${registro.id}`}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline"
                >
                    {registro.id.slice(0, 8)}...
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                <Link
                    href={`/registros/${registro.id}`}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline"
                >
                    {registro.fullName}
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {registro.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {registro.semester}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {registro.companion ? (registro.companionName || 'Sí') : 'No'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(registro.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                <ActionButtons
                    registroId={registro.id}
                    onDelete={onDelete}
                    isDeleting={deletingId === registro.id}
                />
            </td>
        </tr>
    );
};

export default RegistroRow;
'use client';

import { useState, useEffect } from 'react';
import { indexedDBService } from '@/services/db.service';

export default function Registros() {
    const [hasData, setHasData] = useState<boolean | null>(null);
    const [registros, setRegistros] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [seedLoading, setSeedLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Verificar si hay datos al cargar la página
    useEffect(() => {
        async function checkData() {
            await indexedDBService.init();
            const hasRegistros = await indexedDBService.hasRegistros();
            setHasData(hasRegistros);

            if (hasRegistros) {
                loadRegistros();
            } else {
                setLoading(false);
            }
        }

        checkData();
    }, []);

    // Cargar registros desde IndexedDB
    const loadRegistros = async () => {
        try {
            setLoading(true);
            const data = await indexedDBService.getAllRegistros();
            setRegistros(data);
            setHasData(data.length > 0);
        } catch (error) {
            console.error("Error al cargar registros:", error);
        } finally {
            setLoading(false);
        }
    };

    // Generar datos semilla
    const handleGenerateSeed = async () => {
        try {
            setSeedLoading(true);
            await indexedDBService.seedData(20); // Generar 20 registros de prueba
            await loadRegistros();
        } catch (error) {
            console.error("Error al generar datos semilla:", error);
        } finally {
            setSeedLoading(false);
        }
    };

    // Eliminar un registro específico
    const handleDeleteRegistro = async (id: string) => {
        try {
            setDeletingId(id);
            const success = await indexedDBService.deleteRegistro(id);
            if (success) {
                await loadRegistros();
            }
        } catch (error) {
            console.error(`Error al eliminar registro ${id}:`, error);
        } finally {
            setDeletingId(null);
        }
    };

    // Eliminar todos los registros
    const handleDeleteAll = async () => {
        // Mostrar una confirmación al usuario
        if (!window.confirm("¿Estás seguro que deseas eliminar todos los registros? Esta acción no se puede deshacer.")) {
            return;
        }

        try {
            setDeleteLoading(true);
            const success = await indexedDBService.deleteAllRegistros();
            if (success) {
                setRegistros([]);
                setHasData(false);
            }
        } catch (error) {
            console.error("Error al eliminar todos los registros:", error);
        } finally {
            setDeleteLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-mybg dark:bg-mybgdark">
                <p className="text-lg text-gray-700 dark:text-gray-300">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-mybg dark:bg-mybgdark">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Registros</h1>
                <a
                    href="/"
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                >
                    Volver al formulario
                </a>
            </div>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Registros</h1>

                {!hasData ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            No hay registros en la base de datos.
                        </p>
                        <button
                            onClick={handleGenerateSeed}
                            disabled={seedLoading}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {seedLoading ? 'Generando...' : 'Generar datos de prueba'}
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Lista de registros ({registros.length})
                            </h2>
                            <div className="space-x-2">
                                <button
                                    onClick={handleGenerateSeed}
                                    disabled={seedLoading}
                                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none"
                                >
                                    {seedLoading ? 'Regenerando...' : 'Regenerar datos'}
                                </button>
                                <button
                                    onClick={handleDeleteAll}
                                    disabled={deleteLoading || registros.length === 0}
                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none"
                                >
                                    {deleteLoading ? 'Eliminando...' : 'Eliminar todos'}
                                </button>
                            </div>
                        </div>

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
                                            <tr key={registro.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{registro.id.slice(0, 8)}...</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{registro.fullName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{registro.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{registro.semester}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {registro.companion ? (registro.companionName || 'Sí') : 'No'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(registro.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    <button
                                                        onClick={() => handleDeleteRegistro(registro.id)}
                                                        disabled={deletingId === registro.id}
                                                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
                                                    >
                                                        {deletingId === registro.id ? 'Eliminando...' : 'Eliminar'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
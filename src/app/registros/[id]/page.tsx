'use client';

import { useState, useEffect } from 'react';
import { indexedDBService } from '@/services/db.service';
import { useRouter } from 'next/navigation';

export default function RegistroDetalle({ params }: { params: { id: string } }) {
    const [registro, setRegistro] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function cargarRegistro() {
            try {
                await indexedDBService.init();
                const data = await indexedDBService.getRegistro(params.id);

                if (!data) {
                    setError('Registro no encontrado');
                } else {
                    setRegistro(data);
                }
            } catch (err) {
                console.error('Error al cargar el registro:', err);
                setError('Error al cargar el registro');
            } finally {
                setLoading(false);
            }
        }

        cargarRegistro();
    }, [params.id]);

    // Manejar eliminación del registro
    const handleEliminar = async () => {
        if (!window.confirm('¿Estás seguro que deseas eliminar este registro?')) {
            return;
        }

        try {
            setLoading(true);
            await indexedDBService.deleteRegistro(params.id);
            router.push('/registros');
        } catch (err) {
            console.error('Error al eliminar:', err);
            setError('Error al eliminar el registro');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-mybg dark:bg-mybgdark">
                <p className="text-lg text-gray-700 dark:text-gray-300">Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-8 bg-mybg dark:bg-mybgdark">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/registros')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Volver a la lista
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-mybg dark:bg-mybgdark">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Detalle del Registro
                    </h1>
                    <button
                        onClick={() => router.push('/registros')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Volver a la lista
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">ID</p>
                        <p className="text-gray-800 dark:text-gray-200">{registro.id}</p>
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nombre completo</p>
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{registro.fullName}</p>
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-gray-800 dark:text-gray-200">{registro.email}</p>
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Semestre</p>
                        <p className="text-gray-800 dark:text-gray-200">{registro.semester}</p>
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Acompañante</p>
                        <p className="text-gray-800 dark:text-gray-200">
                            {registro.companion ? 'Sí' : 'No'}
                        </p>
                    </div>

                    {registro.companion && registro.companionName && (
                        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Nombre del acompañante</p>
                            <p className="text-gray-800 dark:text-gray-200">{registro.companionName}</p>
                        </div>
                    )}

                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de registro</p>
                        <p className="text-gray-800 dark:text-gray-200">
                            {new Date(registro.createdAt).toLocaleString()}
                        </p>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleEliminar}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Eliminar registro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
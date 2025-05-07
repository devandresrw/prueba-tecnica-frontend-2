'use client';
import { useRouter } from 'next/navigation';
import { useRegistro } from '@/hooks/useRegistro';

export default function RegistroDetalle({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { registro, loading, error, handleEliminar } = useRegistro(params.id);

    const onEliminar = () => {
        handleEliminar(() => router.push('/registros'));
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
            <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-mybg dark:bg-mybgdark">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 mb-3 sm:mb-4">Error</h1>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/registros')}
                        className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base"
                    >
                        Volver a la lista
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-mybg dark:bg-mybgdark">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                        Detalle del Registro
                    </h1>
                    <button
                        onClick={() => router.push('/registros')}
                        className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm sm:text-base"
                    >
                        Volver a la lista
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                    {registro && (
                        <div className="space-y-3 sm:space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                                    <h3 className="text-sm sm:text-md font-semibold text-gray-600 dark:text-gray-300 mb-1">ID</h3>
                                    <p className="text-base sm:text-lg text-gray-800 dark:text-gray-100 break-words">{registro.id}</p>
                                </div>

                                {registro.nombre && (
                                    <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                                        <h3 className="text-sm sm:text-md font-semibold text-gray-600 dark:text-gray-300 mb-1">Nombre</h3>
                                        <p className="text-base sm:text-lg text-gray-800 dark:text-gray-100 break-words">{registro.nombre}</p>
                                    </div>
                                )}

                                {Object.entries(registro).map(([key, value]) => {
                                    if (key === 'id' || key === 'nombre') return null;

                                    return (
                                        <div key={key} className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                                            <h3 className="text-sm sm:text-md font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </h3>
                                            <p className="text-base sm:text-lg text-gray-800 dark:text-gray-100 break-words">
                                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 sm:mt-8 flex justify-end">
                        <button
                            onClick={onEliminar}
                            className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm sm:text-base"
                        >
                            Eliminar registro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
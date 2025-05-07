'use client';
import { useRouter } from 'next/navigation';
import { useRegistro } from '@/hooks/useRegistro';

export default function RegistroDetalle({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { registro, loading, error, handleEliminar } = useRegistro(params.id);

    // Manejador que llama a handleEliminar y navega tras éxito
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
                    {/* Aquí mostramos el contenido real del registro */}
                    {registro && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                                    <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300 mb-1">ID</h3>
                                    <p className="text-lg text-gray-800 dark:text-gray-100">{registro.id}</p>
                                </div>

                                {registro.nombre && (
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                                        <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300 mb-1">Nombre</h3>
                                        <p className="text-lg text-gray-800 dark:text-gray-100">{registro.nombre}</p>
                                    </div>
                                )}

                                {/* Mostrar las demás propiedades dinámicamente */}
                                {Object.entries(registro).map(([key, value]) => {
                                    // Excluir id y nombre que ya mostramos arriba
                                    if (key === 'id' || key === 'nombre') return null;

                                    return (
                                        <div key={key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                                            <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </h3>
                                            <p className="text-lg text-gray-800 dark:text-gray-100">
                                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={onEliminar}
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
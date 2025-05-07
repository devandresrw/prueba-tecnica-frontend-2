'use client';
import { useRegistros } from '@/hooks/useRegistros';
import { useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpiner';
import PageHeader from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import TableActions from '@/components/ui/TableActions';
import RegistrosTable from '@/components/ui/RegistrosTable';
import DeleteConfirmation from '@/components/ui/DeleteConfirmation';

export default function Registros() {
    const {
        hasData,
        registros,
        loading,
        seedLoading,
        deleteLoading,
        deletingId,
        handleGenerateSeed,
        handleDeleteRegistro,
        handleDeleteAll
    } = useRegistros();

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const requestDeleteAll = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDeleteAll = () => {
        handleDeleteAll();
        setShowDeleteConfirmation(false);
    };

    if (loading) {
        return <LoadingSpinner message="Cargando registros..." />;
    }

    return (
        <div className="min-h-screen px-3 py-4 sm:px-4 sm:py-6 md:p-8 bg-mybg dark:bg-mybgdark">
            <PageHeader title="Registros" />

            <div className="max-w-6xl mx-auto">
                {!hasData ? (
                    <EmptyState
                        message="No hay registros en la base de datos."
                        buttonLabel="Generar datos de prueba"
                        loadingLabel="Generando..."
                        isLoading={seedLoading}
                        onAction={handleGenerateSeed}
                    />
                ) : (
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                                Lista de registros ({registros.length})
                            </h2>

                            <TableActions
                                onRegenerate={handleGenerateSeed}
                                onDeleteAll={requestDeleteAll}
                                isRegenerating={seedLoading}
                                isDeleting={deleteLoading}
                                recordCount={registros.length}
                                className="w-full sm:w-auto"
                            />
                        </div>

                        <div className="overflow-x-auto rounded-lg shadow">
                            <RegistrosTable
                                registros={registros}
                                onDeleteRegistro={handleDeleteRegistro}
                                deletingId={deletingId}
                            />
                        </div>
                    </div>
                )}
            </div>
            <DeleteConfirmation
                isOpen={showDeleteConfirmation}
                onConfirm={confirmDeleteAll}
                onCancel={() => setShowDeleteConfirmation(false)}
                title="Eliminar todos los registros"
                message="¿Estás seguro que deseas eliminar todos los registros? Esta acción no se puede deshacer."
            />
        </div>
    );
}
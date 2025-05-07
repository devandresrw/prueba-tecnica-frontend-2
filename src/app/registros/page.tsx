'use client';
import { useRegistros } from '@/hooks/useRegistros';
import { useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpiner';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
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

    // Estado para el modal de confirmación de eliminación global
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // Manejador para solicitar confirmación antes de eliminar todos
    const requestDeleteAll = () => {
        setShowDeleteConfirmation(true);
    };

    // Manejador para confirmar eliminación de todos los registros
    const confirmDeleteAll = () => {
        handleDeleteAll();
        setShowDeleteConfirmation(false);
    };

    if (loading) {
        return <LoadingSpinner message="Cargando registros..." />;
    }

    return (
        <div className="min-h-screen p-8 bg-mybg dark:bg-mybgdark">
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
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Lista de registros ({registros.length})
                            </h2>

                            <TableActions
                                onRegenerate={handleGenerateSeed}
                                onDeleteAll={requestDeleteAll}
                                isRegenerating={seedLoading}
                                isDeleting={deleteLoading}
                                recordCount={registros.length}
                            />
                        </div>

                        <RegistrosTable
                            registros={registros}
                            onDeleteRegistro={handleDeleteRegistro}
                            deletingId={deletingId}
                        />
                    </div>
                )}
            </div>

            {/* Modal de confirmación para eliminar todos los registros */}
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
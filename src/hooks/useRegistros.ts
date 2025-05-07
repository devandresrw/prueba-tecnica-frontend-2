import { useState, useEffect } from 'react';
import { indexedDBService } from '@/services/db.service';

export function useRegistros() {
    const [hasData, setHasData] = useState<boolean | null>(null);
    const [registros, setRegistros] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [seedLoading, setSeedLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

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

    const handleDeleteAll = async () => {
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

    return {
        hasData,
        registros,
        loading,
        seedLoading,
        deleteLoading,
        deletingId,
        handleGenerateSeed,
        handleDeleteRegistro,
        handleDeleteAll
    };
}
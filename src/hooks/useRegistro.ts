import { useState, useEffect } from 'react';
import { indexedDBService } from '@/services/db.service';

export function useRegistro(registroId: string) {
    const [registro, setRegistro] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function cargarRegistro() {
            try {
                setLoading(true);
                await indexedDBService.init();
                const data = await indexedDBService.getRegistro(registroId);

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
    }, [registroId]);

    const handleEliminar = async (onSuccess?: () => void) => {
        if (!window.confirm('¿Estás seguro que deseas eliminar este registro?')) {
            return;
        }

        try {
            setLoading(true);
            await indexedDBService.deleteRegistro(registroId);
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error('Error al eliminar:', err);
            setError('Error al eliminar el registro');
            setLoading(false);
        }
    };

    return {
        registro,
        loading,
        error,
        handleEliminar
    };
}
import { FormType } from "@/schemas/form.schema";
import { indexedDBService } from "@/services/db.service";

export const RegistroService = {
    submitForm: async (formData: FormType, recaptchaToken?: string) => {
        try {
            // 1. Enviar datos a la API
            const response = await fetch('/api/registros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    recaptchaToken
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error al procesar el registro');
            }

            // 2. Si la API responde correctamente, guardar también en IndexedDB
            await indexedDBService.init();
            await indexedDBService.addRegistro({
                id: result.data.id,
                ...formData,
                createdAt: new Date().toISOString()
            });

            return result;
        } catch (error) {
            console.error("Error en el servicio de registro:", error);
            throw error;
        }
    },

    getRegistros: async () => {
        await indexedDBService.init();
        return indexedDBService.getAllRegistros();
    },

    hasRegistros: async () => {
        await indexedDBService.init();
        return indexedDBService.hasRegistros();
    },

    generateSeed: async (count?: number) => {
        await indexedDBService.init();
        return indexedDBService.seedData(count);
    }
};
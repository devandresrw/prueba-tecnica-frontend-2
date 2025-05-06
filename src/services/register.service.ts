import { FormType } from "@/schemas/form.schema";

export interface RegisterResponse {
    success: boolean;
    message: string;
    id?: string;
}

export class RegisterService {
    /**
     * Envía los datos del formulario al endpoint de registros
     */
    static async registerUser(data: FormType & { recaptchaToken?: string }): Promise<RegisterResponse> {
        try {
            const response = await fetch('/api/registros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    message: errorData.message || 'Error al procesar la solicitud',
                };
            }

            const result = await response.json();
            return {
                success: true,
                message: 'Registro exitoso',
                id: result.id,
            };
        } catch (error) {
            console.error('Error al registrar usuario:', error);

            // Si hay un error de red, intentamos guardar localmente
            await IndexedDBService.saveRegistration(data);

            return {
                success: true,
                message: 'Registro guardado localmente. Se sincronizará cuando haya conexión.',
            };
        }
    }

    /**
     * Obtiene todos los registros (para testing o sincronización)
     */
    static async getAllRegisters(): Promise<FormType[]> {
        try {
            const response = await fetch('/api/registros');
            if (!response.ok) {
                throw new Error('Error al obtener registros');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener registros:', error);

            // Si falla, obtenemos de IndexedDB
            return await IndexedDBService.getAllRegistrations();
        }
    }
}

/**
 * Servicio para manejar el almacenamiento local con IndexedDB
 */
export class IndexedDBService {
    private static readonly DB_NAME = 'registrationDB';
    private static readonly STORE_NAME = 'registrations';
    private static readonly DB_VERSION = 1;

    /**
     * Inicializa la base de datos
     */
    static async initDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

            request.onerror = (event) => {
                reject('Error al abrir la base de datos');
            };

            request.onsuccess = (event) => {
                resolve(request.result);
            };

            request.onupgradeneeded = (event) => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    db.createObjectStore(this.STORE_NAME, { keyPath: 'id', autoIncrement: true });
                }
            };
        });
    }

    /**
     * Guarda un registro en IndexedDB
     */
    static async saveRegistration(data: FormType): Promise<string> {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);

            // Añadimos timestamp para facilitar sincronización
            const registration = {
                ...data,
                createdAt: new Date().toISOString(),
                synced: false
            };

            const request = store.add(registration);

            request.onsuccess = () => {
                resolve(request.result.toString());
            };

            request.onerror = () => {
                reject('Error al guardar el registro');
            };
        });
    }

    /**
     * Obtiene todos los registros de IndexedDB
     */
    static async getAllRegistrations(): Promise<FormType[]> {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject('Error al obtener los registros');
            };
        });
    }

    /**
     * Sincroniza registros pendientes con el servidor
     * (Útil cuando recuperamos la conexión)
     */
    static async syncPendingRegistrations(): Promise<void> {
        try {
            const registrations = await this.getAllRegistrations();
            const unsyncedRegistrations = registrations.filter(reg => !(reg as any).synced);

            for (const registration of unsyncedRegistrations) {
                try {
                    await fetch('/api/registros', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(registration),
                    });

                    // Actualizar como sincronizado
                    // (Aquí implementaríamos la lógica para marcar como sincronizado)
                } catch (error) {
                    console.error('Error al sincronizar registro:', error);
                }
            }
        } catch (error) {
            console.error('Error en la sincronización:', error);
        }
    }
}
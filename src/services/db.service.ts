import { FormType } from "@/schemas/form.schema";

const DB_NAME = "registrosDB";
const DB_VERSION = 1;
const STORE_NAME = "registros";

interface RegistroExtendido extends FormType {
    id: string;
    createdAt: string;
}

export class IndexedDBService {
    private db: IDBDatabase | null = null;

    // Inicializar la base de datos
    async init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                console.error("Su navegador no soporta IndexedDB");
                resolve(false);
                return;
            }

            const request = window.indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (event) => {
                console.error("Error al abrir la base de datos", event);
                resolve(false);
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                console.log("Base de datos abierta correctamente");
                resolve(true);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Crear el almacén de objetos si no existe
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
                    store.createIndex("email", "email", { unique: true });
                    store.createIndex("createdAt", "createdAt", { unique: false });
                    console.log("Almacén de objetos creado");
                }
            };
        });
    }

    // Agregar un registro
    async addRegistro(registro: RegistroExtendido): Promise<string> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(registro);

            request.onsuccess = () => {
                resolve(registro.id);
            };

            request.onerror = (event) => {
                console.error("Error al guardar registro", event);
                reject(new Error("Error al guardar registro"));
            };
        });
    }

    // Verificar si hay registros
    async hasRegistros(): Promise<boolean> {
        if (!this.db) await this.init();

        return new Promise((resolve) => {
            const transaction = this.db!.transaction([STORE_NAME], "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const countRequest = store.count();

            countRequest.onsuccess = () => {
                resolve(countRequest.result > 0);
            };

            countRequest.onerror = () => {
                resolve(false);
            };
        });
    }

    // Obtener todos los registros
    async getAllRegistros(): Promise<RegistroExtendido[]> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([STORE_NAME], "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                console.error("Error al obtener registros", event);
                reject(new Error("Error al obtener registros"));
            };
        });
    }



    // Agregar estos dos métodos al servicio existente

    // Eliminar un registro por su ID
    async deleteRegistro(id: string): Promise<boolean> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => {
                console.log(`Registro con ID ${id} eliminado correctamente`);
                resolve(true);
            };

            request.onerror = (event) => {
                console.error("Error al eliminar registro", event);
                reject(new Error("Error al eliminar registro"));
            };
        });
    }

    // Eliminar todos los registros
    async deleteAllRegistros(): Promise<boolean> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.clear();

            request.onsuccess = () => {
                console.log("Todos los registros eliminados correctamente");
                resolve(true);
            };

            request.onerror = (event) => {
                console.error("Error al eliminar todos los registros", event);
                reject(new Error("Error al eliminar todos los registros"));
            };
        });
    }

    // Generar datos semilla
    async seedData(count: number = 10): Promise<boolean> {
        if (!this.db) await this.init();

        try {
            const transaction = this.db!.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);

            // Limpiar datos existentes
            store.clear();

            // Generar nuevos datos
            for (let i = 0; i < count; i++) {
                const hasCompanion = Math.random() > 0.7;
                const registro: RegistroExtendido = {
                    id: crypto.randomUUID(),
                    fullName: `Usuario de Prueba ${i + 1}`,
                    email: `usuario${i + 1}@universidad.edu.co`,
                    semester: Math.floor(Math.random() * 10) + 1,
                    companion: hasCompanion,
                    companionName: hasCompanion ? `Acompañante ${i + 1}` : undefined,
                    terms: true,
                    createdAt: new Date().toISOString()
                };

                store.add(registro);
            }

            return true;
        } catch (error) {
            console.error("Error al generar datos semilla", error);
            return false;
        }
    }
}

// Exportar una instancia única
export const indexedDBService = new IndexedDBService();
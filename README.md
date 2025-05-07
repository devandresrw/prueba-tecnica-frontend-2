# Prueba Técnica Frontend II - Formulario Inscripcion Fiesta

Este proyecto es una aplicación web desarrollada con Next.js que implementa un formulario interactivo con validaciones, almacenamiento local y efectos visuales.

## Requisitos previos

- Node.js 18 o superior
- npm 

## Instalación y ejecución

Para instalar y ejecutar la aplicación en un solo paso:

```bash
npm run all
```

Este comando instalará todas las dependencias y luego iniciará el servidor de desarrollo.

Alternativamente, puedes ejecutar cada paso por separado:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run all` | Instala dependencias e inicia el servidor de desarrollo |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera una versión optimizada para producción |
| `npm run start` | Ejecuta la versión de producción |
| `npm run lint` | Ejecuta el linter para verificar el código |

## Características principales

- **Formulario interactivo** con validaciones en tiempo real mediante Zod y React Hook Form
- **Modo oscuro/claro** implementado con Tailwind CSS y Zustand
- **Visualizaciones 3D** utilizando React Three Fiber
- **Almacenamiento local** con IndexedDB para guardar los registros del formulario
- **Protección contra bots** con Google reCAPTCHA v3
- **Interfaz responsiva** adaptada a diferentes dispositivos

## Flujos de prueba

### 1. Validación del formulario

- Abrir [http://localhost:3000](http://localhost:3000)
- Intentar enviar el formulario vacío para ver las validaciones
- Probar diferentes correos electrónicos (el sistema sólo acepta correos con dominio `.edu.co`)
- Marcar "¿Vendrás con acompañante?" para ver cómo aparece el campo adicional

### 2. Gestión de registros

- Enviar un formulario correctamente
- Visitar [http://localhost:3000/registros](http://localhost:3000/registros)
- Usar el botón "Generar datos de prueba" para poblar la tabla
- Probar las funciones de eliminar registros
- Puedes hacer una curl para probar el enpoind /inscripciones

```
curl -X POST http://localhost:3000/api/inscripciones \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Nombre Completo",
    "email": "ejemplo@universidad.edu.co",
    "telefono": "1234567890",
    "semester": 5,
    "traerAcompanante": false,
    "terms": true,
    "comentarios": "Prueba desde curl"
  }'
```

### 3. Vista detalle

- En la página de registros, hacer clic en cualquier ID o nombre
- Explorar la página de detalle del registro
- Probar la funcionalidad de eliminar desde el detalle

### 4. Cambio de tema

- Usar el botón de sol/luna en la cabecera para cambiar entre modo claro y oscuro

## Notas técnicas

- El proyecto utiliza IndexedDB para simular una base de datos en el navegador
- Los datos no persisten entre diferentes navegadores o después de limpiar el almacenamiento
- El reCAPTCHA v3 está configurado con claves de prueba

## Licencia

Este proyecto es parte de una prueba técnica de desarrollo frontend.

---

Desarrollado por Andrés Roldán
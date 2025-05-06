import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { FormSchema } from '@/schemas/form.schema';

// Implementación de la API con IndexedDB
export async function POST(request: NextRequest) {
    try {
        // Obtener y validar los datos
        const data = await request.json();

        // Validamos los datos con nuestro schema
        const validationResult = FormSchema.safeParse(data);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Datos de formulario inválidos',
                    errors: validationResult.error.errors
                },
                { status: 400 }
            );
        }

        // Verificar reCAPTCHA
        if (data.recaptchaToken) {
            try {
                const recaptchaResponse = await fetch(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${data.recaptchaToken}`,
                    { method: 'POST' }
                );

                const recaptchaResult = await recaptchaResponse.json();

                if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
                    console.log('reCAPTCHA verificación fallida:', recaptchaResult);
                    return NextResponse.json(
                        { success: false, message: 'Verificación de seguridad fallida' },
                        { status: 400 }
                    );
                }

                console.log('reCAPTCHA verificado con score:', recaptchaResult.score);
            } catch (recaptchaError) {
                console.error('Error al verificar reCAPTCHA:', recaptchaError);
            }
        }

        // Crear nuevo registro con ID único
        const newRegistration = {
            id: uuidv4(),
            ...validationResult.data,
            createdAt: new Date().toISOString()
        };

        // La operación con IndexedDB se realiza en el frontend
        // Aquí solo simulamos una respuesta exitosa para API directas

        // Devolver respuesta exitosa
        return NextResponse.json({
            success: true,
            message: 'Registro creado correctamente',
            data: newRegistration
        }, { status: 201 });

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

// Manejar solicitud GET para obtener todos los registros
export async function GET() {
    // En un endpoint real, aquí se accedería a la base de datos
    // Para APIs directas, devolvemos un mensaje informativo
    return NextResponse.json({
        message: "Para ver los registros, visite la página /registros",
        info: "Los datos se almacenan en IndexedDB del navegador"
    });
}
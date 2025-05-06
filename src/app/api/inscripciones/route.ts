import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const data = await request.json();

        // Aquí procesarías los datos de la inscripción
        console.log('Datos de inscripción recibidos:', data);

        // Devolver respuesta exitosa
        return NextResponse.json({
            success: true,
            message: 'Inscripción registrada correctamente'
        });

    } catch (error) {
        console.error('Error al procesar la inscripción:', error);

        // Devolver respuesta de error
        return NextResponse.json(
            { success: false, message: 'Error al procesar la inscripción' },
            { status: 500 }
        );
    }
}
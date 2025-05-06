'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, type FormType } from '@/schemas/form.schema'
import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { RegistroService } from '@/services/register.service'

// Definimos un tipo para el estado de envío
type SendStatus = {
    success?: boolean;
    message?: string;
}

// Tipo extendido con token de reCAPTCHA
type ContactFormDataWithToken = FormType & {
    recaptchaToken: string;
}

export const useFormHandle = () => {
    // Hook de reCAPTCHA
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Definimos el estado para los mensajes de éxito/error
    const [sendStatus, setSendStatus] = useState<SendStatus>({});
    const [compain, setCompain] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { isLoading, errors, isSubmitSuccessful, isSubmitting }
    } = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            semester: undefined,
            companion: false,
            companionName: '',
            terms: false
        },
        mode: 'onChange'
    });

    const onSubmit = async (data: FormType) => {
        console.log("Datos del formulario:", data);
        try {
            // Ejecutar reCAPTCHA y obtener token
            let recaptchaToken: string | undefined;
            if (executeRecaptcha) {
                try {
                    recaptchaToken = await executeRecaptcha('formulario_registro');
                } catch (recaptchaError) {
                    console.warn("No se pudo ejecutar reCAPTCHA:", recaptchaError);
                }
            }

            // Enviar datos utilizando el servicio
            const response = await RegistroService.submitForm(data, recaptchaToken);

            // Establecer estado de éxito
            setSendStatus({
                success: true,
                message: response.message || 'Registro completado con éxito'
            });

            // Resetear formulario
            reset();

        } catch (error) {
            console.error("Error al enviar formulario:", error);
            setSendStatus({
                success: false,
                message: error instanceof Error ? error.message : 'Error al procesar el registro'
            });
        }
    };

    return {
        register,
        handleSubmit,
        control,
        onSubmit,
        errors,
        isSubmitting,
        isLoading,
        isSubmitSuccessful,
        sendStatus,
        setCompain,
        compain,
        resetSendStatus: () => setSendStatus({}),
        formState: { isValid: !Object.keys(errors).length } // Añadir formState aquí
    };
};
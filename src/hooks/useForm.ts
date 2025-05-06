'use client'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, type FormType } from '@/schemas/form.schema'
import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { RegisterService } from "@/services/register.service"

// Definimos un tipo para el estado de envío
type SendStatus = {
    success?: boolean;
    message?: string;
}

// Tipo extendido con token de reCAPTCHA
type ContactFormDataWithToken = FormType & {
    recaptchaToken: string;
}

export const useFormContact = () => {
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
        mode: 'onChange'
    });

    const onSubmit = async (data: FormType) => {
        try {
            // Ejecutar reCAPTCHA y obtener token
            let recaptchaToken: string | undefined;
            if (executeRecaptcha) {
                recaptchaToken = await executeRecaptcha('formulario_contacto');
            }

            // Enviar datos al servicio de registro
            const response = await RegisterService.registerUser({
                ...data,
                recaptchaToken
            });

            // Actualizar estado según la respuesta
            setSendStatus({
                success: response.success,
                message: response.message
            });

            // Si es exitoso, resetear el formulario
            if (response.success) {
                reset();
                setCompain(false);
            }
        } catch (error) {
            console.error("Error al enviar formulario:", error);
            setSendStatus({
                success: false,
                message: "Ocurrió un error al enviar el formulario. Inténtalo de nuevo."
            });
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        isLoading,
        isSubmitSuccessful,
        sendStatus,
        Controller,
        control,
        setCompain,
        compain,
        resetSendStatus: () => setSendStatus({})
    };
};
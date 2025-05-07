'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, type FormType } from '@/schemas/form.schema'
import { useState, useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { RegistroService } from '@/services/register.service'

type SendStatus = {
    success?: boolean;
    message?: string;
}


export const useFormHandle = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [sendStatus, setSendStatus] = useState<SendStatus>({});
    const [compain, setCompain] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { isLoading, errors, isSubmitSuccessful, isSubmitting },
        setValue,
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

    const fullName = watch('fullName');
    const email = watch('email');
    const semester = watch('semester');
    const terms = watch('terms');
    const companion = watch('companion');
    const companionName = watch('companionName');

    useEffect(() => {
        // Verificar si los campos obligatorios están llenos y sin errores
        const mandatoryFieldsValid =
            fullName &&
            email &&
            semester &&
            terms &&
            !errors.fullName &&
            !errors.email &&
            !errors.semester &&
            !errors.terms;

        // Si companion está activado, también verificar companionName
        const companionFieldValid = companion
            ? companionName && !errors.companionName
            : true;

        setIsFormValid(Boolean(mandatoryFieldsValid && companionFieldValid));
    }, [fullName, email, semester, terms, companion, companionName, errors]);

    const onSubmit = async (data: FormType) => {
        console.log("Datos del formulario:", data);
        try {
            let recaptchaToken: string | undefined;
            if (executeRecaptcha) {
                try {
                    recaptchaToken = await executeRecaptcha('formulario_registro');
                } catch (recaptchaError) {
                    console.warn("No se pudo ejecutar reCAPTCHA:", recaptchaError);
                }
            }

            const response = await RegistroService.submitForm(data, recaptchaToken);

            setSendStatus({
                success: true,
                message: response.message || 'Registro completado con éxito'
            });

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
        setValue,
        resetSendStatus: () => setSendStatus({}),
        formState: { isValid: isFormValid }
    };
};
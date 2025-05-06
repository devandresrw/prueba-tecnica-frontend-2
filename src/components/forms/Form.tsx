'use client'
import dynamic from "next/dynamic";
import { useFormContact } from "@/hooks/useForm";
import { useEffect, useState } from "react";
import { FaXRay } from "react-icons/fa";
import clsx from "clsx";



const ReCAPTCHA = dynamic(
    () => import('@/providers/RecaptchaProvider')
        .then(e => e.RecaptchaProvider), {
    ssr: false
})

const Input = dynamic(
    () => import('@/components/ui/InputComponent')
        .then(e => e.InputComponentMemo), {
    ssr: false
})

const Error = dynamic(
    () => import('@/components/ui/Erorr')
        .then(e => e.ErrorComponentMemo), {
    ssr: false
})

const Label = dynamic(
    () => import('@/components/ui/LabelComponent')
        .then(e => e.LabelComponentMemo), {
    ssr: false
})

const Checkbox = dynamic(
    () => import('@/components/ui/CheckBoxComponent')
        .then(e => e.InputComponentMemo), {
    ssr: false
})

export const ContactForm = () => {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        isLoading,
        sendStatus,
        resetSendStatus,
        Controller,
        control,
        compain,
        setCompain
    } = useFormContact();

    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (sendStatus.success !== undefined) {
            setIsModalOpen(true);
        }
    }, [sendStatus]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetSendStatus();
    };

    return (
        <ReCAPTCHA>
            <div className="border-2 border-mybgdark dark:border-mybg
            p-10 rounded-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-center items-center
                    gap-2">
                    <div className="flex justify-center items-center w-full gap-5">
                        <div className="w-full">
                            <Label
                                htmlFor="Nombre Completo"
                                text="Nombre Completo:"
                                key={'full name'} />
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Nombre"
                                        className={clsx(`my-input`, {
                                            ['my-input-error']: errors.fullName
                                        })}
                                    />
                                )}
                            />
                            <Error>{errors.fullName && errors.fullName.message}</Error>
                        </div>

                        <div className="w-full">
                            <Label
                                htmlFor="Correo institucional"
                                text="Correo Institucional:"
                                key={'email'} />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="tuemail@edu.co"
                                        className={clsx(`my-input`, {
                                            ['my-input-error']: errors.email
                                        })}
                                    />
                                )}
                            />
                            <Error>{errors.email && errors.email.message}</Error>
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-full
                    gap-5">
                        <div className="flex-1">
                            <Label
                                htmlFor="semester"
                                text="Semestre actual:"
                                key={'semester'} />
                            <Controller
                                name="semester"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="de 1 a 10"
                                        className={clsx(`my-input`, {
                                            ['my-input-error']: errors.semester
                                        })}
                                    />
                                )}
                            />
                            <Error>{errors.semester && errors.semester.message}</Error>
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="flex gap-5">
                                <Label
                                    htmlFor="companion"
                                    text="¿Tienes alguna acompañante?"
                                    key={'companion'} />
                                <Controller
                                    name="companion"
                                    control={control}
                                    render={({ field: { onChange, value, name, ref, ...restField } }) => (
                                        <Checkbox
                                            id="companion"
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => {
                                                onChange(e); // Actualiza react-hook-form
                                                setCompain(e.target.checked); // Actualiza el estado local
                                            }}
                                            name={name}
                                            {...restField}
                                            className="my-checkbox"
                                        />
                                    )}
                                />
                            </div>
                            {compain && (
                                <div className="">
                                    <Label
                                        htmlFor="companionName"
                                        text="Nombre del acompañante:"
                                        key={'companionName'} />
                                    <Controller
                                        name="companionName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="Nombre completo del acompañante"
                                                className={clsx(`my-input`, {
                                                    ['my-input-error']: errors.companionName
                                                })}
                                            />
                                        )}
                                    />
                                    <Error>{errors.companionName && errors.companionName.message}</Error>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full gap-5">
                        <Label htmlFor="terms" text="¿Aceptas los términos y condiciones?" key={'terms'} />
                        <Controller
                            name="terms"
                            control={control}
                            render={({ field: { onChange, value, ...restField } }) => (
                                <Checkbox
                                    id="terms"
                                    type="checkbox"
                                    checked={value}
                                    {...register('terms')}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    className="my-checkbox"
                                />
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="
                        bg-[#3e3d3d]/10 px-8 py-2 rounded-lg shadow-lg border-[1px] border-white/[0.18]
                        backdrop-blur-[8.5px] backdrop-filter text-white text-sm w-full
                        hover:bg-[#3e3d3d]/40 transition duration-300 ease-in-out
                        disabled:opacity-50 disabled:cursor-not-allowed">
                            {isSubmitting || isLoading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>
                </form>
                <FeedbackModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    success={sendStatus.success}
                    message={sendStatus.message}
                />
            </div>
        </ReCAPTCHA>

    )
}




// Componente Modal
const FeedbackModal = ({
    isOpen,
    onClose,
    success,
    message
}: {
    isOpen: boolean;
    onClose: () => void;
    success?: boolean;
    message?: string;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* Contenedor del modal con efecto glassmorphism */}
            <div className="relative bg-[#3e3d3d]/20 p-6 rounded-lg shadow-xl border-[1px] border-white/[0.18]
                backdrop-blur-[12px] backdrop-filter w-11/12 max-w-md z-10 animate-fade-in-up">
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white/80 hover:text-white"
                >
                    <FaXRay className="h-6 w-6" />
                </button>
                {/* Icono de éxito/error */}
                <div className="flex justify-center mb-4">
                    {success ? (
                        <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    ) : (
                        <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                            <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    )}
                </div>
                {/* Título */}
                <h3 className="text-xl font-semibold text-center text-white mb-2">
                    {success ? '¡Mensaje enviado!' : 'Error al enviar'}
                </h3>
                {/* Mensaje */}
                <p className="text-center text-white/80 mb-4">
                    {message || (success ?
                        'Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo pronto.' :
                        'Ocurrió un error al enviar tu mensaje. Por favor intenta nuevamente.'
                    )}
                </p>
                {/* Botón */}
                <button
                    onClick={onClose}
                    className="bg-[#3e3d3d]/30 px-6 py-2 rounded-lg shadow-lg border-[1px] border-white/[0.18]
                        backdrop-blur-[8.5px] backdrop-filter text-white text-sm w-full
                        hover:bg-[#3e3d3d]/50 transition duration-300 ease-in-out"
                >
                    {success ? 'Genial' : 'Intentar nuevamente'}
                </button>
            </div>
        </div>
    );
};

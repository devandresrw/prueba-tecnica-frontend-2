'use client'
import dynamic from 'next/dynamic';
import { memo, useEffect } from 'react';
import { useFormHandle } from '@/hooks/useForm';
import { useWatch } from 'react-hook-form';
import clsx from 'clsx';

const Error = dynamic(
    () => import('@/components/ui/Error').then((mod) => mod.ErrorComponentMemo),
    { ssr: true }
)

const Form = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        compain,
        setCompain,
        onSubmit,
        errors,
        isLoading,
        isSubmitSuccessful,
        isSubmitting,
        sendStatus,
        resetSendStatus,
        formState: { isValid }
    } = useFormHandle();

    // Observar el valor del campo companion para mostrar/ocultar campos condicionales
    const companionValue = useWatch({
        control,
        name: 'companion',
        defaultValue: false
    });

    // Efecto para actualizar el estado local cuando cambia el valor del checkbox
    useEffect(() => {
        setCompain(companionValue);
        if (!companionValue) {
            setValue('companionName', '');
        }
    }, [companionValue, setCompain, setValue]);

    return (
        <div className='border-[0.2px] border-mybgdark dark:border-mybg rounded-lg p-5'>
            <form
                onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='flex flex-col gap-1 h-16 mb-4 w-full'>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nombre completo:*
                    </label>
                    <input
                        {...register('fullName')}
                        type="text"
                        id="fullName"
                        placeholder='Nombre y apellido'
                        className={clsx(`my-input`, {
                            ['my-input-error']: errors.fullName
                        })}
                    />
                    <Error>{errors.fullName?.message}</Error>
                </div>
                <div className='flex flex-col gap-1 h-16 mb-4 w-full'>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email institucional (.edu.co):*
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        id="email"
                        placeholder="correo@universidad.edu.co"
                        className={clsx(`my-input`, {
                            ['my-input-error']: errors.email
                        })}
                    />
                    <Error>{errors.email?.message}</Error>
                </div>


                <div className='flex flex-col  mb-4'>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Semestre:*
                    </label>
                    <input
                        {...register('semester')}
                        type="number"
                        id="semester"
                        min="1"
                        max="10"
                        placeholder='Semestre actual 1 - 10'
                        className={clsx(`my-input`, {
                            ['my-input-error']: errors.semester
                        })}
                    />
                    <Error>{errors.semester?.message}</Error>
                </div>

                <div className='mb-4'>
                    <div className="flex items-center">
                        <input
                            {...register('companion')}
                            type="checkbox"
                            id="companion"
                            className={clsx(`my-checkbox`, {
                                ['my-checkbox-error']: errors.companion
                            })}
                        />
                        <label htmlFor="companion" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                            ¿Vendrás con acompañante?
                        </label>
                    </div>
                </div>

                {companionValue && (
                    <div className='mb-4'>
                        <label htmlFor="companionName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nombre del acompañante*
                        </label>
                        <input
                            {...register('companionName')}
                            type="text"
                            id="companionName"
                            placeholder="Nombre completo"
                            className={clsx(`my-input`, {
                                ['my-input-error']: errors.companionName
                            })}
                        />
                        <Error>{errors.companionName?.message}</Error>
                    </div>
                )}

                <div className='mb-4'>
                    <label className="flex items-center">
                        <input
                            {...register('terms')}
                            type="checkbox"
                            id="terms"
                            className={clsx(`my-checkbox`, {
                                ['my-checkbox-error']: errors.companion
                            })}

                        />
                        <span className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                            Acepto los términos y condiciones*
                        </span>
                    </label>
                    <Error>{errors.terms?.message}</Error>
                </div>

                <div className='text-center '>
                    <button
                        type='submit'
                        disabled={isSubmitting || !isValid}
                        className={`px-4 py-2 bg-slate-400 text-white rounded-md
                             hover:bg-slate-600 focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-slate-800 w-full
                            ${(isSubmitting || !isValid) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>

                {sendStatus.success === true && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-200 text-green-700 rounded-md">
                        ¡Registro enviado con éxito! {sendStatus.message}
                    </div>
                )}

                {sendStatus.success === false && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded-md">
                        Ha ocurrido un error: {sendStatus.message || 'Por favor, inténtalo de nuevo.'}
                    </div>
                )}
            </form>
        </div>
    );
};

export const FormMemo = memo(Form);
FormMemo.displayName = 'FormMemo';
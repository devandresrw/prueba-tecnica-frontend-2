'use client'
import dynamic from 'next/dynamic';
import { memo, useEffect } from 'react';
import { useFormHandle } from '@/hooks/useForm';
import { useWatch } from 'react-hook-form';

const Error = dynamic(
    () => import('@/components/ui/Error').then((mod) => mod.ErrorComponentMemo),
    { ssr: true }
)

const Form = () => {
    const {
        register,
        handleSubmit,
        control,
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
    }, [companionValue, setCompain]);

    return (
        <div className='border-2 border-mybgdark dark:border-mybg rounded-lg p-5'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='flex flex-col md:flex-row gap-4 mb-4'>
                    <div className='flex-1'>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nombre completo*
                        </label>
                        <input
                            {...register('fullName')}
                            type="text"
                            id="fullName"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                        />
                        <Error>{errors.fullName?.message}</Error>
                    </div>
                    <div className='flex-1'>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email institucional (.edu.co)*
                        </label>
                        <input
                            {...register('email')}
                            type="email"
                            id="email"
                            placeholder="correo@universidad.edu.co"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                        />
                        <Error>{errors.email?.message}</Error>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-4 mb-4'>
                    <div className='flex-1'>
                        <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Semestre (1-10)*
                        </label>
                        <input
                            {...register('semester')}
                            type="number"
                            id="semester"
                            min="1"
                            max="10"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                        />
                        <Error>{errors.semester?.message}</Error>
                    </div>
                    <div className='flex-1'></div>
                </div>

                <div className='mb-4'>
                    <div className="flex items-center">
                        <input
                            {...register('companion')}
                            type="checkbox"
                            id="companion"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                            placeholder="Nombre completo del acompañante"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
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
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                            Acepto los términos y condiciones*
                        </span>
                    </label>
                    <Error>{errors.terms?.message}</Error>
                </div>

                <div className='text-center'>
                    <button
                        type='submit'
                        disabled={isSubmitting || !isValid}
                        className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
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
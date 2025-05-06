'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useFormContact } from '@/hooks/useForm';

const Input = dynamic(
  () => import('@/components/ui/InputComponent').then((mod) => mod.InputComponentMemo),
  { ssr: false }
);
const Label = dynamic(
  () => import('@/components/ui/LabelComponent').then((mod) => mod.LabelComponentMemo),
  { ssr: false }
);

const WrapperForm = () => {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    isLoading,
    isSubmitSuccessful,
    onSubmit,
    register,
    //companion,
    //setCompanion
  } = useFormContact();

  return (
    <></>
  );
};

export const WrapperFormMemo = memo(WrapperForm);
WrapperFormMemo.displayName = 'WrapperFormMemo';


/*
<div className="p-10">
      <form
        className="border-2 border-mybgdark dark:border-mybg rounded-lg p-5"
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="formulario-registro"
      >
        <div className="mb-4">
          <Label htmlFor="fullName" text="Nombre completo" />
          <Input
            {...register('fullName')}
            type="text"
            placeholder="Nombre completo"
          />
          <span className="text-red-500 text-sm">
            {errors.fullName?.message}
          </span>
        </div>

      <div className="mb-4">
          <Label htmlFor="email" text="Correo electrónico" />
          <Input
            id="email"
            {...register('email')}
            type="email"
            placeholder="correo@ejemplo.edu.co"
          />
          <span className="text-red-500 text-sm">
            {errors.email?.message}
          </span>
        </div>

        <div className="mb-4">
          <Label htmlFor="semester" text="Semestre" />
          <Input
            {...register('semester')}
            type="number"
            min="1"
            max="10"
            placeholder="Semestre actual"
          />
          <span className="text-red-500 text-sm">
            {errors.semester?.message}
          </span>
        </div>

        <div className="mb-4 flex items-center">
          <input
            {...register('companion')}
            type="checkbox"
            id="companion"
            className="mr-2"
            onChange={(e) => {
              setCompanion(e.target.checked);
            }}
          />
          <Label htmlFor="companion" text="¿Vienes con acompañante?" />
          <span className="text-red-500 text-sm ml-2">
            {errors.companion?.message}
          </span>
        </div>

        {companion && (
          <div className="mb-4">
            <Label htmlFor="companionName" text="Nombre del acompañante" />
            <Input
              {...register('companionName')}
              type="text"
              placeholder="Nombre completo del acompañante"
            />
            <span className="text-red-500 text-sm">
              {errors.companionName?.message}
            </span>
          </div>
        )}

        
        <div className="mb-4 flex items-center">
          <input
            {...register('terms')}
            type="checkbox"
            id="terms"
            className="mr-2"
          />
          <Label htmlFor="terms" text="Acepto los términos y condiciones" />
          <span className="text-red-500 text-sm ml-2">
            {errors.terms?.message}
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSubmitSuccessful || isLoading}
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md ${isSubmitting || isSubmitSuccessful ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitting || isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      
      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
        <h3 className="font-bold">Errores actuales:</h3>
        <pre className="text-xs overflow-auto max-h-40">
          {JSON.stringify(errors, null, 2)}
        </pre>
      </div>
    </div>


*/
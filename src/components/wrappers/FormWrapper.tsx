'use client'
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useHandleForm } from '@/hooks/useHandleForm'


const Input = dynamic(
  () => import('@/components/ui/InputComponent').then((mod) => mod.InputComponentMemo),
  { ssr: false }
)
const Checkbox = dynamic(
  () => import('@/components/ui/CheckBoxComponent').then((mod) => mod.InputComponentMemo),
  { ssr: false }
)
const Label = dynamic(
  () => import('@/components/ui/LabelComponent').then((mod) => mod.LabelComponentMemo),
  { ssr: false }
)

const WrapperForm = () => {

  const {
    companion,
    errors,
    handleSubmit,
    isSubmitting,
    isValidating,
    onSubmit,
    register,
    reset,
    setCompanion
  } = useHandleForm();

  return (
    <div className='p-10'>
      <form
        className="border-2 border-mybgdark dark:border-mybg rounded-lg p-5"
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="formulario-registro"
      >
        <h1 id="formulario-registro" className="text-lg font-bold mb-4">
          Formulario
        </h1>
        <div className="mb-4">
          <Label htmlFor="fullName" text="Nombre completo *" />
          <Input
            type="text"
            placeholder="Ingresa tu nombre completo"
            {...register('fullName')}
            required
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="email" text="Correo institucional" />
          <Input
            type="email"
            placeholder="Ingresa tu correo"
            {...register('email')}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="semester" text="Semestre actual" />
          <Input
            id="semester"
            type="number"
            placeholder="Ingresa tu semestre"
            {...register('semester', { valueAsNumber: true })}
            required
          />
          {errors.semester && (
            <p className="text-red-500 text-sm mt-1">{errors.semester.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Checkbox
            id="companion"
            name="companion"

            checked={companion}
            onChange={(e) => setCompanion(e.target.checked)}
          />
          {companion && (
            <div className="mt-4">
              <Label htmlFor="companionName" text="Nombre del acompañante" />
              <Input
                id="companionName"

                type="text"
                placeholder="Ingresa el nombre del acompañante"
                {...register('companionName')}
              />
              {errors.companionName && (
                <p className="text-red-500 text-sm mt-1">{errors.companionName.message}</p>
              )}
            </div>
          )}
        </div>
        <div className="mb-4">
          <Checkbox
            id="terms"
            {...register('terms')}
          />
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isValidating}
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md ${isSubmitting || isValidating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitting || isValidating ? 'Enviando...' : 'Enviar'}
        </button>
        <span className="text-red-500 text-sm mt-2 block">
          {errors.root?.message}
        </span>
      </form>
    </div>
  );
};

{
  /*
  <form aria-labelledby="form-title">
<h2 id="form-title">Formulario de Registro</h2>

<div>
  <label for="nombre">
    Nombre completo <span aria-hidden="true">*</span>
  </label>
  <input 
    type="text" 
    id="nombre" 
    name="nombre" 
    required 
    aria-required="true" 
    placeholder="Ej. Andrés Ramírez"
  />
</div>

<div>
  <input 
    type="checkbox" 
    id="terminos" 
    name="terminos" 
    required 
    aria-required="true"
  />
  <label for="terminos">
    Acepto los términos y condiciones
  </label>
</div>

<button type="submit">Enviar</button>
</form>

  
  */
}

export const WrapperFormMemo = memo(WrapperForm);
WrapperFormMemo.displayName = 'WrapperFormMemo';
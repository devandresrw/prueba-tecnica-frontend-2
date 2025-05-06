'use client'
import { useFormLogin } from "@/hooks"
export const LoginForm = () => {
  const { register, handleSubmit, errors } = useFormLogin();

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <div className="bg-neograbox shadow-neoshabox
    w-[320px] h-[320px] p-4 rounded-lg">
      <form onSubmit={onFormSubmit}
        method="POST"

      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required
            {...register('identifier')} />
          {errors.identifier && <span>{errors.identifier.message}</span>}

        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required
            {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}

        </div>
        <div className="">
          <button type="submit" className="border-red-500
          border-[1px]" >Login</button>
        </div>
      </form>
    </div>
  )
}
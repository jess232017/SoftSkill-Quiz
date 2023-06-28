import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useForm, useFormState } from 'react-hook-form'

interface IForm {
  name: string
}

const Home = () => {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const { register, handleSubmit, control } = useForm<IForm>()
  const { errors } = useFormState({ control })

  const onSubmit = ({ name }: IForm) => {
    navigate('/form', { state: { name } })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <div>
      <div
        className='flex h-screen w-screen items-center justify-center
    bg-black'>
        <form
          action='POST'
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-5 rounded-xl bg-white p-10 drop-shadow-lg'>
          <h1 className='text-center text-3xl'>Formulario</h1>

          {message && message !== '' && (
            <div
              className='mb-4 flex rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800'
              role='alert'>
              <svg
                aria-hidden='true'
                className='mr-3 inline h-5 w-5 shrink-0'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'></path>
              </svg>
              <span className='sr-only'>Info</span>
              <div>{message}.</div>
            </div>
          )}

          <div className='flex flex-col space-y-2'>
            <label className='text-sm font-light' htmlFor='email'>
              Ingrese su nombre
            </label>
            <input
              required
              className='w-96 rounded-md border border-slate-400 px-3 py-2'
              type='text'
              placeholder='Ingrese su nombre'
              id='name'
              {...register('name', { required: true })}
            />
            {errors.name && <span className='text-sm text-red-500'>{errors.name?.message?.toString()}</span>}
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              className='mt-4 rounded-md bg-blue-600 px-10 py-2 text-white
            duration-300 ease-in hover:bg-blue-500 hover:drop-shadow-md'>
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Home = () => {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    navigate('/form')
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
        className='w-screen h-screen flex justify-center items-center
    bg-black'>
        <form
          action='POST'
          onSubmit={handleSubmit(onSubmit)}
          className='p-10 bg-white rounded-xl drop-shadow-lg space-y-5'>
          <h1 className='text-center text-3xl'>Formulario</h1>

          {message && message !== '' && (
            <div
              className='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
              role='alert'>
              <svg
                aria-hidden='true'
                className='flex-shrink-0 inline w-5 h-5 mr-3'
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
              className='w-96 px-3 py-2 rounded-md border border-slate-400'
              type='text'
              placeholder='Ingrese su nombre'
              id='name'
              {...register('name', { required: true })}
            />
            {errors.name && <span className='text-red-500 text-sm'>{errors.name?.message?.toString()}</span>}
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              className='px-10 mt-4 py-2 bg-blue-600 text-white rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in'>
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home

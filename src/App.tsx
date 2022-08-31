import { useEffect, useState } from 'react'

import { useForm, useWatch } from 'react-hook-form'

import Question from 'components/Quiz/Question'
import CounterDown from 'components/Quiz/CounterDown'

import data from 'data.json'

function App() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const dt = useWatch({ control })
  const [counter, setCounter] = useState<number>(0)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    const answered = Object.entries(dt).reduce((acc, [key, value]) => {
      return value ? acc + 1 : acc
    }, 0)
    const total = (answered / data.preguntas.length) * 100
    setCounter(total)
  }, [dt])

  return (
    <div className='bg-gray-100 shadow rounded mx-auto relative pt-20'>
      <div className='w-full flex justify-end fixed top-0 bg-white shadow-sm px-2'>
        <div className='flex flex-col justify-between  rounded p-2 w-2/5'>
          <div className='flex justify-between'>
            <h1>Formulario</h1>
            <span>
              Tiempo restante: <CounterDown minutes={50} seconds={0} format='hh:mm:ss' />
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700'>
            <div className='bg-blue-600 h-1.5 rounded-full dark:bg-blue-500' style={{ width: `${counter}%` }}></div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 items-center justify-center'>
        {data.preguntas.map((question, index) => (
          <Question key={question.id} control={control} pos={index} question={question} register={register} grid />
        ))}
        <div className='flex gap-8 p-4 bg-gray-100 rounded '>
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
            Anterior
          </button>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export default App

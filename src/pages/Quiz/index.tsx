import { useEffect, useState } from 'react'

import { useForm, useWatch, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Question from 'components/Quiz/Question'
import CounterDown from 'components/Quiz/CounterDown'

import data from '../../data.json'
import { triggerRequest } from 'utils/tools/message'
import { useNavigate } from 'react-router-dom'
import QuizScheme, { IQuizScheme } from '../../utils/validation/QuizScheme'
import { IAnswer } from '../../utils/validation/QuizScheme'

const Quiz = () => {
  const methods = useForm<IQuizScheme>({ resolver: yupResolver(QuizScheme) })
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods

  const dt = useWatch({ control, name: 'answers' })

  const navigate = useNavigate()

  const [counter, setCounter] = useState<number>(0)

  const onSubmit = (data: IQuizScheme) => {
    navigate('result', { state: { data } })
  }

  const handleBack = () => {
    triggerRequest('No se puede retroceder', 'error')
  }

  useEffect(() => {
    if (dt) {
      console.log('dt', dt)
      const total = dt.reduce((acc: number, item: IAnswer) => (item.answer ? acc + 1 : acc), 0)
      const percentage = (total / data.preguntas.length) * 100
      setCounter(percentage)
    }
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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 items-center justify-center'>
          {data.preguntas.map((question, index) => (
            <Question
              grid
              pos={index}
              key={question.id}
              question={question}
              inputProps={{
                ...register(`answers.${index}.answer`, {
                  required: 'Este campo es requerido',
                }),
              }}
              error={errors.answers?.[index]?.answer?.message?.toString()}
            />
          ))}
          <div className='flex gap-8 p-4 bg-gray-100 rounded '>
            <button
              type='button'
              onClick={handleBack}
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
      </FormProvider>
    </div>
  )
}

export default Quiz

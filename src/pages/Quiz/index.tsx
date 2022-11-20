import { useEffect, useState, useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useWatch, useFormState } from 'react-hook-form'

import Question from 'components/Quiz/Question'
import CounterDown from 'components/Quiz/CounterDown'

import data from '../../data.json'
import { triggerRequest } from 'utils/tools/message'
import QuizScheme, { IQuizScheme } from '../../utils/validation/QuizScheme'
import { IAnswer } from '../../utils/validation/QuizScheme'

const startedDate = new Date()

const Quiz = () => {
  const navigate = useNavigate()

  const { handleSubmit, control, register, setFocus } = useForm<IQuizScheme>({ resolver: yupResolver(QuizScheme) })
  const dt = useWatch({ control, name: 'answers' })
  const { errors } = useFormState({ control })

  const [counter, setCounter] = useState<number>(0)
  const questionsRef = useRef<Record<number, HTMLFieldSetElement | null>>({})

  const onSubmit = (data: IQuizScheme) => {
    navigate('result', { state: { data, startedDate } })
  }

  const handleBack = () => {
    triggerRequest('No se puede retroceder', 'error')
  }

  const handleFocus = (index: number) => {
    setTimeout(() => {
      setFocus(`answers.${index}.answer`)
      questionsRef.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 300)
  }

  useEffect(() => {
    if (dt) {
      const total = dt.reduce((acc: number, item: IAnswer) => (item.answer ? acc + 1 : acc), 0)
      const percentage = (total / data.preguntas.length) * 100
      setCounter(percentage)
    }
  }, [dt])

  return (
    <div className='relative mx-auto rounded bg-gray-100 pt-20 shadow'>
      <div className='fixed top-0 z-50 flex w-full justify-end bg-white px-2 shadow-sm'>
        <div className='flex w-2/5 flex-col  justify-between rounded p-2'>
          <div className='flex justify-between'>
            <h1>Formulario</h1>
            <span>
              Tiempo restante: <CounterDown minutes={50} seconds={0} format='hh:mm:ss' />
            </span>
          </div>
          <div className='mb-4 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
            <div className='h-1.5 rounded-full bg-blue-600 dark:bg-blue-500' style={{ width: `${counter}%` }}></div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center gap-8'>
        {data.preguntas.map((question, index) => (
          <Question
            grid
            pos={index}
            key={question.id}
            question={question}
            inputProps={{
              ...register(`answers.${index}.answer`, {
                required: 'Este campo es requerido',
                onChange: () => handleFocus(index + 1),
              }),
            }}
            ref={(element) => (questionsRef.current[index] = element)}
            error={errors.answers?.[index]?.answer?.message?.toString()}
          />
        ))}
        <div className='flex gap-8 rounded bg-gray-100 p-4 '>
          <button
            type='button'
            onClick={handleBack}
            className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Anterior
          </button>
          <button
            type='submit'
            className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Quiz

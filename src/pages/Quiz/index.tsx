import { useEffect, useState, useRef } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch, useFormState } from 'react-hook-form'

import Question from 'components/Quiz/Question'
import CounterDown from 'components/Quiz/CounterDown'

import data from '../../data.json'
import { triggerWarning } from 'utils/tools/message'
import QuizScheme, { IQuizScheme } from '../../utils/validation/QuizScheme'
import { IAnswer } from '../../utils/validation/QuizScheme'

const Quiz = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { name } = location.state as { name: string }

  const { handleSubmit, control, register, setFocus, getValues } = useForm<IQuizScheme>({
    resolver: zodResolver(QuizScheme),
  })

  const [startedDate] = useState(new Date())
  const dt = useWatch({ control, name: 'answers' })
  const { errors } = useFormState({ control })

  const [counter, setCounter] = useState<number>(0)
  const questionsRef = useRef<Record<number, HTMLFieldSetElement | null>>({})

  const onSubmit = (data: IQuizScheme) => {
    navigate('result', { state: { data, startedDate, name } })
  }

  const onTimeCompleted = () => {
    triggerWarning('El tiempo para responder las preguntas ha terminado.', 'Lo sentimos!')
    const data: IQuizScheme = { answers: getValues('answers') }
    navigate('result', { state: { data, startedDate, name } })
  }

  const handleBack = () => {
    triggerWarning('No se puede retroceder', 'error')
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
      <div className='fixed top-0 z-50 flex w-full justify-center bg-white px-2 shadow-sm'>
        <div className='flex w-full max-w-screen-xl items-center justify-between'>
          <p>
            Bienvenido <span className='font-bold'>{name.split(' ')[0] || 'Usuario'}</span>
          </p>
          <div className='flex w-2/5 flex-col  justify-between rounded p-2'>
            <div className='flex justify-between'>
              <h1>Formulario</h1>
              <span>
                Tiempo restante: <CounterDown minutes={45} seconds={0} format='mm:ss' onCompleted={onTimeCompleted} />
              </span>
            </div>
            <div className='mb-4 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
              <div className='h-1.5 rounded-full bg-blue-600 dark:bg-blue-500' style={{ width: `${counter}%` }}></div>
            </div>
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

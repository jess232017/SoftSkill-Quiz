import { forwardRef } from 'react'

import { IQuestion } from '../../../interfaces/question'

interface IQuestionProps {
  pos: number
  grid?: boolean
  error?: string
  question: IQuestion
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

const Question = forwardRef<HTMLFieldSetElement, IQuestionProps>(({ pos, grid, error, question, inputProps }, ref) => {
  return (
    <fieldset id={`block-${pos}`} ref={ref} className='flex flex-1 flex-col gap-4 rounded bg-white p-5 pb-8 lg:w-1/2'>
      <h6 className='font-bold text-blue-500'>Pregunta {pos + 1}</h6>
      <h5 className='text-xl font-black text-gray-800'>{question.titulo}</h5>
      <ul className={`${grid ? 'grid grid-cols-2 lg:grid-cols-3' : 'flex flex-col'} gap-2`}>
        {question.respuestas.map((respuesta) => (
          <li className='relative flex grow' key={respuesta.id}>
            <input
              type='radio'
              value={respuesta.id}
              name={`answer-${question.id}`}
              id={`answer-${question.id}-${respuesta.id}`}
              className='peer sr-only'
              {...inputProps}
            />
            <label
              htmlFor={`answer-${question.id}-${respuesta.id}`}
              className='flex grow  cursor-pointer items-center rounded-lg border border-gray-300 bg-white p-5 hover:bg-gray-50 focus:outline-none peer-checked:animate-wiggle peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-yellow-500'>
              <span className='mr-4 inline-block rounded-lg bg-blue-700 py-2 px-3 text-xs font-semibold text-white'>
                {String.fromCharCode(65 + respuesta.id.toString().charCodeAt(0) - 49)}
              </span>
              <div>
                <p className='text-base font-medium leading-tight text-gray-800'>{respuesta.texto}</p>
                {respuesta?.descripcion && <p className='text-xs font-normal text-gray-500'>{respuesta.descripcion}</p>}
              </div>
            </label>

            <div className='absolute top-5 right-3 hidden h-5 w-5 peer-checked:block'>🤔</div>
          </li>
        ))}
      </ul>
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </fieldset>
  )
})

Question.displayName = 'Question'

export default Question

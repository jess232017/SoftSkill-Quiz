import { useState } from 'react'

import { IQuestion } from '../../../interfaces/question'
import { useFormContext, useWatch } from 'react-hook-form'
import { IQuizScheme } from '../../../utils/validation/QuizScheme'

interface IQuestionProps {
  pos: number;
  grid?: boolean;
  question: IQuestion;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

const index: React.FC<IQuestionProps> = ({ pos, question, grid = false, inputProps, error }) => {
  const { control } = useFormContext<IQuizScheme>()
  const selected = useWatch({ control, name: `answers.${pos}.answer` })

  return (
    <fieldset className='lg:w-1/2 flex flex-col flex-1 gap-4 bg-white p-5 pb-8 rounded'>
      <h6 className='text-blue-500 font-bold'>Pregunta {pos + 1}</h6>
      <h5 className='font-black text-gray-800 text-xl capitalize'>{question.titulo}</h5>
      <div className={`${grid ? 'grid grid-cols-3' : 'flex flex-col'} gap-2`}>
        {question.respuestas.map((respuesta) => (
          <div
            className={`flex mt-3 items-center border-2 ${
              selected === respuesta.id.toString() ? 'border-[#05f]' : 'border-[#e8f1fa]'
            } bg-[#e8f1fa] rounded-lg text-xs font-semibold text-gray-700 `}
            key={respuesta.id}>
            <input
              required
              id={`answer-${question.id}-${respuesta.id}`}
              className='appearance-none w-0 h-0'
              name={`answer-${question.id}`}
              {...inputProps}
              type='radio'
              value={respuesta.id}
            />

            <label
              className='flex-1 flex items-center p-2 cursor-pointer'
              htmlFor={`answer-${question.id}-${respuesta.id}`}>
              <span className='pt-2 pb-2 pl-3 pr-3 mr-4 inline-block rounded-lg bg-blue-700 text-white text-xs font-semibold'>
                {String.fromCharCode(65 + respuesta.id.toString().charCodeAt(0) - 49)}
              </span>
              <div>
                <p className='text-base leading-tight font-medium text-gray-800'>{respuesta.texto}</p>
                {respuesta?.descripcion && <p className='text-xs font-normal text-gray-500'>{respuesta.descripcion}</p>}
              </div>
            </label>
          </div>
        ))}
      </div>
      {error && <span className='text-red-500 text-xs'>{error}</span>}
    </fieldset>
  )
}

export default index

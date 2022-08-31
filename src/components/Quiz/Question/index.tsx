import { UseFormRegister, useWatch, FieldValues, Control } from 'react-hook-form'

import { IQuestion } from '../../../interfaces/question'

interface IQuestionProps {
  grid?: boolean;
  pos: number;
  question: IQuestion;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any> | undefined;
}

const index: React.FC<IQuestionProps> = ({ pos, question, register, control, grid = false }) => {
  const selected = useWatch({ name: `answer-${question.id}`, control })

  return (
    <fieldset className='lg:w-1/2 flex flex-col flex-1 gap-4 bg-white p-5 pb-8 rounded'>
      <h6 className='text-blue-500 font-bold'>Pregunta {pos + 1}</h6>
      <h5 className='font-black text-gray-800 text-xl'>{question.titulo}</h5>
      <div className={`${grid ? 'grid grid-cols-3' : 'flex flex-col'} gap-2`}>
        {question.respuestas.map((respuesta, index) => (
          <div
            className={`flex mt-3 items-center border-2 ${
              selected === index.toString() ? 'border-[#05f]' : 'border-[#e8f1fa]'
            } bg-[#e8f1fa] rounded-lg text-xs font-semibold text-gray-700 `}
            key={index}>
            <input
              type='radio'
              value={index}
              id={`answer-${question.id}-${index}`}
              className='appearance-none w-0 h-0'
              {...register(`answer-${question.id}`, { valueAsNumber: true, required: true })}></input>

            <label className='flex-1 flex items-center p-2 cursor-pointer' htmlFor={`answer-${question.id}-${index}`}>
              <span className='pt-2 pb-2 pl-3 pr-3 mr-4 inline-block rounded-lg bg-blue-700 text-white text-xs font-semibold'>
                {String.fromCharCode(65 + index)}
              </span>
              <div>
                <p className='text-base leading-tight font-medium text-gray-800'>{respuesta.texto}</p>
                {respuesta?.descripcion && <p className='text-xs font-normal text-gray-500'>{respuesta.descripcion}</p>}
              </div>
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

export default index

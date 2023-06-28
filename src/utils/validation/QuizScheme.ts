import { z } from 'zod'

export interface IAnswer {
  answer: string | number
}

export interface IQuizScheme {
  answers: IAnswer[]
}

const QuizScheme: z.ZodSchema<IQuizScheme> = z.object({
  answers: z.array(
    z.object({
      answer: z
        .string({
          invalid_type_error: 'Debes ingresar una respuesta válida para continuar',
        })
        .nonempty('Debes ingresar una respuesta válida para continuar'),
    }),
  ),
})

export default QuizScheme

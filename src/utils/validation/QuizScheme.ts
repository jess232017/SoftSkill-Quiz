import * as yup from 'yup'

export interface IAnswer {
  answer: string | number;
}

export interface IQuizScheme {
  answers: IAnswer[];
}

export const QuizScheme: yup.SchemaOf<IQuizScheme> = yup
  .object({
    answers: yup
      .array()
      .of(
        yup.object({
          answer: yup
            .string()
            .required('Debes ingresar una respuesta válida para continuar')
            .typeError('Debes ingresar una respuesta válida para continuar'),
        }),
      )
      .required(),
  })
  .required()

export default QuizScheme

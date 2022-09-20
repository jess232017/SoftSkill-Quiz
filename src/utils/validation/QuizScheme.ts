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
          answer: yup.string().required('Answer is required'),
        }),
      )
      .required(),
  })
  .required()

export default QuizScheme

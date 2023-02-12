export interface IAnswer {
  id: number | string
  texto: string
  valor?: number | string
  descripcion?: string
}

export interface IQuestion {
  id: number | string
  titulo: string
  dimension: string
  respuestas: IAnswer[]
  resultado?: number
}

export interface IQuestions {
  preguntas: IQuestion[]
}

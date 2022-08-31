export interface IQuestion {
  id: string;
  titulo: string;
  respuestas: string[];
  correcta: number;
}

export interface IQuestions {
  preguntas: IQuestion[];
}

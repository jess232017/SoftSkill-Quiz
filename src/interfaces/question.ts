export interface IAnswer {
  id: number | string;
  texto: string;
  descripcion?: string;
  esCorrecto?: boolean;
}

export interface IQuestion {
  id: number | string;
  titulo: string;
  respuestas: IAnswer[];
  correcta?: number;
}

export interface IQuestions {
  preguntas: IQuestion[];
}

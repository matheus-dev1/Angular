export interface Comentario {
  date: Date,
  text: string,
  userName: string,
}

// coleção de comentarios
export type Comentarios = Array<Comentario>;

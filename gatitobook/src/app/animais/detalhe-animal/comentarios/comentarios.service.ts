import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario, Comentarios } from './comentarios';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(
    private httpClient: HttpClient
  ) { }

  buscaComentario(id: number): Observable<Comentarios> {
    return this.httpClient.get<Comentarios>(`${environment.baseUrlApi}/photos/${id}/comments`);
  }

  incluiComentario(id: number, commentText: string): Observable<Comentario> {
    return this.httpClient.post<Comentario>(`${environment.baseUrlApi}/photos/${id}/comments`, {
      commentText: commentText
    });
  }
}

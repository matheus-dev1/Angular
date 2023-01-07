import { TokenService } from './../autenticacao/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of, throwError } from 'rxjs';
import { Animais, Animal } from './animais';
import { environment } from 'src/environments/environment';

const NOT_MODIFIED = "304";

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private httpClient: HttpClient,
    // private tokenService: TokenService
  ){ }

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.httpClient.get<Animais>(`${environment.baseUrlApi}/${nomeDoUsuario}/photos`
    /*, {
        //headers: new HttpHeaders().set("x-access-token", this.tokenService.retornaToken())
    }*/);
  }

  buscarPorId(id: number): Observable<Animal> {
    /* const token = this.tokenService.retornaToken();
     const headers = new HttpHeaders().set("x-access-token", token); */
    return this.httpClient.get<Animal>(`${environment.baseUrlApi}/photos/${id}` /*, {
      headers
    }*/);
  }

  excluiAnimal(id: number): Observable<Animal> {
    return this.httpClient.delete<Animal>(`${environment.baseUrlApi}/photos/${id}`);
  }
  /* a API retorna simplesmente um 200, caso a requisição seja com sucesso, registrou o curtir no nosso servidor, ou 304, caso aquele curtir com aquele token já tenha sido feito. */
  curtir(id: number): Observable<boolean> {
    return this.httpClient.post(`${environment.baseUrlApi}/photos/${id}/like`,
    {},
    { observe: "response" }
    // Vou usar o pipe porque eu quero manipular o fluxo das requisições e usar os operators.
  ).pipe(
    // O mapTo, vai simplesmente retornar o valor que eu colocar aqui, então neste exemplo, se der true, e poque se der true? Porque é a unica função que eu estou executando entro de pipe, o catchError é uma função especifica para tratar erros. Então se der true no mapTo quer dizer que a requisição retornou 200 ou algum status http de sucesso.
    mapTo(true),
    catchError((error) => {
      // Este of() me retorna um objeto com o generics do tipo passado, como eu passei um tipo booleando, ele vai me retornar um Observable<boolean>
      return error.status === NOT_MODIFIED ? of(false) : throwError(() => error);
    })
  )}

  upload(descricao: string, permitirComentario: boolean, arquivo: File){
    const formData = new FormData();
    // Criando um objeto do tipo form data que nos permite empacotar arquivo para serem enviados via requisição http, além de empacotar o arquivo estamos empacotando strings
    // Como parametro ele recebe uma string ou File(Blob na real, mas file herda de blob)
    formData.append("description", descricao);
    formData.append("allowComments", permitirComentario ? "true" : "false")
    formData.append("imageFile", arquivo)

    return this.httpClient.post(`${environment.baseUrlApi}/photos/upload`, formData, {
      // então cada passo da requisição eu quero receber no nosso observable, eu quero que ele me envie.
      observe: "events",
      reportProgress: true
    })
  }
}

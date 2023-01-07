import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

// Essa classe pode sr injetada em ouro componente ou serviço.
@Injectable({
  // Significa que esse serviço quando instanciado por algum componente, pelo mecanismo de dependência, o Angular instância esse objeto uma vez só, ele transforma esse objeto em um singleton, como chamamos em padrão de projeto.
  providedIn: 'root'
})
export class AutenticacaoService {
  // Esse objeto já está sendo injetado e instanciado.
  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  // Como se fosse uma promisse JavaScript, quando
  autenticar(usuario: string, senha: string, ): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${environment.baseUrlApi}/user/login`, {
      userName: usuario,
      password: senha
    },
    // Aqui eu vou receber a resposta completa da requisição, tanto body, como headers e status http.
    { observe: 'response' }
    // Aqui eu estou falando que não quero só o body, eu também quero os headers da minha aplicação.
    ).pipe(
      tap((response) => {
        console.log(response)
        const authToken = response.headers.get("x-access-token") ?? "";
        this.usuarioService.salvaToken(authToken);
      })
    )
  }

}

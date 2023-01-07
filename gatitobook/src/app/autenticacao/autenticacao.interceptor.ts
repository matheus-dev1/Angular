import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
/*
  O interceptor é um serviço, está vendo aqui? @Injectable(), que implementa a interface HttpInterceptor. E ele tem o objetivo de interceptar toda requisição http que sai do nosso front-end e assim nós podemos manipular a requisição antes de ela ir para o servidor, como no caso que vamos fazer aqui, que é anexar um token.

  Mas eu posso mudar o endereço, posso fazer várias coisas na nossa requisição antes de sair do nosso front-end e ir para o servidor.
 */
@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  /*
    O meu método intercept recebe a requisição aqui, está vendo esse HttpRequest? Ele recebe a requisição. Então eu vou fazer um clone dessa requisição, porque é muito importante que esse request seja imutável, ou seja, eu não consigo mutar o objeto, então se eu quiser alterar o objeto, eu tenho que fazer um clone dele e colocar a informação a mais que eu quero.
   */
  intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      if(this.tokenService.possuiToken()){
        const token = this.tokenService.retornaToken();
        const headers = new HttpHeaders().append("x-access-token", token);
        /* Pode ser entender assim, eu disparo a requisição, crio o clone dela, atriubo o meu headers, e continua a requisição CLONADA */
        request = request.clone({ headers: headers });
      }
    /* E aqui nesse next.handle(request); a requisição continua, mas com o request alterado com esse header.

    Então aqui embaixo eu vou pegar o request que eu estou recebendo, da minha função, do intercept, =request.clone(). Só que esse request não vai ser idêntico, ele vai ser um clone, só que eu vou informar aqui no options dele o { headers }. E aqui return next.handle. Esse next.handle é para continuar requisição. */
    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Transferencia } from '../models/transferencia.model';
import { Observable } from 'rxjs';

/* Um service geralmente é uma classe onde está concentrado comunicação com meios externos, ou dados que preciso gerenciar da tela.

Injectable está dizendo é que posso invocar uma instância dessa classe através do construtor. */
@Injectable({
  /* Eu não mais preciso declarar esta minha "service" no meu ngModule.
    Nas ultimas versões do Angular eu não preciso mais fazer isso posso falar que ele será provido(possuir) em algum modulo especifico ou  posso dizer que ele vai ser existente enquanto a aplicação estiver ativa (root) */
  providedIn: 'root'
})

export class TransferenciaService {
  private listaDeTransferencias: Array<any> = [];
  private url: string = "http://localhost:3000/transferencias";

  /* Quando ainda não temos uma API pronta, nos frontend, nos podemos mockar dado, que é simular o retorno de uma API, ou a ação de uma API, mas com dados ficticios e estaticos.

  Com a ferramenta Json Server conseguimos simular isso.
  npm install -g json server
  json-server --watch db.json

  Existem ferramentas que tranformam JSON em um "model" da linguagem que você quiser apenas perquisar JSON TO LINGUAGEM QUE VOCÊ QUER */

constructor(private httpClient: HttpClient) {
  this.listaDeTransferencias = [];
}

get transferencias() {
  return this.listaDeTransferencias;
}

todasAsTransferencias(): Observable<Array<Transferencia>>{
  return this.httpClient.get<Array<Transferencia>>(this.url);
}

public getTransferencias(): Array<any>{
  return this.listaDeTransferencias;
}

adicionarNovaTransferenia(transferencia: Transferencia): Observable<Transferencia> {
  console.log(transferencia.valor + " app-component");
  console.log(transferencia.destino + " app-component");

  const transferenciaObject: Transferencia = {...transferencia, data: new Date()};
  return this.httpClient.post<Transferencia>(this.url, transferenciaObject);
}

}

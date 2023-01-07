import { Observable } from 'rxjs';
import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private httpClient: HttpClient) { }

  cadastraNovoUsuario(novoUsuario: NovoUsuario): Observable<any> {
    return this.httpClient.post(environment.baseUrlApi + "/user/signup", novoUsuario);
  }

  verificaUsuarioExistente(nomeUsuario: string): Observable<any>{
    return this.httpClient.get(environment.baseUrlApi + `/user/exists/${nomeUsuario}`)
  }
}

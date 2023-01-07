import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Usuario } from './usuario';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Toda vez que algum componente, algum outro serviço faz um subscribe nesse observable, esse BehaviorSubject envia o último dado que estava nele, ou seja, ele é um observable que guarda estado.
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()){
      this.decodificaJwt();
    }
  }

  // Notificar os componetes que possui um das ultimas atualizações do tokens
  private decodificaJwt(): void {
    const token: string = this.tokenService.retornaToken();
    const usuario: Usuario = jwt_decode(token) as Usuario;
    // Sempre quando acionamos esse método(next), todo mundo que se inscreveu nesse serviço recebe o usuário.
    this.usuarioSubject.next(usuario);
  }

  public retornaUsuario(): Observable<Usuario> {
    return this.usuarioSubject.asObservable();
  }

  public salvaToken(token: string): void {
    this.tokenService.salvaToken(token);
    this.decodificaJwt();
  }

  public deslogar(): void{
    this.tokenService.excluiToken();
    // Notificando todos os componentes de Usuario que o token foi deletado.
    this.usuarioSubject.next({});
  }

  public estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }
}

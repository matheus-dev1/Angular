import { Injectable } from '@angular/core';

const KEY = "token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  /* Essa string é o que nós chamamos de token JWT, que é basicamente um objeto JavaScript codificado base64 que possui informações da sessão do nosso usuário.

  Angular/Frontend - npm instlal jwt-decode
  */
  constructor() { }

  public retornaToken(): string {
    return localStorage.getItem(KEY) ?? "";
  }

  public salvaToken(token: string): void {
    localStorage.setItem(KEY, token);
  }

  public excluiToken(): void {
    localStorage.removeItem(KEY);
  }

  public possuiToken(): boolean {
    // Esse método vai retornar return !! this.retornaToken, porque eu quero retornar um boolean. Eu não quero retornar o token.
    return !!this.retornaToken();
  }
}

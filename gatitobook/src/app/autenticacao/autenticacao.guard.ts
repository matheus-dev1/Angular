import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/* Isso se chama "guarda de rota"
  A guarda que utilizaremos aqui é a CanLoad, e por que ela? Porque estamos usando o lazy load para carregar as rotas da nossa aplicação. Então nesse caso, eu vou utilizar o CanLoad */
export class AutenticacaoGuard implements CanLoad {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ){ }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (!this.usuarioService.estaLogado()) {
        this.router.navigate(['']);
        return false;
      }
      return true;
  }
}

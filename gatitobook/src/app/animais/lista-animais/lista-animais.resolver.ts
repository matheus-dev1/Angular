import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { AnimaisService } from './../animais.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { Animais } from '../animais';

/* O objetivo desse serviço é realizar alguma operação, carregar alguma informação antes da rota ser resolvida. Então, na lista, nós carregávamos os animais a partir do componente já criado. Aqui, nesse caso, não, vamos começar a fazer a busca na API antes, enquanto a página é renderizada.

Quando o usuário clicar na rota ou for na rota, ele já vai começar a busca. Nós vamos ganhar um pouco de tempo de fazer isso não quando o componente estiver pronto, mas sim adiantar esse trabalho. */
@Injectable({
  providedIn: 'root'
})
export class ListaAnimaisResolver implements Resolve<Animais> {

  constructor(
    private animaisService: AnimaisService,
    private UsuarioService: UsuarioService
  ){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Animais> {
    // of() me retorna um observable do valor que esta como parametro.
    // return of(true);

    return this.UsuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? "";
        return this.animaisService.listaDoUsuario(userName);
      }),
      // Quando ele passar pelo switchMap e depois finalizar ele vai fazer esse fluxo apenas uma vez e vai finalizar.
      take(1),
    )
  }
}

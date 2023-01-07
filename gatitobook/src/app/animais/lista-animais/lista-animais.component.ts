import { ActivatedRoute } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { AnimaisService } from './../animais.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Animais } from './../animais';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {

  // !: porque eu não estou instanciando ele.
  // animais$!: Observable<Animais>;

  animaisResolve!: Animais;

  constructor(
    // private usuarioService: UsuarioService,
    // private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      // data pegando o retono do resolve.
      this.animaisResolve = this.activatedRoute.snapshot.data["animais"];
    })

    /* A biblioteca RxJS nos permite tratar os fluxos de informações de uma maneira declarativa.

    Imagina que o fluxo da informação é um cano que passa informação dentro dele.

    .pipe(), ao invés de .subscribe e aqui eu posso usar operadores RxJS. O que são operadores RxJS? São basicamente funções. Funções que manipulam o fluxo de informações dentro de um observable.

    Aqui nesse caso eu vou utilizar um observable chamado switchMap(). Esse switchMap vai trocar o fluxo. Ele vai trocar o fluxo que está vindo, no caso, de usuário, eu quero trocar por outro fluxo, que é o fluxo de lista de animais. */

    // this.animais$ = this.usuarioService.retornaUsuario().pipe(
      // O switchMap me retorna a mesma coisa que o subcribe, a mudança acontece na proxima chamada, na mudança da troca de informações.
      // switchMap((usuario) => {
        // const userName = usuario.name ?? "";
        // Dentro do switchMap eu preciso retornar um observable.
        // return this.animaisService.listaDoUsuario(userName)
      // }))

    /* Antigamente, no JavaScript, nós tínhamos o conceito de callback hell, ou seja, um callback de callback. Depois vieram as promises e teve o conceito de promise hell, com muitos.then
    Nesse caso estamos com um subscribe hell, ou seja, eu tenho um subscribe dentro de um subscribe, e podemos fazer outro subscribe. Isso não é muito legal, porque o código não está muito manutenível, não é uma boa prática você fazer um subscribe dentro de um subscribe. */

    /*  this.usuarioService.retornaUsuario().subscribe({
      next: (usuario) => {
        // Caso o username for undefined ou nulo, eu quero atribuir aqui as aspas simples. Então username sempre vai ser string.
        const userName = usuario.name ?? "";

        this.animaisService.listaDoUsuario(userName).subscribe({
          next: (animais) => {
            this.animais = animais;
          }
        })
      }
    }) */
  }

}

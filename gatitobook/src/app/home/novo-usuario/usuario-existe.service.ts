import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { first, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) { }

  // OneNote tem uma explicação sobre Observables
  usuarioJaExiste() {
    // Estamos trabalhando basicamente com dois observables: um que representa a digitação do usuário e outro que representa a requisição no servidor no servidor. Eu tenho que converter a digitação em uma requisição.
    return (abstractControl: AbstractControl) => {
      return abstractControl.valueChanges.pipe(
        // Dentro desse ‘pipe’, podemos utilizar funções que são os operadores. O primeiro operador que utilizaremos é o ‘switchMap’.
        // Esse operador vai fazer essa troca de um fluxo da digitação pelo fluxo da requisição. Nada mais é que uma função que recebe o que o primeiro fluxo está dando. No caso é ‘string’ da digitação e ele espera como retorno outro fluxo, outro ‘observable’.
        switchMap((nomeUsuario) => {
          // O switchMap recebe o nome que o usuário está digitando e converte isso na requisição do back-end. Com essa requisição eu quero pegar o resultado, porque essa requisição vai me retornar true ou false. Só que eu quero trocar esse ‘true’ ou ‘false’ pelo nosso objeto de erro ou o nulo, que é a regra do da validação dos formulários do Angular.
          return this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        }),
        // E como fazemos isso? Utilizamos outro operador, o operador map. Esse operador map faz essa troca não de fluxo e sim de resultado. O map é uma função que recebe o valor do resultado daquela requisição HTTP. No caso é um true ou false, um booleano.
        map((usuarioExiste) => usuarioExiste ? { usuarioExistente: true } : null ),
        first()
      )
    }
  }
}

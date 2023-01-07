import { TransferenciaService } from './services/transferencia.service';
import { Component } from '@angular/core';

// O componente app, é o componente principal da sua aplicação.

// Isso é um decorator, ou seja, um metadata que adiciona propriedades a minha classe.
@Component({
  // Nome do seletor, ou seja, nome da tag que deve ser importada no meu arquivo principal para ser renderizada.
  selector: 'app-root',
  // Codigo HTML deste componente, ou seja, onde tem a estrutura do meu componente.
  templateUrl: './app.component.html',
  // Estilos deste componente.
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'bytebank';

  public mensagemDeErro: string;

  // O construtor cria uma instancia valida deste service.
  constructor(private transferenciaService: TransferenciaService){}

  exibirMensagemDeErro($event){
    this.mensagemDeErro = $event;
    console.log(this.mensagemDeErro);
  }
}

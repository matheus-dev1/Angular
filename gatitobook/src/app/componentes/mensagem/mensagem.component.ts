import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  // Quando utilizarmos esse componente, vai ser criado um atributo chamado mensagem e nesse atributo nós vamos passar a mensagem para o nosso componente.
  @Input()
  mensagem: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}

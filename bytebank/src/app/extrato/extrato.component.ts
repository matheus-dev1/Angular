import { Component, Input, OnInit } from '@angular/core';
import { Transferencia } from '../models/transferencia.model';
import { TransferenciaService } from '../services/transferencia.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  /* Assim como lá no nova-transferencia.component.ts eu tive um decorator chamado @Output , eu vou utilizar outro decorator chamado @Input.

  Essa anotação vai permitir que seja criada uma property bind, uma propriedade para esse componente app-extrato com o nome transferencia. Então nome da variável, nome da propriedade, do atributo da classe, vai ser o mesmo nome da propriedade que vai aparecer quando for declarar o componente.
  @Input() transferencias: Array<any>;
  */
  @Input() mensagemDeErro: any;
  transferencias: Array<Transferencia>;

  constructor(private transferenciaService: TransferenciaService) {}

  ngOnInit(): void {
    this.transferenciaService.todasAsTransferencias().subscribe((transferencias: Array<Transferencia>) => {
      console.table(transferencias);
      this.transferencias = transferencias;
    })
  }

}

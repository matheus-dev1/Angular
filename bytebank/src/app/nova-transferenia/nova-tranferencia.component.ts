import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Transferencia } from "../models/transferencia.model";
import { TransferenciaService } from "../services/transferencia.service";

@Component({
    // No angular.json, tenho uma propriedade e obrigando a colocar um prefixo na hora de setar um nome para o seletor do meu componente
    selector: "app-nova-tranferencia",
    // template: "botao" - Eu posso declarar o template como uma string, como por exempo um componente botão.
    templateUrl: "./nova-tranferencia.component.html",
    styleUrls: ["./nova-tranferencia.component.scss"]
})
export class NovaTransferenciaComponent {

  // @OutPut metadata/decorator evento de saida de dados | Atraves do EventEmmiter eu consigo propagar este dados para outros components
  @Output() aoTransferir = new EventEmitter<any>();
  @Output() aoTransferirComErros = new EventEmitter<any>();

  // Variaveis criadas para armazenar os valores recebido do nova-tranferencia.component.html
  public valor: number;
  public destino: number;

  public mensagemDeErro: string = "Informe um valor maior que 0.";

  constructor(private transferenciaService: TransferenciaService, private router: Router){}

  transferir(){
    console.log("solicitada nova transferencia");
    console.log(this.valor + " nova-transerencia-component");
    console.log(this.destino + " nova-transerencia-component");
    // Objeto com os valores que eu quero passar para outros componentes.
    const dadosDeTransferencias: Transferencia = {valor: this.valor, destino: this.destino}
    // Vou emitir um evento de tranferencia.
    if(this.valor <= 0 || this.valor == null) {
      this.aoTransferirComErros.emit(this.mensagemDeErro);
    } else {
      // this.aoTransferir.emit(dadosDeTransferencias);
      this.transferenciaService.adicionarNovaTransferenia(dadosDeTransferencias).subscribe(resultado => {
        console.log(resultado);
        this.limparCampos();
        this.router.navigateByUrl("extrato");
      }, error => {
        console.log(error);
      });
    }
    this.limparCampos();
  }

  limparCampos(){
    this.valor = null;
    this.destino = null;
  }
}

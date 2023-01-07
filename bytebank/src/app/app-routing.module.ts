import { NovaTransferenciaComponent } from './nova-transferenia/nova-tranferencia.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "extrato", pathMatch: "full" },
  { path: "extrato", component: ExtratoComponent },
  { path: "nova-transferencia", component: NovaTransferenciaComponent}]

@NgModule({
  // Como eu estou trabalhando com o modulo principal, eu tenho que dizer que as rotas vão ser essas.
  // Agora se eu tiver trabalhando em um modulo interno, por exemplo, você tem dentro da aplicação do ByteBank poderíamos crescer e ter o módulo de pessoa, aí lá dentro do módulo de pessoas ter rotas específicas para aquele módulo e lá dentro eu utilizaria o forChild
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

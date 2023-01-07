import { LoginGuard } from './autenticacao/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "home",
    // Lazy Load - O atributo ‘loadChildren’, eu vou mandar uma função que no momento que o usuário acessar essa rota e o Angular vai executar essa função para revisitar o módulo sob demanda, ou seja, somente quando o meu usuário acessar a rota, ‘path: home'<, > loadChildren: () => import('./home/home.module').
    loadChildren: () => import("./home/home.module").then( (module) => module.HomeModule),
    canLoad: [LoginGuard],
  },
  {
    path: "animais",
    loadChildren: () => import("./animais/animais.module").then((module) => module.AnimaisModule),
    canLoad: [AutenticacaoGuard],
  },

];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

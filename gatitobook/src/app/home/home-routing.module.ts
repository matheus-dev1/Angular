import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

const routes: Routes = [
  // Sub-rota
  {
    path: "",
    component: HomeComponent,
    /*
    Um atributo do tipo children, que é um elemento de sub rota, dentro de ‘home’ nós teremos sub rotas. Ele é um array de rotas, ‘children:‘

    Quando eu estiver na rota home eu vou renderiar HomeComponen e LoginCompent, quando eu estiver em home/novo-usuario, eu vou estar rendereizando HOmecomponent e NovoUsuarioComponent
    */

    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "novo-usuario",
        component: NovoUsuarioComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

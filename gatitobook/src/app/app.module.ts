import { AnimaisModule } from './animais/animais.module';
import { CartaoModule } from './componentes/cartao/cartao.module';
import { RodapeModule } from './componentes/rodape/rodape.module';
import { CabecalhoModule } from './componentes/cabecalho/cabecalho.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  // Modulos
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //HomeModule,
    CabecalhoModule,
    RodapeModule,
    AutenticacaoModule,
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

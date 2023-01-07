import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NovaTransferenciaComponent } from './nova-transferenia/nova-tranferencia.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { registerLocaleData } from '@angular/common';
import localePt from "@angular/common/locales/pt";
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(localePt, "pt");

@NgModule({
  /* Um componente tem que fazer parte de um modulo.

    O angular tem uma arquitetura que permite separar componentes por módulos.

    E além desses módulos tem também meu módulo principal, então a porta de entrada da minha aplicação é o index.html que chama o app.component.html, que por sua vez só é conhecido porque ele faz parte do app.module.ts

    A porta inicial é index.html, app.component, app.module. E aqui estou tentando usar dentro do meu app.component um componente que ainda não foi declarado em nenhum módulo. Para resolvermos isso vou declarar ele em declarations, usando o nome NovaTransferenciaComponent
  */
  declarations: [
    AppComponent,
    NovaTransferenciaComponent,
    ExtratoComponent
  ],
  imports: [
    BrowserModule,
    /* Como o Angular concatena funcionalidades e componentes dentro de um módulo e eu preciso de funcionalidades de formulário, então nada mais justo importar para dentro do meu projeto o módulo de formulário. */
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  /* */
  providers: [
    { provide: LOCALE_ID, useValue: "pt_BR" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "BRL" },
  ],
  bootstrap: [AppComponent]
})
// Quem pega este modulo principal do angular é main.ts
export class AppModule { }

import { ReactiveFormsModule } from '@angular/forms';
import { MensagemModule } from './../componentes/mensagem/mensagem.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// O modulo shared tem a unica função de agrupar modulos comuns.

@NgModule({
  imports: [
    CommonModule,
    MensagemModule,
    ReactiveFormsModule,
  ],
  exports: [
    MensagemModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }

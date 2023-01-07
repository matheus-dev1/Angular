import { ComentariosService } from './comentarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Comentarios } from './comentarios';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() id!: number;
  comentarios$!: Observable<Comentarios>
  comentarioForm!: FormGroup;

  constructor(
    private comentariosService: ComentariosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentariosService.buscaComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      // Group recebe um objeto com os campos.
      comentario: ["", Validators.maxLength(300)],
    })
  }

  gravar(): void {
    /*
    Safe navigation operator (?.) é um operador de expressão de modelo Angular. O operador de navegação segura evita exceção para valores nulos e indefinidos em caminhos de propriedade.

    Para pegar valores do formGroup, nos usamos o .get, no formGroup, passando o seu "formControlName".
    */
    const comentario = this.comentarioForm.get("comentario")?.value ?? "";
    // Aqui a gente vai seta/incluir o comentario e vai para outra reqisição, no caso a de buscar a nova informação registrada.
    this.comentarios$ = this.comentariosService.incluiComentario(
      this.id,
      comentario
      ).pipe(
        // O fluxo está vindo de inclusão, eu quero convertê-lo para o fluxo de buscar os comentários do servidor.
        switchMap(() => this.comentariosService.buscaComentario(this.id)),
        // Efeitos colaterais, ou seja, coisas que não vão influenciar o fluxo, mas precisam acontecer durante o processamento desse fluxo
        tap(() => {
          // Resetar o formulario.
          this.comentarioForm.reset();
          alert("Comentario salvo");
        })
      )
  }
}

import { Router } from '@angular/router';
import { AnimaisService } from './../animais.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css']
})
export class NovoAnimalComponent implements OnInit {
  // Definindo variaveis no componente para autocomplete porque vamos usar o formulario do tipo reativo.
  formNovoAnimal!: FormGroup;
  arquivo!: File;
  previewUrlUpload!: string;
  pencentualUpload: number = 0;

  constructor(
    private animaisService: AnimaisService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Criando o novo formbuilder com todos os formControlName setados no template do componente.
    this.formNovoAnimal = this.formBuilder.group({
      // Valor que ele inicializa e validadores.
      arquivo: ["", Validators.required],
      description: ["", Validators.maxLength(300)],
      allowComments: [true],
    })
  }

  upload(){
    const allowComments = this.formNovoAnimal.get('allowComments')?.value ?? false;
    const description = this.formNovoAnimal.get('description')?.value ?? "";

    this.animaisService
      .upload(description, allowComments, this.arquivo)
      .pipe(
        finalize( () => this.router.navigate(['animais']))
      )
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress){
            const total = event.total ?? 1;
            this.pencentualUpload = Math.round(100 * (event.loaded / total));
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

  gravaArquivo(arquivo: any): void {
    const [file] = arquivo?.files;
    this.arquivo = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.previewUrlUpload = event.target.result);
    reader.readAsDataURL(file);
  }
}

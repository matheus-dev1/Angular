import { Router } from '@angular/router';
import { UsuarioExisteService } from './usuario-existe.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  // Com a "!", nos falamos que ele pode ser nulo ou não.
  novoUsuarioForm!: FormGroup;

  // No formulário reativo a maior parte da lógica fica no componente ao invés do template do formulário do tipo template driven.
  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExisteService: UsuarioExisteService,
    private router: Router
    ) { }

  // Execuado apos a classe ser construida por completo.
  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ["", [
        // Este segundo array é um array de validações. E o angular tem uma classe de valiadores que tem varios tipos de validações feitas por esse objeto.
        Validators.required,
        Validators.email
      ]],
      fullName: ["", [
        Validators.required,
        Validators.minLength(4)
      ]],
      userName: ["", [
        this.minusculoalidator
      ], [
        // Validações Assincronas
        this.usuarioExisteService.usuarioJaExiste()
      ]],
      password: [""]
    },
    {
      // Neste objet eu consigo validar mais de um campo.
      validators: [this.usuarioSenhaIguaisValidator]
    }
    )
  }

  cadastrar() {
    if(this.novoUsuarioForm.valid){
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      // console.log(novoUsuario);
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe({
        next: (success) => {
          this.router.navigate(['']);

        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  minusculoalidator(abstractControl: AbstractControl) {
    if (abstractControl.value !== abstractControl.value.toLowerCase()){
      return {
        "minusculo": true
      }
    } else {
      return null;
    }
  }

  usuarioSenhaIguaisValidator(formGroup: FormGroup) {
    const username = formGroup.get('userName')?.value ?? '';
    const password = formGroup.get('password')?.value ?? '';

    if (username.trim() + password.trim()) {
      return username !== password ? null : { senhaIgualUsuario: true };
    } else {
      return null;
    }
  }
}

import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Este dois atributos vão receber os valores do inputs de login.component.html
  usuario: string = "";
  senha: string = "";

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login(){
    console.log("Usuario: " + this.usuario);
    console.log("Senha: " + this.senha);

    // subscribe é tipo o .then()
    this.autenticacaoService.autenticar(this.usuario, this.senha).subscribe({
      next: (success) => {
        console.log("Autenticado com sucesso!" + success);
        this.router.navigate(['animais'])
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

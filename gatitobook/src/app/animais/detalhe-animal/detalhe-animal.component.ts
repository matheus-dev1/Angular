import { Observable } from 'rxjs';
import { AnimaisService } from './../animais.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../animais';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {

  animalId!: number;
  animal$!: Observable<Animal>;

  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    /* this.activatedRoute.snapshot.params. E agora eu preciso pegar exatamente o nome da variável de coringa que nós definimos lá na rota.

    Se voltarmos na nossa rota, no arquivo “animais-routing.module.ts”, podemos notar que colocamos o nome animalId. Tem que ser exatamente esse nome. */
    this.animalId = this.activatedRoute.snapshot.params?.['animalId'];
    this.animal$ = this.animaisService.buscarPorId(this.animalId);
  }

  curtir(){
    this.animaisService.curtir(this.animalId).subscribe({
      next: (success) => {
        // Se a requisição de certo.
        if(success) {
          // Aqui eu vou atualizar o observable "animal$", porque eu quero que depois de fazer a requisição de curtir que vai adicionar +1 no objeto "likes", eu quero atualizar o meu front com estas informações.
          this.animal$ = this.animaisService.buscarPorId(this.animalId);
        }
      }
    })
  }

  excluir(){
    this.animaisService.excluiAnimal(this.animalId).subscribe({
      next: (success) => {
        console.log(success);
        this.router.navigate(['/animais/']);
      },
        error: (error) => {
        console.log(error);
      }
    });
  }

}

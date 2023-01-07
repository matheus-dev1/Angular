import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  private urlOriginal: string = '';
  @Input() public descricaoImage : string = '';
  @Input() public set urlImage(url: string) {
    if (url.startsWith('data')) {
      this.urlOriginal = url;
    } else {
      this.urlOriginal = `${environment.baseUrlApi}/imgs/${url}`;
    }
  }
  get urlImage(): string {
    return this.urlOriginal;
  }

  constructor() {}

  ngOnInit(): void {}
}

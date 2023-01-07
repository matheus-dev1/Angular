import { fade } from './../../animations/fade';
import { Component, HostBinding, AfterViewInit } from '@angular/core';
import { ModalConfig } from './interfaces/modal-config';
import { ModalRef } from './models/modal-ref';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // Para utilizar animações
  animations: [
    fade
  ]
})

export class ModalComponent {
  @HostBinding('@fade') fade = true;
  /* Eu estou dizendo que esse @hostBinding, no elemento host vai ganhar a classe show, vai fazer class.show, ou seja, no conjunto de classes dele ele vai ganhar a class.show quando o show for true.
  @HostBinding('class.show') public show = false; */
  public modalConfig: ModalConfig;

  /* public ngAfterViewInit(): void {
    setTimeout(() => this.show = true);
  } */
  public modalRef: ModalRef;
}

import { ModalComponent } from './../modal.component';
import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { ModalConfig } from '../interfaces/modal-config';
import { BodyInjectorService } from 'src/app/shared/services/body-injector.service';
import { ModalRef } from '../models/modal-ref';

// Inves dele estar no escopo global, quem importar este modulo, atraves do providers(um modulo).
@Injectable()

export class ModalService {
  private componentFactory: ComponentFactory<ModalComponent>;

  constructor(
    // O component factory resolver cria uma fábrica para você daquele componente que você quer criar. E A PARTIR DESSA fábrica você pode criar quantos componentes você quiser dinamicamente.
    componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private bodyInjector: BodyInjectorService,
  ) {
    this.componentFactory = componentFactoryResolver.resolveComponentFactory(ModalComponent);
   }

  // TemplateRef
  public open(modalConfig: ModalConfig): ModalRef {
    const componentRef: ComponentRef<ModalComponent> = this.createComponentRef();
    componentRef.instance.modalConfig = modalConfig;
    console.log(componentRef.instance);
    console.log('open called');
    this.bodyInjector.stackBeforeAppRoot(componentRef);
    const modalRef = new ModalRef(componentRef);
    componentRef.instance.modalRef = modalRef;
    return modalRef;
  }

  public createComponentRef(): ComponentRef<ModalComponent> {
    return this.componentFactory.create(this.injector);
  }
}

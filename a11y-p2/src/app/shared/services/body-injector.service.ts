import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class BodyInjectorService {

  constructor(
    private applicationRef: ApplicationRef,
  ) { }

  public stackBeforeAppRoot(compoenentRef: ComponentRef<any>): void {
    const domElement = this.createDomElement(compoenentRef);
    const appRoot = document.body.querySelector('app-root');
    document.body.insertBefore(domElement, appRoot);
  }

  private createDomElement(componentRef: ComponentRef<any>): HTMLElement {
    // HostView é uma referência para o template do componente encapsulado por ComponentRef
    this.applicationRef.attachView(componentRef.hostView);
    // EmbeddedViewRef é uma classe abstrata que estende a classe ViewRef.
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    return domElement;
  }

}

import { Directive, OnDestroy, OnInit } from "@angular/core";

@Directive({
  selector: '[appFocusBackDirective]'
})
export class FocusBackDirective implements OnInit, OnDestroy {

  private lastFocusedElement: Element;

  constructor() {

  }

  public ngOnInit(): void {
    // Quando a minha diretiva é criada antes dela exibir a view, eu pego qual elemento atual que tinha o focus
    this.lastFocusedElement = document.activeElement;
  }

  public ngOnDestroy(): void {
    // quando ela é destruída, eu passo o focus para esse elemento.
    if (this.lastFocusedElement) {
      (this.lastFocusedElement as HTMLElement).focus();
    }
  }

}

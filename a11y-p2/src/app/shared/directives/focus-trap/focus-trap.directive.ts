import { AfterViewInit, Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[appFocusTrapDirective]'
})
export class FocusTrapDirective implements AfterViewInit {

  /* @HostListener - Lembre-se que se a forma declarativa do seu compoennte é app-meu-component, uma tag correspondente será criado no DOM. É essa tag que hospeda todo o template do seu compomnente, por isso que ela é chamada de host element. */

  private firstFocusableElement: HTMLElement;
  private lastFocusableElement: HTMLElement;

  constructor(
    private elementRef: ElementRef<any>
  ) {

  }

  ngAfterViewInit(): void {
    const focusableElements: Array<HTMLElement> = this
      .elementRef
      .nativeElement
      /* Meu querySelector, vai buscar todos os elementos que tenham tabIndex, mas que não seja -1 e ancoras(<a>), buttons, textarea, input e selects, que não estão desabilidatas.

      PROPRIEDADE + NOT, SIGNIFICA QUE ESTÁ PROPRIEDADE NÃO ESTÁ COM UM DETERMINADO ESTADO NESTE CASO, COMO ESTADO DESABILIDADO, E NO CASO DO INDEX, COM O VALOR DELE IGUAL A -1 */
      .querySelectorAll(
        `[tabindex]:not([tabindex="-1"]),
        a[href]:not([disabled]),
        button:not([disabled]),
        textarea:not([disabled]),
        input:not([disabled]),
        select:not([disabled])`
      );

      this.firstFocusableElement = focusableElements[0];
      this.lastFocusableElement = focusableElements[focusableElements.length - 1];
      this.firstFocusableElement.focus();
  }

  /* @HostListener me permite ouvir eventos a partir do elemento host.
  E o evento que eu quero ouvir é keydown e quando eu escuto esse evento, eu quero ter acesso ao $event, ou seja, o objeto do evento disparado pelo keydown.
  Obs: Keydown é precionar */
  @HostListener('keydown', ['$event'])
  // E este '$event' vai ser passado para o meu manageTab
  public manageTab(event: KeyboardEvent): void {
    if(event.key !== 'Tab') {
      return;
    }
    // Eu só entro nestes dois if, se primeiramente eu der um tab.
    /* Se eu der tab, estier com o shift precionado e o primeiro elemento do meu modal for o que eu mapeei como primeiro elemento, ele vai dar focus para o ultimo elemento que eu categorizei como ultimo elemento. */
    if (event.shiftKey && document.activeElement === this.firstFocusableElement) {
      this.lastFocusableElement.focus();
      event.preventDefault();
    } else if (document.activeElement === this.lastFocusableElement) {
      this.firstFocusableElement.focus();
      event.preventDefault();
    }
  }
}

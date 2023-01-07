import { KeyboardManagedItemDirective } from './keyboard-managed-item.directive';
import { ContentChildren, Directive, HostListener, QueryList } from '@angular/core';

@Directive({
  selector: '[appKeyboardManager]'
})
export class KeyboardManagerDirective {

  /* Esse ContentChildren vai pegar todo mundo(todo elemento) que está dentro da div que tem a diretiva KeyboardManagerDirective, é um conteúdo do elemento no qual a diretiva faz parte.

  Busca todo mundo que é filho do elemento no qual a diretiva KeyboardManagerDirective faz parte, pega todos esses filhos e traz para mim apenas aqueles que têm a diretiva KeyboardManagedItemDirective. */
  @ContentChildren(KeyboardManagedItemDirective) public items: QueryList<KeyboardManagedItemDirective> = null;

  /* Estou dizendo para o @HostListener que escuta o elemento que ele foi colocado um evento de um tecla, no claso o keyup(seta pra cima) e vai me retornar o valor do evento. */
  @HostListener('keyup', ['$event'])
  public manageKeys(event: KeyboardEvent): void {
    switch (event.key){
      case 'ArrowUp':
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
      case 'ArrowDown':
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case 'ArrowLeft':
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case 'ArrowRight':
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
    }
  }

  //COMPREENDER ESTA LOGICA
  public moveFocus(direction: ArrowDirection): KeyboardManagedItemDirective {
    const items = this.items.toArray();
    const currentSelectedIndex = items.findIndex(item => item.isFocused());
    const targetElementFocus = items[currentSelectedIndex + direction];
    if (targetElementFocus) {
      return targetElementFocus;
    }
    if (direction === ArrowDirection.LEFT){
      return items[items.length - 1];
    } else {
      return items[0];
    }
  }
}

enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1
}

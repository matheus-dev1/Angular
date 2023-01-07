import { UniqueIdService } from './../../services/unique-id/unique-id.service';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers: [
    {
      // NG_VALUE_ACCESSOR - É um injection token que marca nosso componente para que seja injetado dentro da infraestrutura do formGroup.
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      //forwardRef - É usado quando o token ao qual precisamos nos referir para fins de DI é declarado, mas ainda não definido.
      useExisting: forwardRef(() => YesNoButtonGroupComponent),
    }
  ]
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {
  @Input() public disabled: boolean = false;
  @Input() public value: string = '';
  @Input() public label: string = '';
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();
  public id!: string;
  // Eu não posso usar um ENUM direto no template, eu tenho que armazenar em um atributo e depois usa-la no template.
  public options = YesNoButtonGrupoOptions;
  public onChange = (value: string) => { };
  public onTouched = () => { };

  constructor(
    private uniqueIdService: UniqueIdService,
  ) {
    this.id = this.uniqueIdService.generateUniqueIdWithPrefix('yes-no-button-group');
  }

  ngOnInit(): void {

  }

  /* Para tags HTML, normais nosnão precisamos fazer essa implementação da ControlValueAccessor, porque o Angular já faz isso por baixo dos panos para cada tag que vc está usando.
    Exemplo:
    <input
      class="form-control mb-2"
      placeholder="Senha"
      type="password"
      formControlName="password"
    />

  Estes 4 metodos, são metodos monitorados pelo formGroup. */
  public writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  public registerOnChange(functionParam: (value: string) => void): void {
    this.onChange = functionParam;
  }

  public registerOnTouched(functionParam: () => void): void {
    this.onTouched = functionParam;
  }

  //Se meu form group disser que o elemento está desabilitada, this.disabled recebe isDisabled
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public activate(value: string) {
    this.writeValue(value);
  }

  public buttonPressed(value: string): boolean {
    if(this.value === value){
      return true;
    } else {
      return false;
    }
  }

  public ariaChecked(value: string): boolean {
    if(this.value === value){
      return true;
    } else {
      return false;
    }
  }

  /* Dentro de um radio, se o elemento está checado, está marcado, quando dou tab, tenho que ir direto para o elemento que está marcado, ou seja, apenas o elemento marcado pode ganhar o foco.

  Tags de input, de entrada é como se tivesse um tabindex 0 por padrão, e elementos que quero que ganhem acesso, sejam acessíveis via tab, via meu keyboard coloco tabindex 0.

  se ele está, se ele é o cara selecionado, esse cara vai ganhar tabindex 0, senão -1. */
  public tabIndexChecked(value: string): string {
    if(this.value === value || this.value === null){
      return '0';
    } else {
      return '-1';
    }
  }
}

enum YesNoButtonGrupoOptions {
  YES = 'yes',
  NO = 'no',
}

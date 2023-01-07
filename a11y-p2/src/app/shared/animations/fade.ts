import { animate, style, transition, trigger } from "@angular/animations";

// essa trigger vai ser disparado de acordo com o que eu orientar para que ela responda.
export const fade = trigger(
  'fade',
  [
    // Seu primeiro parâmetro define o momento no qual desejamos aplicar a transição. Seu segundo parâmetro é uma array com o estado iniciar de propriedades CSS e animações que desejamos aplicar.
    transition(
      // você tem que dizer para ela se ela vai ser aplicada quando o elemento está entrando no DOM ou quando ele está saindo no DOM.
      ':enter',
      [
        // quando o elemento estiver entrando no DOM, eu quero aplicar um estilo
        style({
          opacity: 0
        }),
        // Quando o elemento entrar no DOM
        animate(250, style({
          opacity: 1
        })),
      ]
    ),
    transition(
      ':leave',
      [
        animate(250, style({
          opacity: 0
        })),
      ]
    )
  ],
);

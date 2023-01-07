// Função que encapsula todo o codigo, como se fosse a nossa "class".
function Editor (textArea) {
  // Fonts definidas na barra de tarefas.
  var fonts = [
    'Arial',
    'Calibri',
    'Comic Sans MS',
    'Impact',
    'Trebuchet MS',
    'Times New Roman'
  ];
  // Todos os tamanhos disponivels de fontes.
  var sizes = [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ];
  // As cores disponiveis de texto.
  var colors = [
    '#000000',
    '#333333',
    '#666666',
    '#999999',
    '#CCCCCC',
    '#FFFFFF',
    '#0000FF',
    '#00FF00',
    '#FF0000',
    '#00FFFF',
    '#FFFF00',
    '#FF00FF'
  ];

  // Função que executa todas as outras.
  function inicializador() {
    var textAreaSelector = document.querySelector(textArea);
    textAreaSelector.style.display = 'none';
    /* A propriedade parentElement retorna o elemento pai do elemento especificado.
      
    A diferença entre parentElement e parentNode , é que parentElement retorna nulo se o nó pai não é um nó de elemento 
      
    Exemplo: document.body.parentNode; // Returns the <html> element */
    var container = textAreaSelector.parentElement;
    inicializadorBarraFerramentas(container);
    inicializadorIframe(container, textAreaSelector);
  }

  function criadorComponent(nomeComando, elemento, evento) {
    // Parametro para pegar o nome do comando JavaScript.
    this.nomeComando = nomeComando;
    // Criando um item na lista.
    this.elemento = document.createElement('li');
    // Dentro do item da lista que é o elemento pai, vai ser colocado o elemento filho, que no exemplo do ButtomComponent é um botão.
    this.elemento.appendChild(elemento);
    // Estou referenciando o this, em uma variavel e usando a variavel como this.
    var thisComponent = this;
    // Essa função vai aparecer com o mesmo nome e conteudo diferente em algumas partes do codigo, isso porque em alguns casos do comando execCommand, precisamos passar um parametro com o valor recuperado, em outros não, neste exemplo não precisamos então retornamos apenas true.
    // SUPER IMPORANTE USAR O THIS, AQUI.
    this.recuperarValor = function () {
      return null;
    }
    // Estou ouvindo o meu item criado, e passando o parametro do evento, que eu recebi de buttomComponent por exemplo, e executando uma função.
    this.elemento.addEventListener(evento, function () {
      /* Quando um documento HTML está em designMode, seu objeto document  expõe um metodo execCommand para editar a região editável corrente, algo como elementos form inputs ou contentEditable.

      A maioria dos comandos afetam apaenas uma área selecionada [seleção] (negrito, itálico, etc.), enquantos outros adicionam novos elementos (adicionar um link por exemplo), ou afetam uma linha toda (identação). Quando usando contentEditable, o metódo execCommand() afeta o elemento editável ativo.

      Parâmetros
        aCommandName
          Uma DOMString especificando o nome do comando a ser executado. Veja Comandos para um lista dos possíveis comandos.

      Comandos
        backColor
          Muda a cor de fundo do documento. No modo styleWithCss, ele afeta a cor de fundo do bloco que contém. Isso requer um valor de <color> passado como argumento. Observe que o Internet Explorer usa isso para definir a cor do plano de fundo do texto.

        bold
          Ativa / desativa negrito na seleção ou no ponto de inserção. O Internet Explorer usa a tag <strong> no lugar de <b>.

        Lista: https://developer.mozilla.org/pt-BR/docs/Web/API/Document/execCommand#comandos

      aShowDefaultUI
        Um Boolean indicando se a interface padrão do usuário deve ser mostrada. Isso não é implementado no Mozilla.

      aValueArgument
        Para comandos que requerem um argumento de entrada. É uma DOMString provendo a informação. Por exemplo, insertImage requer uma URL da imagem a ser inserida. Use null se nenhum argumento é necessário. */
      EditorIframe.document.execCommand(
        nomeComando, 
        false,
        thisComponent.recuperarValor()
      );
    })
  }

  // Cria um botão, que é um elemento dentro da barra de ferramentas
  function buttonComponent(nomeComando, icone) {
    // Cria uma botão no JavaScript
    var botao = document.createElement('button');
    // Cria uma icone.
    var iconeBotao = document.createElement('i');
    // Faço uma adição de uma classe mais um parametro que é o nome do icone da biblioteca fontAwesome.
    iconeBotao.classList.add('fa', 'fa-' + icone);
    // Coloco o elemento do icone dentro do elemento pai, que é o botão.
    botao.appendChild(iconeBotao);
    /* O método call() é uma função capaz de alterar o valor this. Por padrão, o primeiro parâmetro que recebe é o valor do this e o demais parâmetros são da função que invoca o método Call 

    O método call() invoca uma função com um dado valor this e argumentos passados individualmente. */
    criadorComponent.call(this, nomeComando, botao, 'click');
  }

  // Função criado de "selects".
  function selectComponent(nomeComando, values) {
    // Criando Select
    var select = document.createElement('select');
    // Percorrendo por cada item e setando os valores de cada um.
    values.forEach((value) => {
      // Criando cada item do select
      var option = document.createElement('option');
      // Nome do item
      option.value = value;
      /* Criando um nó de texto

        A função createTextNode cria um nó de texto e auxilia na criação de um elemento DOM.

        Imagine que queiramos inserir um título (tag h1) ao elemento body de nossa página HTML.

        Primeiro buscamos o elemento pai.

        **No meu exemplo é o select**

        var elemento_pai = document.body;

        Agora criamos o elemento DOM.

        **No meu caso seria o option**

        var titulo = document.createElement('h1');

        Mas só o elemento não basta, precisamos de um texto para ele, ou seja, de um nó de texto.

        Adivinha que função utilizaremos para fazer isso?

        var texto = document.createTextNode("Um título qualquer");

        Anexamos o nó de texto ao elemento.

        titulo.appendChild(texto);

        E, finalmente, anexamos o elemento título ao elemento pai, no caso body.

        elemento_pai.appendChild(titulo); */
      var texto = document.createTextNode(value);
      // Colocando o texto no elemento
      option.appendChild(texto);
      // Colocando o option, elemento filho, no select, o elemento pai.
      select.appendChild(option);
    });

    /* Executando o criado de comandos, com o metodo call, que me permite alterar o this. 
    
    Passando o nome do comando, pegando o exemplo do fontColor, passando 'forecolor' o elemento que eu quero criar e o evento que vai ele vai ficar escutando. */
    criadorComponent.call(this, nomeComando, select, 'change');

    // Estou referenciando o this, em uma variavel e usando a variavel como this.
    var thisComponent = this;

    // Essa função vai aparecer com o mesmo nome e conteudo diferente em algumas partes do codigo, isso porque em alguns casos do comando execCommand, precisamos passar um parametro com o valor recuperado, em outros não, neste exemplo, nos precisamos recuperar o valor do primeiro elemento da lista.
    this.recuperarValor = function () {
      // retornando do valor do primeiro elemento da lista.
      return thisComponent.elemento.firstChild.value;
    }
  }

  // Função para dar um espaço na barra de ferramentas.
  function espaco() {
    // Criando um elemento do tipo item de lista.
    this.elemento = document.createElement('li');
    // Adicionando a classe "space"
    this.elemento.classList.add('space');
    // Dando um espaco no HTML
    this.elemento.innerHTML = '&nbsp;';
  }

  // Criando um elemento <iframe></iframe> atraves do JavaScript e colocando atributos nele.
  function inicializadorIframe(container, textAreaSelector){
    var iframe = document.createElement('iframe');
    // Eu coloco este atriuto porque quando eu criar um link no meu iframe, eu quero que ele redireciona mas não nesta pagina, abra outra.
    iframe.setAttribute('src', 'about:blank');
    // O atributo global contenteditable é um atributo enumerado indicando se o elemento deve ser editável pelo usuário. Se assim for, o navegador modifica seu widget para permitir a edição.
    // ATRIBUTO = VALOR
    iframe.setAttribute('contenteditable', 'true');
    iframe.setAttribute('id', 'EditorIframe');
    iframe.setAttribute('name', 'EditorIframe');
    // Adicionando uma nova clase ao iframe.
    iframe.classList.add('editorClass');
    
    // A função appendChild() insere um elemento filho (children) ao elemento pai (parent) na última posição, ela auxilia na criação de um elemento DOM
    container.appendChild(iframe);

    // Por ter setado no iframe o id, eu posso manipular o meu documento a partir do id.
    // Colocando o conteudo do textarea no iframe.
    EditorIframe.document.body.innerHTML = textAreaSelector.value;
    // document.designMode controla se o documento todo é editável. Valores validos são "on" e "off". De acordo com a especificação, esta propriedade é por padrão "off"
    EditorIframe.document.designMode = 'on';
  }

  // Barra de ferramentas onde nos alteramos o texto.
  function inicializadorBarraFerramentas(container) {
    // Inicializa a barra de ferramentas.
    var barraFerramentas = [];

    // Criando um componente do tipo botão, que vai colorir o fundo de um texto, e também passando um nome do icone do fontAwesome.
    var marcador = new buttonComponent('backColor', 'highlighter');
    marcador.recuperarValor = function () {
      /* Retorna um objeto Selection representando a parte do texto selecionada pelo usuário ou a posição atual do cursor.

      A propriedade somente leitura Selection.anchorNode retorna o Node(nó) no qual a seleção começa.

      Node.parentNode é uma propriedade DOM somente leitura que retorna o nó (node) parente de um Node referenciado na árvore DOM.

      O parentNode temos document como seu parent (elemento pai) */
      return EditorIframe.getSelection().anchorNode.parentNode.style.backgroundColor === 'yellow' ? 'white' : 'yellow';
    }

    // Criando um component do tipo select, que vai colorir a letra conforme o valor da opção selecionada.
    var corDaFonte = new selectComponent('forecolor', colors);

    // Vou passar por cada um dos options do select.
    Array.from(corDaFonte.elemento.firstChild.options).forEach((option) => {
      // Aqui eu vou estilizar a cor de cada option, com a cor que equivale aquele hexadecimal.
      option.style.color = option.value;
    });

    // FirstChild retorna o primero item da minha lista, e eu estou pegando o style color dele.
    // Depois estou pegando o valor do primeiro item da lista e atribuindo a ele.
    corDaFonte.elemento.firstChild.style.color = Array.from(corDaFonte.elemento.firstChild.options)[0].value;

    corDaFonte.recuperarValor = function () {
      // Colocando o valor(hexadecimal) do primeiro elemento da lista no estilo do primeiro elemento da lista. 
      corDaFonte.elemento.firstChild.style.color = corDaFonte.elemento.firstChild.value;
      // Retorna o o valor do elemento ja colorido.
      return corDaFonte.elemento.firstChild.value;
    }

    var link = new buttonComponent('createLink', 'link');
    link.recuperarValor = function () {
      return prompt('Entre com o endereço do link: ');
    }

    // Tipos das fontes.
    var tiposFontes = new selectComponent('fontname', fonts);

    // Tamanho das fontes
    var tamanhoFontes = new selectComponent('fontsize', sizes);

    // Negrito
    var negrito = new buttonComponent('bold', 'bold');

    // Negrito
    var italico = new buttonComponent('italic', 'italic');

    // Underline
    var underline = new buttonComponent('underline', 'underline');

    //strikethrough - risco
    var strikethrough = new buttonComponent('strikethrough', 'strikethrough');

    // 'justifyleft', 'align-left'
    var justifyleft = new buttonComponent('justifyleft', 'align-left');

    // 'justifycenter', 'align-center'
    var justifycenter = new buttonComponent('justifycenter', 'align-center');

    // 'justifyright', 'align-right'
    var justifyright = new buttonComponent('justifyright', 'align-right');

    // 'justifyfull', 'align-justify'
    var justifyfull = new buttonComponent('justifyfull', 'align-justify');

    // unlink
    var unlink = new buttonComponent('unlink', 'unlink');

    // insertOrderedList
    var inserirListaOrdenada = new buttonComponent('insertOrderedList', 'list-ol');

    // insertUnorderedList
    var inserirListaNaoOrdenada = new buttonComponent('insertUnorderedList', 'list-ul');

    // barraFeramentas é um array, e aqui eu estou colocando cada componente da nossa barra de ferramentas, para passar para o nosso renderizadorBarraFerramentas, passar por cada um dos itens e renderizal-os.
    barraFerramentas.push(
      tiposFontes,
      tamanhoFontes,
      // Preciso declarar um por vez aqui, porque nos precisamos de uma instancia de cada.
      new espaco(),
      negrito,
      italico,
      underline,
      strikethrough,
      new espaco(),
      marcador,
      new espaco(),
      corDaFonte,
      new espaco(),
      link,
      new espaco(),
      justifyleft,
      justifycenter,
      justifyright,
      justifyfull,
      new espaco(),
      unlink,
      new espaco(),
      inserirListaOrdenada,
      inserirListaNaoOrdenada
    );

    // Chamando a renderização.
    renderizadorBarraFerramentas(container, barraFerramentas);
  }

  // Quem renderiza a barra de ferramentas com os items.
  function renderizadorBarraFerramentas(container, barraFerramentas) {
    // Criar uma lista
    var listaBarraFerramentas = document.createElement('ul');
    // Adicionando a classe barraFerramentasClass
    listaBarraFerramentas.classList.add('barraFerramentasClass');

    barraFerramentas.forEach(function (component) {
      // Adicionando um item(opção na barra de ferramentas), na lista.
      listaBarraFerramentas.appendChild(component.elemento);
    })

    // Colocando a lista com todos os items.
    container.appendChild(listaBarraFerramentas);
  }

  // Executando...
  inicializador();
}
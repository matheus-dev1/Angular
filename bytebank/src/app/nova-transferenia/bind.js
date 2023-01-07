(function(){
  // Com o metodo .bind() eu posso alterar o contexto/escopo de execução de um metodo ou eu posso criar novas funções com parametros fixos, ja pré defindos.

  this.valor = 10;

  const modulo = {
    valor: 20,
    getValor: function() {
      return this.valor;
    }
  }

  // Aqui ele vai retornar o valor do contexto/escopo que ele está que no caso é no escopo do objeto modulo.
  console.log(modulo.getValor()); // valor = 20

  // Agora quando eu transfiro este arquivo para uma variavel atraves de uma atriuição, ele considera o escopo da variavel, que no caso é fora do escopo do objeto "modulo"
  const getValor = modulo.getValor;

  // valor = 10
  console.log(getValor())

  // Eu tenho o metodo bind, que basicamente eu defino emqual contexto/escopo eu quero que ele execute.
  // O contexto "this" é meio que a raiz da parada.
  const getValorThisContext = modulo.getValor.bind(this);

  // valor = 10
  console.log(getValorThisContext());

  const getValorModuloContext = modulo.getValor.bind(modulo);

  console.log(getValorModuloContext());

  // Funções parciais
  function funcao1(parametro1, parametro2){
    console.log(parametro1, parametro2);
  }

  // Com o bind em funçoes onde eu quero atribuir em uma outra variavel ou outra forma de entender é criar outra variavel a partir de uma outra, eu posso já definir valores fixo que quando eu chamar a outra função(funcao2), ela já vai estar com o primiro valor fixo.
  const funcao2 = funcao1.bind(null, "Parametro1-Valor");
  funcao2("Parametro2-Valor");

})()

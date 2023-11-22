const express = require('express'); // faz o requerimento do express
const app = express(); // declara o app utilizado (express)
 
app.use(express.json()); // permite utilização do json

app.get('/majorcount', (request, response) => { // chama a rota
  const { stringToCountMajor } = request.query; // declara a variavel e requere ela

  if(!stringToCountMajor){ 
    response.status(400).json({ Error: "Não é valido uma string vazia!" })
  } // if para caso insiram uma string vazia

  const stringToLowerCase = stringToCountMajor.toLocaleLowerCase("pt-BR") // coloca todos os caracteres em minusculo
  const stringNoDotESpace = stringToLowerCase
  .replaceAll(".", "") // tira os pontos 
  .replaceAll(" ", "") // tira os espaços 

  const stringArray = stringNoDotESpace.split("") // torna a string em um array

  const letterCount = {}
  const bigCountLetter = {
    letter: "a",
    count: 0,
  } // construimos dois objetos (uma para receber a contagem de letras e outro para receber a maior contagem de letras)

  stringArray.forEach(letter => {
    letterCount[letter] = letterCount[letter] ? letterCount[letter] + 1 : 1
    // for each varre o array e le as letras dele, identificando se há letras diferentes e adicionando elas, ou somando + 1 se a letra for igual
    
    if (letterCount[letter] > bigCountLetter.count) {
      bigCountLetter.letter = letter;
      bigCountLetter.count = letterCount [letter]
    } //if para diferenciar qual letra aparece mais no objeto, fazendo a comparação
  });
  
  response.send(bigCountLetter) 
})

app.listen(3000);
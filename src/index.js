const express = require('express');
const app = express();
 
app.use(express.json());

app.get('/majorcount', (request, response) => {
  const { stringToCountMajor } = request.query; 

  if(!stringToCountMajor){ 
    response.status(400).json({ Error: "Não é valido uma string vazia!" })
  } 

  const stringToLowerCase = stringToCountMajor.toLocaleLowerCase("pt-BR")
  const stringNoDotESpace = stringToLowerCase
  .replaceAll(".", "")
  .replaceAll(" ", "")

  const stringArray = stringNoDotESpace.split("") 

  const letterCount = {}
  const bigCountLetter = {
    letter: "a",
    count: 0,
  } 

  stringArray.forEach(letter => {
    letterCount[letter] = letterCount[letter] ? letterCount[letter] + 1 : 1
    
    if (letterCount[letter] > bigCountLetter.count) {
      bigCountLetter.letter = letter;
      bigCountLetter.count = letterCount [letter]
    }
  });
  
  response.send(bigCountLetter) 
})

app.listen(3000);
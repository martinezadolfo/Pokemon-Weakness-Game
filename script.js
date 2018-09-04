var answer, guess, hint;
const numbers = ["zero", "one", "two", "three", "four"]; 
const types = ["fire", "grass", "electric", "ground", "water"];
const pokemons = [
  {
    name: "bulbasaur",
    type: "grass",
    weakness: "fire"

  },
  {
    name: "charmander",
    type: "fire",
    weakness: "water"
  },
  {
    name: "squirtle",
    type: "water",
    weakness: "electric"
  },
  {
    name: "pickachu",
    type: "electric",
    weakness: "ground"
  },
  {
    name: "caterpie",
    type: "bug",
    weakness: "grass"
  }
]

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkAnswer(id) {
  guess = document.getElementById('option-' + id + '-name').textContent.toLowerCase();
  if (guess === answer) {
    document.getElementById('option-' + id).setAttribute('src', './answers/checkmark.png');
    document.getElementById('current-score').innerHTML = 'changed';
    
  } else {
    document.getElementById('option-' + id).setAttribute('src', './answers/X.png');
  }
}

function setRound() {
  Shuffle(numbers).map((x, index) => {
    let randomNumber = getRandomInt(0, 4);
    let pokemonPicture = document.getElementById('pokemon-picture');
    let pokemonName = document.getElementById('pokemon-name');
    let option = document.getElementById('option-' + x);
    let optionName = document.getElementById('option-' + x + '-name');
    pokemonPicture.setAttribute("src", "./pokemons/" + pokemons[randomNumber].name + ".png");
    pokemonName.innerHTML = pokemons[randomNumber].name.charAt(0).toUpperCase() + pokemons[randomNumber].name.slice(1);
    option.setAttribute("src", "./symbols/" + types[index] + ".png");
    optionName.innerHTML = types[index].charAt(0).toUpperCase() + types[index].slice(1);
    answer = pokemons[randomNumber].weakness;
    hint = pokemons[randomNumber].type;
  });
}

numbers.forEach(element => document.getElementById('option-' + element).addEventListener('click', () => {checkAnswer(element);})); // adding listeners to each option
document.getElementById('hint-button').addEventListener('click', function() {document.getElementById('hint-type').setAttribute('src', './symbols/' + hint + '.png');}); //add listener to hint
setRound();
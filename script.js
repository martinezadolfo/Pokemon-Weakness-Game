var answer, hint;

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
  let score = document.getElementById('current-score').textContent.toLowerCase().split(' ');
  guess = document.getElementById('option-' + id + '-name').textContent.toLowerCase();
  if (guess === answer) {
    document.getElementById('option-' + id).setAttribute('src', './answers/checkmark.png');
    let scoreChange = Number(score.slice()[0]);
    scoreChange++;
    document.getElementById('current-score').innerHTML = scoreChange.toString() + ' out of 5 correct';
  } else {
    document.getElementById('option-' + id).setAttribute('src', './answers/X.png');
  }
  if (document.getElementById('play-again-options').style.visibility === 'visible'){
    return;
  } else {
    arrow.style.visibility = "visible"; 
    
  }
}

function setOptions(optionsArray) {
  document.getElementById('arrow').style.visibility = 'hidden';
  Shuffle(optionsArray).map((x, index) => { // runs through shuffled array of numbers
    let option = document.getElementById('option-' + x);
    let optionName = document.getElementById('option-' + x + '-name');
    option.setAttribute("src", "./symbols/" + types[index] + ".png"); // sets option
    optionName.innerHTML = types[index].charAt(0).toUpperCase() + types[index].slice(1); // sets option type name
  });
}



function setBoard() {
  if (newChoices.length === 0) {
    newChoices = Shuffle(pokemonChoices.slice());
    document.getElementById('arrow').style.visibility = 'hidden';
    document.getElementById('play-again-options').style.visibility = 'visible';
  } else {
    setOptions(numbers);
    setQuestion(newChoices);  
  }
                                                                                                                                                                                                   
}

function setQuestion(options) {
  document.getElementById('hint-type').setAttribute('src', '');
  let pokemonPicture = document.getElementById('pokemon-picture');
  let pokemonName = document.getElementById('pokemon-name');
  pokemonPicture.setAttribute("src", "./pokemons/" + pokemons[options[0]].name + ".png"); //sets pokemon picture
  pokemonName.innerHTML = pokemons[options[0]].name.charAt(0).toUpperCase() + pokemons[options[0]].name.slice(1); // sets pokemon name
  answer = pokemons[options[0]].weakness;
  hint = pokemons[options[0]].type;
  document.getElementById('hint-button').addEventListener('click', function() {document.getElementById('hint-type').setAttribute('src', './symbols/' + hint + '.png');}); //add listener to hint 
  options.shift();
}

const pokemonChoices = [0, 1, 2, 3, 4];
const numbers = ["zero", "one", "two", "three", "four"]; 
let newChoices = Shuffle(pokemonChoices.slice());
document.getElementById('arrow').addEventListener('click', setBoard);
document.getElementById('yes-button').addEventListener('click', function () {
  document.getElementById('play-again-options').style.visibility = 'hidden';
  document.getElementById('current-score').innerHTML = '0 out of 5 correct';
  setBoard();
});
numbers.forEach(element => document.getElementById('option-' + element).addEventListener('click', () => {checkAnswer(element);})); // adding listeners to each option

setBoard();

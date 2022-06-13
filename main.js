var words = [
  "tobogan",
  "esmeralda",
  "radio",
  "computadora",
  "oraculo",
  "amarillo",
];

function addWord(word) {
  words.push(word);
}

addWord("veni");
addWord("dale");
addWord("mercedes");

function randomWord() {
  var word = words[Math.floor(Math.random() * words.length)].split("");
  return word;
}

var word = randomWord();
console.log(word);

var main = document.getElementById("main");
var menu = document.createElement("div");
var play = document.createElement("div");
play.classList.add("play");

var counter = 0;
var hits = 0;
var lifes = 3;

var btnStart = document.createElement("button");
btnStart.textContent = "COMENZAR A JUGAR!";
btnStart.onclick = playing;

function starting() {
  main.appendChild(menu);
  var divTitle = document.createElement("p");
  var divMenu = document.createElement("div");
  menu.appendChild(divTitle);
  divMenu.appendChild(btnStart);
  menu.appendChild(divMenu);
}

function playing() {
  main.appendChild(play);
  var divCounter = document.createElement("div");
  divCounter.textContent = `Oportunidades restantes: ${lifes}`;
  play.appendChild(divCounter);
  word.forEach(function (letters) {
    counter++;
    var divLetter = document.createElement("div");
    divLetter.classList.add("divLetters");
    var inputLetter = document.createElement("input");
    inputLetter.classList.add("letter");
    divLetter.appendChild(inputLetter);
    inputLetter.maxLength = "1";
    inputLetter.autocomplete = "off";
    inputLetter.autocapitalize = "sentences";
    inputLetter.setAttribute("id", counter);
    play.appendChild(divLetter);
    var regExpLetterOk = new RegExp(letters, "i");
    inputLetter.oninput = function () {
      if (lifes >= 1) {
        if (regExpLetterOk.test(inputLetter.value)) {
          inputLetter.classList.add("okLetter");
          hits++;
          console.log(hits);
          console.log("letra correcta!");
        } else {
          inputLetter.classList.add("errorLetter");
          console.log(hits);
          console.log("letra incorrecta!");
          if (lifes >= 1) {
            lifes--;
            divCounter.textContent = `Oportunidades restantes: ${lifes}`;
          }

          setTimeout(function () {
            inputLetter.classList.remove("errorLetter");
            inputLetter.classList.remove("okLetter");
            inputLetter.value = "";
          }, 2000);
        }

        if (word.length == hits) {
          divCounter.textContent = `GANASTE!!!`;
        }
        return;
      } else {
        inputLetter.classList.add("errorLetter");
        divCounter.textContent = `PERDISTE LA PARTIDA`;
      }
    };
  });
}

starting();

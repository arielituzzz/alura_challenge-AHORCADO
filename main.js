var words = [
  "homero",
  "marge",
  "lisa",
  "bart",
  "maggie",
  "moe",
  "barnie",
  "burns",
  "flanders",
  "ned",
  "montgomery",
  "apu",
  "nelson",
  "krusty",
  "edna",
  "bob",
  "smithers",
  "jeff",
  "ralph",
  "skinner",
  "gorgory",
  "martin",
  "santa",
  "abraham",
  "julius",
  "carl",
  "willie",
  "patty",
  "kearney",
  "lenny",
  "selma",
  "troy",
  "kent",
];

function addWord(word) {
  words.push(word);
}

function randomWord() {
  var word = words[Math.floor(Math.random() * words.length)];
  var lettersWord = word.split("");
  var wordX = { complete: word, letters: lettersWord };
  return wordX;
}
const regExpMayus = /[A-Zá-ýÁ-Ý]/g;
const regExpCaract = /[`~@#$%^&*()_+-={\}\\\|:;'"<>?/,.]/g;

var main = document.getElementById("main");
var menu = document.createElement("div");
menu.classList.add("menu");
var play = document.createElement("div");
play.classList.add("play");

var counter = 0;
var hits = 0;
var lifes = 5;

var msgRegExpOk =
  "Hasta 9 letras en minuscula (no se admite numeros ni caracteres especiales)";
var msgRegExpFail = "Ingresaste mal uno o varios caracteres";

//*********** NODOS DE BOTONES************** */
//-------------SECCION MENU------------------
var btnStart = document.createElement("button");
btnStart.classList.add("menu__divMenu__btns");
btnStart.textContent = "COMENZAR!";
btnStart.onclick = playing;
var btnAddWord = document.createElement("button");
btnAddWord.classList.add("menu__divMenu__btns");
btnAddWord.textContent = "AGREGAR PALABRA";
//-------------SECCION PLAY------------------
var btnBackToMenu = document.createElement("button");
btnBackToMenu.classList.add("play__divPlay__divActions__btns");
btnBackToMenu.textContent = "Volver al menu...";
btnBackToMenu.onclick = backToMenu;
var btnPlayAgain = document.createElement("button");
btnPlayAgain.classList.add("play__divPlay__divActions__btns");
btnPlayAgain.textContent = "Otra palabra";
btnPlayAgain.onclick = playing;
//***************************************** */

//-----------INGRESO DE NUEVA PALABRA------------
var divInputWord = document.createElement("div");
var boxBtnsWord = document.createElement("div");
boxBtnsWord.classList.add("menu__divMenu__alternativeBox__boxOptions");
var confirmWord = document.createElement("button");
confirmWord.classList.add("menu__divMenu__alternativeBox__boxOptions__btns");
confirmWord.textContent = "CONFIRMAR";
confirmWord.onclick = addWord;
var cancelWord = document.createElement("button");
cancelWord.textContent = "CANCELAR";
cancelWord.classList.add("menu__divMenu__alternativeBox__boxOptions__btns");
var inputWord = document.createElement("input");
inputWord.classList.add("menu__divMenu__alternativeBox__input");
var messageRegexp = document.createElement("p");
messageRegexp.textContent = msgRegExpOk;
messageRegexp.classList.add("menu__divMenu__alternativeBox__msg");
inputWord.maxLength = "9";
boxBtnsWord.appendChild(confirmWord);
boxBtnsWord.appendChild(cancelWord);
divInputWord.appendChild(boxBtnsWord);
divInputWord.appendChild(inputWord);
divInputWord.appendChild(messageRegexp);
//-----------------------------------------------

function win() {
  var boxWin = document.createElement("div");
  boxWin.classList.add("play__divPlay__divCounter__boxWin");
  var msgWin = document.createElement("p");
  msgWin.classList.add("play__divPlay__divCounter__boxWin__msgWin");
  msgWin.textContent = "GANASTE!!!";
  boxWin.appendChild(msgWin);
  return boxWin;
}

function lose(word) {
  var textLose = document.createElement("p");
  textLose.classList.add("play__divPlay__divCounter__textLose");
  textLose.textContent = "PERDISTE";
  var boxLose = document.createElement("div");
  boxLose.classList.add("play__divPlay__boxLose");
  var msgLose = document.createElement("p");
  msgLose.classList.add("play__divPlay__boxLose__msgLose");
  msgLose.textContent = "El personaje es";
  var wordLose = document.createElement("p");
  wordLose.classList.add("play__divPlay__boxLose__wordLose");
  wordLose.textContent = word;
  boxLose.appendChild(msgLose);
  boxLose.appendChild(wordLose);
  var userLose = { msg: textLose, answer: boxLose };
  return userLose;
}

function backToMenu() {
  play.classList.add("fade-out");
  setTimeout(function () {
    starting();
  }, 1000);
}
function starting() {
  changeAction();
  menu.classList.add("animationFadeIn");
  main.appendChild(menu);
  var divMenu = document.createElement("div");
  divMenu.classList.add("menu__divMenu");
  btnAddWord.onclick = () => {
    divMenu.replaceChild(divInputWord, btnAddWord);
    divInputWord.classList.add("menu__divMenu__alternativeBox");
    divInputWord.classList.add("animationFadeIn");
    btnStart.disabled = true;
    setTimeout(function () {
      divInputWord.classList.remove("animationFadeIn");
    }, 1000);
  };
  cancelWord.onclick = () => {
    divInputWord.classList.remove("animationFadeIn");
    divInputWord.classList.add("fade-out");
    setTimeout(function () {
      divMenu.replaceChild(btnAddWord, divInputWord);
      inputWord.value = "";
      messageRegexp.textContent = msgRegExpOk;
      divInputWord.classList.remove("fade-out");
      btnStart.disabled = false;
    }, 1000);
  };
  inputWord.oninput = () => {
    if (regExpMayus.test(inputWord.value)) {
      confirmWord.disabled = true;
      messageRegexp.textContent = msgRegExpFail;
    } else if (regExpCaract.test(inputWord.value)) {
      confirmWord.disabled = true;
      messageRegexp.textContent = msgRegExpFail;
    } else {
      confirmWord.disabled = false;
      messageRegexp.textContent = msgRegExpOk;
    }
  };
  divMenu.appendChild(btnStart);
  divMenu.appendChild(btnAddWord);
  menu.appendChild(divMenu);
  setTimeout(function () {
    menu.classList.remove("animationFadeIn");
    play.classList.remove("fade-out");
  }, 1000);
}

function changeAction() {
  while (play.firstChild) {
    play.removeChild(play.firstChild);
    main.removeChild(play);
  }

  while (menu.firstChild) {
    menu.removeChild(menu.firstChild);
  }

  lifes = 5;
  hits = 0;
}

function playing() {
  menu.classList.add("fade-out");
  btnPlayAgain.classList.add("fade-out");

  setTimeout(function () {
    btnPlayAgain.classList.remove("fade-out");
    play.classList.add("animationFadeIn");
    if (menu.hasChildNodes()) {
      main.removeChild(menu);
    }
    changeAction();
    var divPlay = document.createElement("div");
    divPlay.classList.add("play__divPlay");
    var word = randomWord();
    console.log(word.complete);
    var divCounter = document.createElement("div");
    divCounter.classList.add("play__divPlay__divCounter");
    var textCounter = document.createElement("p");
    textCounter.classList.add("play__divPlay__divCounter__text");
    textCounter.textContent = "Oportunidades";
    var numCounter = document.createElement("p");
    numCounter.classList.add("play__divPlay__divCounter__num");
    numCounter.textContent = lifes;
    var divLetters = document.createElement("div");
    divLetters.classList.add("play__divPlay__divLetters");
    var divActions = document.createElement("div");
    divActions.classList.add("play__divPlay__divActions");
    divCounter.appendChild(textCounter);
    divCounter.appendChild(numCounter);
    divActions.appendChild(btnPlayAgain);
    divActions.appendChild(btnBackToMenu);
    divPlay.appendChild(divCounter);
    divPlay.appendChild(divLetters);
    divPlay.appendChild(divActions);
    play.appendChild(divPlay);
    main.appendChild(play);

    word.letters.forEach(function (letter) {
      var regExpLetter = new RegExp(letter, "i");
      var letters = document.createElement("div");
      letters.classList.add("play__divPlay__divLetters__letters");
      var inputLetter = document.createElement("input");
      inputLetter.classList.add(
        "play__divPlay__divLetters__letters__inputLetter"
      );
      inputLetter.maxLength = "1";
      inputLetter.autocomplete = "off";
      letters.appendChild(inputLetter);
      divLetters.appendChild(letters);

      inputLetter.oninput = function () {
        if (lifes > 1) {
          if (regExpLetter.test(inputLetter.value)) {
            inputLetter.classList.add("okLetter");
            hits++;
            // console.log(hits);
            // console.log("letra correcta!");
          } else {
            inputLetter.classList.add("errorLetter");
            // console.log(hits);
            // console.log("letra incorrecta!");
            if (lifes >= 1) {
              lifes--;
              numCounter.textContent = lifes;
            }

            setTimeout(function () {
              inputLetter.classList.remove("errorLetter");
              inputLetter.classList.remove("okLetter");
              inputLetter.value = "";
            }, 1000);
          }

          if (word.letters.length == hits) {
            while (divCounter.firstChild) {
              divCounter.removeChild(divCounter.firstChild);
            }
            divCounter.appendChild(win());
            // divCounter.textContent = `GANASTE!!!`;
            // divCounter.classList.add("animationWin");
            btnPlayAgain.focus();
          }
        } else {
          inputLetter.disabled = true;
          btnPlayAgain.focus();
          var lettersNodes = divLetters.childNodes;
          lettersNodes.forEach(function (lettersEnable) {
            var inputs = lettersEnable.firstChild;
            inputs.disabled = true;
          });
          divPlay.appendChild(lose(word.complete).answer);
          while (divCounter.firstChild) {
            divCounter.removeChild(divCounter.firstChild);
          }
          divCounter.appendChild(lose().msg);
        }
      };
    });
    setTimeout(function () {
      play.classList.remove("animationFadeIn");
      menu.classList.remove("fade-out");
    }, 1000);
  }, 1000);
}

starting();

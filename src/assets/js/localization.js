const domElements = require("../../mock/localization.json");
const getLang = require("./getLang");
const changeHTML = require("../../assets/js/changeHTML");
import birdsDataEn from "../../mock/en";
import birdsData from "../../mock/ru";
import { currGame } from "./currGame";

const localMenu = (lang) => {
  let i = 0;

  document
    .querySelectorAll(".nav__link")
    .forEach((elem) => (elem.innerHTML = domElements.mainMenu[lang][i++]));
};
const localIndex = (lang) => {
  document.querySelector(".text_h1").innerHTML = domElements.startText[lang];
};

const localGame = (lang) => {
  document.querySelector(".button_next").innerHTML = domElements.nextBtn[lang];
  document.querySelector(".score").innerHTML = domElements.score[lang];
  let i = 0;

  document
    .querySelectorAll(".answer__question p")
    .forEach((elem) => (elem.innerHTML = domElements.answerAdvise[lang][i++]));

  let currData = birdsDataEn;

  if (lang == "ru") {
    currData = birdsData;
  }

  changeHTML.changeMenu(currData.map((elem) => elem[0].type));
  changeHTML.changeTextQuiz(
    currData[currGame.currentLevel].map((elem) => elem.name)
  );
  if (!document.querySelector(".question__header").innerHTML.includes("***")) {
    changeHTML.changeQuestionName(
      currData[currGame.currentLevel][currGame.correctAnswer].name
    );
  }
  changeHTML.changeAnswer(
    currData[currGame.currentLevel][currGame.selectedCurr]
  );
};

const localResult = (lang) => {
  document.querySelector(".card_win .text_congrats").innerHTML =
    domElements.resultHeaderWin[lang];
  document.querySelector(".card_win .text_congrats2").innerHTML =
    domElements.resultWin[lang];
  document.querySelector(".card_loose .text_congrats").innerText =
    domElements.resultHeaderLoose[lang];
  document.querySelector(".card_loose .button__result").innerHTML =
    domElements.btnPlay[lang];
};

const galleryResult = (lang) => {
  let currData = birdsDataEn;

  if (lang == "ru") {
    currData = birdsData;
  }
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) =>
    changeHTML.changeAnswer(
      currData[card.dataset.idGroup][card.dataset.idCard - 1],
      card
    )
  );
};

const localPage = (lang) => {
  localMenu(lang);
  // console.log(window.location.pathname);
  let path = window.location.pathname;
  console.log(path.substring(path.lastIndexOf("/")));
  switch (path.substring(path.lastIndexOf("/"))) {
    case "/":
    case "/index.html":
      localIndex(lang);
      break;
    case "/game.html":
      localGame(lang);
      break;
    case "/result.html":
      localResult(lang);
      break;
    case "/gallery.html":
      galleryResult(lang);
      break;
  }
};

const setLang = (lang) => {
  localStorage.setItem("langBird", lang);

  localPage(lang);
  // to do localPage;
};

let lang = getLang.getLang();

if (lang == "ru") document.querySelector("#idChangeLang").checked = true;
else document.querySelector("#idChangeLang").checked = false;

setLang(lang);

document.querySelector("#idChangeLang").addEventListener("change", (e) => {
  if (e.target.checked) {
    setLang("ru");
  } else {
    setLang("en");
  }
});

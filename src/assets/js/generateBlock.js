import birdsDataEn from "../../mock/en";
import birdsData from "../../mock/ru";
const changeHtmL = require("./changeHTML");
const player = require("./player");
const getLang = require("./getLang");
import { currGame } from "./currGame";

let isFound = false;
let totalScore = 0;
const scoreAnsw = 5;
let currScore = scoreAnsw;

changeHtmL.setScore(totalScore);

const chooseAnswer = (e) => {
  const answers = document.querySelectorAll(".quis__answer");
  currGame.selectedCurr = [...answers].indexOf(e.target);
  let isCorrect = currGame.selectedCurr == currGame.correctAnswer;
  const lang = getLang.getLang();
  let currData = birdsDataEn;
  if (lang == "ru") currData = birdsData;

  if (isCorrect && !e.target.classList.contains("quis__answer_correct")) {
    e.target.classList.add("quis__answer_correct");
    const audio = new Audio();
    audio.src = require("../music/correct.mp3");
    audio.autoplay = true;
    isFound = true;
    document.querySelector(".button_next").disabled = false;
    changeHtmL.changeQuestionName(
      currData[currGame.currentLevel][currGame.correctAnswer].name
    );
    changeHtmL.changeQuestionImg(
      currData[currGame.currentLevel][currGame.correctAnswer].image
    );
    player.stop();
    totalScore += currScore;
    changeHtmL.setScore(totalScore);
    currScore = scoreAnsw;
  }

  if (!isFound && !e.target.classList.contains("quis__answer_wrong")) {
    currScore--;
    e.target.classList.add("quis__answer_wrong");
    const audio = new Audio();
    audio.src = require("../music/wrong.mp3");
    audio.autoplay = true;
  }

  // view information about selected bird
  changeHtmL.changeAnswer(
    currData[currGame.currentLevel][currGame.selectedCurr]
  );
  const answer = document.querySelector(".answer__question");
  if (!answer.classList.contains("answer__hide"))
    answer.classList.add("answer__hide");
  document.querySelector(".answer__correct").classList.remove("answer__hide");
};

const generateBlock = () => {
  const lang = getLang.getLang();
  let currData = birdsDataEn;
  if (lang == "ru") currData = birdsData;
  isFound = false;
  console.log(currGame.currentLevel);
  currGame.correctAnswer = Math.floor(
    Math.random() * currData[currGame.currentLevel].length
  );
  changeHtmL.changeQuestionImg(require("../../assets/img/maxresdefault.jpg"));
  changeHtmL.changeQuestionName("*******");
  console.log(currData[currGame.currentLevel][currGame.correctAnswer].audio);
  document.querySelector(".question__audio").src =
    currData[currGame.currentLevel][currGame.correctAnswer].audio;
  const answer = document.querySelector(".answer__correct");
  if (!answer.classList.contains("answer__hide"))
    answer.classList.add("answer__hide");
  document.querySelector(".answer__question").classList.remove("answer__hide");
  changeHtmL.changeTextQuiz(
    currData[currGame.currentLevel].map((elem) => elem.name)
  );
  document.querySelector(".button_next").disabled = true;
  const answers = document.querySelectorAll(".quis__answer");
  answers.forEach((elem) => {
    elem.classList.remove("quis__answer_wrong");
    elem.classList.remove("quis__answer_correct");
  });
};
generateBlock();
const answers = document.querySelectorAll(".quis__answer");

answers.forEach((answer) => answer.addEventListener("click", chooseAnswer));

document.querySelector(".button_next").addEventListener("click", () => {
  currGame.currentLevel++;
  if (currGame.currentLevel < birdsData.length) {
    const menuInputs = document.querySelectorAll(".menu__input");
    menuInputs[currGame.currentLevel - 1].classList.remove("active");
    menuInputs[currGame.currentLevel - 1].checked = true;
    menuInputs[currGame.currentLevel].classList.add("active");
    generateBlock();
  } else {
    localStorage.setItem("scoreBirds", totalScore);
    window.open("result.html", "_self");
  }
});

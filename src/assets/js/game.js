const chooseAnswer = (e) => {
  if (isWrong) {
    e.target.classList.add("quis__answer_wrong");
    const audio = new Audio();
    audio.src = require("../music/wrong.mp3");
    audio.autoplay = true;
  } else {
    e.target.classList.add("quis__answer_correct");
    const audio = new Audio();
    audio.src = require("../music/correct.mp3");
    audio.autoplay = true;
  }
};

const answers = document.querySelectorAll(".quis__answer");
answers.forEach((answer) => answer.addEventListener("click", chooseAnswer));

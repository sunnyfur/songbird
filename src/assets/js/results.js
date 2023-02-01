const totalScore = localStorage.getItem("scoreBirds");
const maxScore = 5 * 6;
const cardWin = document.querySelector(".card_win");
const cardLoose = document.querySelector(".card_loose");
if (totalScore < maxScore) {
  document.querySelector(".score_result").innerHTML = totalScore;
  cardLoose.classList.remove("card_hide");
  if (!cardWin.classList.contains("card_hide"))
    cardWin.classList.add("card_hide");
} else {
  cardWin.classList.remove("card_hide");
  if (!cardLoose.classList.contains("card_hide"))
    cardLoose.classList.add("card_hide");
}

document.querySelector(".button__result").addEventListener("click", () => {
  window.open("game.html", "_self");
});

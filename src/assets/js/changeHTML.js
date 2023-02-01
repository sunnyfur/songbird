export const changeTextQuiz = (arrText) => {
  const arrQuiz = document.querySelectorAll(".quis__answer");
  let i = 0;
  arrQuiz.forEach((elem) => (elem.innerHTML = arrText[i++]));
};

export const changeMenu = (arrText) => {
  const menuItems = document.querySelectorAll(".menu__label");

  let i = 0;
  menuItems.forEach((elem) => (elem.innerHTML = arrText[i++]));
};

export const changeQuestionImg = (url) => {
  const photo = document.querySelector(".question__photo");
  photo.style.backgroundImage = `url(${url})`;
};

export const changeQuestionName = (name) => {
  document.querySelector(".question__header").innerHTML = name;
};

export const setScore = (score) => {
  document.querySelector(".score__wrapper span").innerHTML = score;
};

export const changeAnswer = (answer, card = document) => {
  card.querySelector(".answer__img").src = answer.image;
  card.querySelector(".answer__name").innerHTML = answer.name;
  card.querySelector(".answer__species").innerHTML = answer.species;
  card.querySelector(".answer__audio").src = answer.audio;
  card.querySelector(".answer__description").innerHTML = answer.description;
};

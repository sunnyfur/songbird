const dom = require("./createElementDom");
import birdsDataEn from "../../mock/en";
import birdsData from "../../mock/ru";
const getLang = require("./getLang");
const player = require("./player");

const cardDraw = (card) => {
  const cardHtml = dom.createElemDOM("div", "card");
  const cardGallery = dom.createElemDOM("div", "gallery__card");
  cardHtml.dataset.idCard = card.id;
  cardHtml.dataset.idGroup = currType;
  cardHtml.appendChild(cardGallery);
  const img = cardGallery.appendChild(dom.createElemDOM("img", "answer__img"));
  img.src = card.image;
  img.alt = card.name;
  cardGallery.appendChild(dom.createElemDOM("h3", "answer__name", card.name));
  cardGallery.appendChild(
    dom.createElemDOM("p", "answer__species", card.species)
  );

  const playerHTML = cardGallery.appendChild(
    dom.createElemDOM("div", "player answer__player")
  );
  const audio = playerHTML.appendChild(
    dom.createElemDOM("audio", "player__audio answer__audio")
  );
  audio.src = card.audio;
  const btn = playerHTML.appendChild(
    dom.createElemDOM("button", "player__btn button", "►")
  );
  btn.type = "button";
  playerHTML.appendChild(dom.createElemDOM("span", "player__current"));
  const inputPlayer = playerHTML.appendChild(
    dom.createElemDOM("input", "player__range player__range_track", "►")
  );
  inputPlayer.type = "range";
  inputPlayer.min = 0;
  inputPlayer.max = 20;
  inputPlayer.value = 0;
  inputPlayer.step = 1;
  playerHTML.appendChild(dom.createElemDOM("span", "player__total"));
  const soundWrapper = playerHTML.appendChild(
    dom.createElemDOM("div", "player__wrapper")
  );
  soundWrapper.appendChild(dom.createElemDOM("div", "player__sound"));
  const inputSound = soundWrapper.appendChild(
    dom.createElemDOM("input", "player__range player__range_sound")
  );
  inputSound.type = "range";
  inputSound.min = 0;
  inputSound.max = 100;
  inputSound.value = 50;
  inputSound.step = 1;

  cardGallery.appendChild(playerHTML);
  player.playerComm(playerHTML);
  cardGallery.appendChild(
    dom.createElemDOM("p", "answer__description", card.description)
  );

  return cardHtml;
};

let currType = 0;
let currentItem = 0;
let items = [];

function hideItem(direction) {
  isEnabled = false;

  items[0].classList.add(direction);
  items[0].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
    this.remove();
  });
}
function showItem(direction) {
  items[1].classList.add("active", direction);
  items[1].addEventListener("animationend", function () {
    this.classList.remove(direction);

    isEnabled = true;
    btnL.removeAttribute("disabled");
    btnR.removeAttribute("disabled");
  });
}

const changeCurrentItem = (n) => {
  currentItem += n;
  if (currentItem >= birdsDataEn[currType].length) {
    currType += 1;
    currentItem = 0;
    if (currType >= birdsDataEn.length) {
      currType = 0;
    }
  }
  if (currentItem < 0) {
    currType -= 1;
    if (currType < 0) currType = birdsDataEn.length - 1;
    currentItem = birdsDataEn[currType].length - 3;
  }
  console.log("currentItem", currentItem);
  console.log("currType", currType);
};

function previousItem() {
  items = document.querySelectorAll(".gallery__wrapper");
  hideItem("to-right");
  //   changeCurrentItem();
  // changeCurrentItem(-3);
  showItem("from-left");
}
function nextItem() {
  items = document.querySelectorAll(".gallery__wrapper");
  hideItem("to-left");
  // changeCurrentItem();
  // changeCurrentItem(3);
  showItem("from-right");
}

const generateCards = () => {
  const lang = getLang.getLang();
  let currData = birdsDataEn;
  if (lang == "ru") currData = birdsData;
  const cards = dom.createElemDOM("div", "gallery__wrapper");
  for (let i = 0; i < 3; i++) {
    cards.appendChild(cardDraw(currData[currType][currentItem + i]));
  }
  // currentItem += 3;

  return cards;
};

const carousel = document.querySelector(".gallery__container");
// for (let i = 0; i < 3; i++) {
//   galleryWrapper.appendChild(cardDraw(birdsDataEn[0][i]));
// }

const btnR = document.querySelector(".gallery__btn_r");
const btnL = document.querySelector(".gallery__btn_l");
let isEnabled = true;
carousel.appendChild(generateCards());
document.querySelector(".gallery__wrapper").classList.add("active");
btnL.addEventListener("click", function () {
  btnL.setAttribute("disabled", "disabled");
  btnR.setAttribute("disabled", "disabled");
  if (isEnabled) {
    changeCurrentItem(-3);
    carousel.appendChild(generateCards());
    previousItem();
  }
});
btnR.addEventListener("click", function () {
  btnL.setAttribute("disabled", "disabled");
  btnR.setAttribute("disabled", "disabled");
  if (isEnabled) {
    changeCurrentItem(3);
    carousel.appendChild(generateCards());
    nextItem();
  }
});

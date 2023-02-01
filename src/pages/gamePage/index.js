import "./index.scss";

const player = require("../../assets/js/player");
require("../../assets/js/generateBlock");
require("../../assets/js/localization");
player.playerComm(document.querySelector(".question__player"));
player.playerComm(document.querySelector(".answer__player"));

const getTime = (time) => {
  const seconds = "0" + Math.floor(time % 60);
  const minutes = "0" + Math.floor(time / 60);
  return minutes.substr(-2) + ":" + seconds.substr(-2);
};

export const playerComm = (player) => {
  // const player = document.querySelector(".player");
  const playBtn = player.querySelector(".player__btn");
  const playRange = player.querySelector(".player__range_track");
  const soundRange = player.querySelector(".player__range_sound");
  const audio = player.querySelector(".player__audio");
  const totalTimeHTML = player.querySelector(".player__total");
  const currentTimeHTML = player.querySelector(".player__current");

  let isPlaying = false;
  // console.log(soundRange);

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      playBtn.innerHTML = "►";
    } else {
      audio.play();
      playBtn.innerHTML = "❚❚";
    }
    isPlaying = !isPlaying;
  });
  const progress = () => {
    playRange.value = audio.currentTime;
    // totalTimeHTML.innerHTML = audio.duration;
    currentTimeHTML.innerHTML = getTime(audio.currentTime);

    // console.log(playRange);
  };
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    playBtn.innerHTML = "►";
    isPlaying = false;
  });

  audio.addEventListener("timeupdate", progress);
  audio.addEventListener("loadedmetadata", () => {
    playRange.setAttribute("max", audio.duration);
    currentTimeHTML.innerHTML = getTime(audio.currentTime);
    totalTimeHTML.innerHTML = getTime(audio.duration);
  });

  playRange.addEventListener("input", () => {
    audio.currentTime = playRange.value;
  });
  soundRange.addEventListener("input", () => {
    audio.volume = soundRange.value / 100;
    // console.log(soundRange.value / 100);
  });
};

export const stop = () => {
  const player = document.querySelector(".question__player");
  const audio = player.querySelector(".player__audio");
  audio.currentTime = audio.duration;
};

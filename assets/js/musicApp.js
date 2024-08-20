// "use strict";
// const bgBody = ["#2b2b2b","#393939", "#8c5920", "#afa999", "#384d8c", "#2d241d", "#797e77", "#803a32","#abb0b3","#C1876B","#5860a1","#ad9372","#a67c90","#6a5b9e","#78caa6","#92837e","#8c8c8c","#6c2b23","#826e92","#272729","#596573","#5f6a60","#7e4a9c","#6a7a4a","#21201c","#444a40","#616161","#012d2e","#545253","#ffcfcf","#4f665e","#444b44",];
// const body = document.body;
// const player = document.querySelector(".player");
// const playerHeader = player.querySelector(".player__header");
// const playerControls = player.querySelector(".player__controls");
// const playerPlayList = player.querySelectorAll(".player__song");
// const playerSongs = player.querySelectorAll(".audio");
// const playButton = player.querySelector(".play");
// const nextButton = player.querySelector(".next");
// const backButton = player.querySelector(".back");
// const playlistButton = player.querySelector(".playlist");
// const slider = player.querySelector(".slider");
// const sliderContext = player.querySelector(".slider__context");
// const sliderName = sliderContext.querySelector(".slider__name");
// const sliderTitle = sliderContext.querySelector(".slider__title");
// const sliderContent = slider.querySelector(".slider__content");
// const sliderContentLength = playerPlayList.length - 1;
// const sliderWidth = 100;
// let left = 0;
// let count = 0;
// let song = playerSongs[count];
// let isPlay = false;
// const pauseIcon = playButton.querySelector("img[alt = 'pause-icon']");
// const playIcon = playButton.querySelector("img[alt = 'play-icon']");
// const progres = player.querySelector(".progres");
// const progresFilled = progres.querySelector(".progres__filled");
// let isMove = false;
// function openPlayer() {
//     playerHeader.classList.add("open-header");
//     playerControls.classList.add("move");
//     slider.classList.add("open-slider");
// }
// function closePlayer() {
//     playerHeader.classList.remove("open-header");
//     playerControls.classList.remove("move");
//     slider.classList.remove("open-slider");
// }
// function next(index) {
//     count = index || count;
//     if (count == sliderContentLength) {
//         count = count;
//         return;
//     }
//     left = (count + 1) * sliderWidth;
//     left = Math.min(left, (sliderContentLength) * sliderWidth);
//     sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
//     count++;
//     run();
// }
// function back(index) {
//     count = index || count;
//     if (count == 0) {
//         count = count;
//         return;
//     }
//     left = (count - 1) * sliderWidth;
//     left = Math.max(0, left);
//     sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
//     count--;
//     run();
// }
// function changeSliderContext() {
//     sliderContext.style.animationName = "opacity";
//     sliderName.textContent = playerPlayList[count].querySelector(".player__title").textContent;
//     sliderTitle.textContent = playerPlayList[count].querySelector(".player__song-name").textContent;
//     if (sliderName.textContent.length > 16) {
//         const textWrap = document.createElement("span");
//         textWrap.className = "text-wrap";
//         textWrap.innerHTML = sliderName.textContent + " " + sliderName.textContent;
//         sliderName.innerHTML = "";
//         sliderName.append(textWrap);
//     }
//     if (sliderTitle.textContent.length >= 18) {
//         const textWrap = document.createElement("span");
//         textWrap.className = "text-wrap";
//         textWrap.innerHTML = sliderTitle.textContent + " " + sliderTitle.textContent;
//         sliderTitle.innerHTML = "";
//         sliderTitle.append(textWrap);
//     }
// }
// function changeBgBody() {
//     body.style.backgroundColor = bgBody[count];
// }
// function selectSong() {
//     song = playerSongs[count];
//     for (const item of playerSongs) {
//         if (item != song) {
//             item.pause();
//             item.currentTime = 0;
//         }
//     }
//     if (isPlay) song.play();
// }
// function run() {
//     changeSliderContext();
//     changeBgBody();
//     selectSong();
// }
// function playSong() {
//     if (song.paused) {
//         song.play();
//         playIcon.style.display = "none";
//         pauseIcon.style.display = "block";
//     } else {
//         song.pause();
//         isPlay = false;
//         playIcon.style.display = "";
//         pauseIcon.style.display = "";
//     }
// }
// function progresUpdate() {
//     const progresFilledWidth = (this.currentTime / this.duration) * 100 + "%";
//     progresFilled.style.width = progresFilledWidth;
//     if (isPlay && this.duration == this.currentTime) {
//         next();
//     }
//     if (count == sliderContentLength && song.currentTime == song.duration) {
//         playIcon.style.display = "block";
//         pauseIcon.style.display = "";
//         isPlay = false;
//     }
// }
// function scurb(e) {
//     const currentTime = ((e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth) * song.duration;
//     song.currentTime = currentTime;
// }
// function durationSongs() {
//     let min = parseInt(this.duration / 60);
//     if (min < 10) min = "0" + min;
//     let sec = parseInt(this.duration % 60);
//     if (sec < 10) sec = "0" + sec;
//     const playerSongTime = `${min}:${sec}`;
//     this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime);
// }
// changeSliderContext();
// sliderContext.addEventListener("click", openPlayer);
// sliderContext.addEventListener("animationend", () => sliderContext.style.animationName = '');
// playlistButton.addEventListener("click", closePlayer);
// nextButton.addEventListener("click", () => {
//     next(0)
// });
// backButton.addEventListener("click", () => {
//     back(0)
// });
// playButton.addEventListener("click", () => {
//     isPlay = true;
//     playSong();
// });
// playerSongs.forEach(song => {
//     song.addEventListener("loadeddata", durationSongs);
//     song.addEventListener("timeupdate", progresUpdate);
// });
// progres.addEventListener("pointerdown", (e) => {
//     scurb(e);
//     isMove = true;
// });
// document.addEventListener("pointermove", (e) => {
//     if (isMove) {
//         scurb(e);
//         song.muted = true;
//     }
// });
// document.addEventListener("pointerup", () => {
//     isMove = false;
//     song.muted = false;
// });
// playerPlayList.forEach((item, index) => {
//     item.addEventListener("click", function () {
//         if (index > count) {
//             next(index - 1);
//             return;
//         }
//         if (index < count) {
//             back(index + 1);
//             return;
//         }
//     });
// });






// "use strict";

// const bgBody = ["#2b2b2b", "#393939", "#8c5920", "#afa999", "#384d8c", "#2d241d", "#797e77", "#803a32", "#abb0b3", "#C1876B", "#5860a1", "#ad9372", "#a67c90", "#6a5b9e", "#78caa6", "#92837e", "#8c8c8c", "#6c2b23", "#826e92", "#272729", "#596573", "#5f6a60", "#7e4a9c", "#6a7a4a", "#21201c", "#444a40", "#616161", "#012d2e", "#545253", "#ffcfcf", "#4f665e", "#444b44"];

// const body = document.body;
// const player = document.querySelector(".player");
// const playerHeader = player.querySelector(".player__header");
// const playerControls = player.querySelector(".player__controls");
// const playerPlayList = player.querySelectorAll(".player__song");
// const playerSongs = player.querySelectorAll(".audio");
// const playButton = player.querySelector(".play");
// const nextButton = player.querySelector(".next");
// const backButton = player.querySelector(".back");
// const playlistButton = player.querySelector(".playlist");
// const slider = player.querySelector(".slider");
// const sliderContext = player.querySelector(".slider__context");
// const sliderName = sliderContext.querySelector(".slider__name");
// const sliderTitle = sliderContext.querySelector(".slider__title");
// const sliderContent = slider.querySelector(".slider__content");
// const sliderContentLength = playerPlayList.length - 1;
// const sliderWidth = 100;
// let left = 0;
// let count = 0;
// let song = playerSongs[count];
// let isPlay = false;
// const pauseIcon = playButton.querySelector("i.fa-solid.fa-pause");
// const playIcon = playButton.querySelector("i.fa-solid.fa-play");
// const progres = player.querySelector(".progres");
// const progresFilled = progres.querySelector(".progres__filled");
// let isMove = false;

// function openPlayer() {
//     playerHeader.classList.add("open-header");
//     playerControls.classList.add("move");
//     slider.classList.add("open-slider");
// }

// function closePlayer() {
//     playerHeader.classList.remove("open-header");
//     playerControls.classList.remove("move");
//     slider.classList.remove("open-slider");
// }

// function next(index) {
//     count = index || count;
//     if (count === sliderContentLength) {
//         count = count;
//         return;
//     }
//     left = (count + 1) * sliderWidth;
//     left = Math.min(left, (sliderContentLength) * sliderWidth);
//     sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
//     count++;
//     run();
// }

// function back(index) {
//     count = index || count;
//     if (count === 0) {
//         count = count;
//         return;
//     }
//     left = (count - 1) * sliderWidth;
//     left = Math.max(0, left);
//     sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
//     count--;
//     run();
// }

// function changeSliderContext() {
//     sliderContext.style.animationName = "opacity";
//     sliderName.textContent = playerPlayList[count].querySelector(".player__title").textContent;
//     sliderTitle.textContent = playerPlayList[count].querySelector(".player__song-name").textContent;
    
//     const newColor = bgBody[count];
//     sliderName.style.color = "";
//     sliderTitle.style.color = newColor;
    
//     if (sliderName.textContent.length > 16) {
//         const textWrap = document.createElement("span");
//         textWrap.className = "text-wrap";
//         textWrap.innerHTML = sliderName.textContent + " " + sliderName.textContent;
//         sliderName.innerHTML = "";
//         sliderName.append(textWrap);
//     }
    
//     if (sliderTitle.textContent.length >= 18) {
//         const textWrap = document.createElement("span");
//         textWrap.className = "text-wrap";
//         textWrap.innerHTML = sliderTitle.textContent + " " + sliderTitle.textContent;
//         sliderTitle.innerHTML = "";
//         sliderTitle.append(textWrap);
//     }
// }

// function changeBgBody() {
//     const newColor = bgBody[count];
//     body.style.backgroundColor = newColor;

//     const icons = document.querySelectorAll('.player__button i:not(.play i)');
//     icons.forEach(icon => {
//         icon.style.color = newColor;
//     });

//     progresFilled.style.backgroundColor = newColor;

//     const styleSheet = document.createElement("style");
//     styleSheet.type = "text/css";
//     styleSheet.innerText = `.progres__filled::before { background-color: ${newColor}; }`;
//     document.head.appendChild(styleSheet);

//     const sliderNameElements = document.querySelectorAll('.slider__name');
//     sliderNameElements.forEach(element => {
//         element.style.color = "";
//     });

//     const sliderTitleElements = document.querySelectorAll('.slider__title');
//     sliderTitleElements.forEach(element => {
//         element.style.color = newColor;
//     });
// }

// function selectSong() {
//     song = playerSongs[count];
//     for (const item of playerSongs) {
//         if (item !== song) {
//             item.pause();
//             item.currentTime = 0;
//         }
//     }
//     if (isPlay) song.play();
// }

// function run() {
//     changeSliderContext();
//     changeBgBody();
//     selectSong();
// }

// function playSong() {
//     if (song.paused) {
//         song.play();
//         playIcon.style.display = "none";
//         pauseIcon.style.display = "block";
//     } else {
//         song.pause();
//         isPlay = false;
//         playIcon.style.display = "";
//         pauseIcon.style.display = "";
//     }
// }

// function progresUpdate() {
//     const progresFilledWidth = (this.currentTime / this.duration) * 100 + "%";
//     progresFilled.style.width = progresFilledWidth;
//     if (isPlay && this.duration === this.currentTime) {
//         next();
//     }
//     if (count === sliderContentLength && song.currentTime === song.duration) {
//         playIcon.style.display = "block";
//         pauseIcon.style.display = "";
//         isPlay = false;
//     }
// }

// function scurb(e) {
//     const currentTime = ((e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth) * song.duration;
//     song.currentTime = currentTime;
// }

// function durationSongs() {
//     let min = parseInt(this.duration / 60);
//     if (min < 10) min = "0" + min;
//     let sec = parseInt(this.duration % 60);
//     if (sec < 10) sec = "0" + sec;
//     const playerSongTime = `${min}:${sec}`;
//     this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime);
// }

// changeSliderContext();
// sliderContext.addEventListener("click", openPlayer);
// sliderContext.addEventListener("animationend", () => sliderContext.style.animationName = '');
// playlistButton.addEventListener("click", closePlayer);
// nextButton.addEventListener("click", () => {
//     next(0)
// });
// backButton.addEventListener("click", () => {
//     back(0)
// });
// playButton.addEventListener("click", () => {
//     isPlay = true;
//     playSong();
// });
// playerSongs.forEach(song => {
//     song.addEventListener("loadeddata", durationSongs);
//     song.addEventListener("timeupdate", progresUpdate);
// });
// progres.addEventListener("pointerdown", (e) => {
//     scurb(e);
//     isMove = true;
// });
// document.addEventListener("pointermove", (e) => {
//     if (isMove) {
//         scurb(e);
//         song.muted = true;
//     }
// });
// document.addEventListener("pointerup", () => {
//     isMove = false;
//     song.muted = false;
// });
// playerPlayList.forEach((item, index) => {
//     item.addEventListener("click", function () {
//         if (index > count) {
//             next(index - 1);
//             return;
//         }
//         if (index < count) {
//             back(index + 1);
//             return;
//         }
//     });
// });






"use strict";

const bgBody = ["#2b2b2b", "#393939", "#8c5920", "#afa999", "#384d8c", "#2d241d", "#797e77", "#803a32", "#abb0b3", "#C1876B", "#5860a1", "#ad9372", "#a67c90", "#6a5b9e", "#78caa6", "#92837e", "#8c8c8c", "#6c2b23", "#826e92", "#272729", "#596573", "#5f6a60", "#7e4a9c", "#6a7a4a", "#21201c", "#444a40", "#616161", "#012d2e", "#545253", "#ffcfcf", "#4f665e", "#444b44"];

const body = document.body;
const player = document.querySelector(".player");
const playerHeader = player.querySelector(".player__header");
const playerControls = player.querySelector(".player__controls");
const playerPlayList = player.querySelectorAll(".player__song");
const playerSongs = player.querySelectorAll(".audio");
const playButton = player.querySelector(".play");
const playIcon = playButton.querySelector(".play-icon");
const pauseIcon = playButton.querySelector(".pause-icon");
const nextButton = player.querySelector(".next");
const backButton = player.querySelector(".back");
const playlistButton = player.querySelector(".playlist");
const slider = player.querySelector(".slider");
const sliderContext = player.querySelector(".slider__context");
const sliderName = sliderContext.querySelector(".slider__name");
const sliderTitle = sliderContext.querySelector(".slider__title");
const sliderContent = slider.querySelector(".slider__content");
const sliderContentLength = playerPlayList.length - 1;
const sliderWidth = 100;
let left = 0;
let count = 0;
let song = playerSongs[count];
let isPlay = false;
const progres = player.querySelector(".progres");
const progresFilled = progres.querySelector(".progres__filled");
let isMove = false;

function openPlayer() {
    playerHeader.classList.add("open-header");
    playerControls.classList.add("move");
    slider.classList.add("open-slider");
}

function closePlayer() {
    playerHeader.classList.remove("open-header");
    playerControls.classList.remove("move");
    slider.classList.remove("open-slider");
}

function next(index) {
    count = index || count;
    if (count === sliderContentLength) {
        count = count;
        return;
    }
    left = (count + 1) * sliderWidth;
    left = Math.min(left, (sliderContentLength) * sliderWidth);
    sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
    count++;
    run();
}

function back(index) {
    count = index || count;
    if (count === 0) {
        count = count;
        return;
    }
    left = (count - 1) * sliderWidth;
    left = Math.max(0, left);
    sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
    count--;
    run();
}

function changeSliderContext() {
    sliderContext.style.animationName = "opacity";
    sliderName.textContent = playerPlayList[count].querySelector(".player__title").textContent;
    sliderTitle.textContent = playerPlayList[count].querySelector(".player__song-name").textContent;
    
    const newColor = bgBody[count];
    sliderName.style.color = "";
    sliderTitle.style.color = newColor;
    
    if (sliderName.textContent.length > 16) {
        const textWrap = document.createElement("span");
        textWrap.className = "text-wrap";
        textWrap.innerHTML = sliderName.textContent + " " + sliderName.textContent;
        sliderName.innerHTML = "";
        sliderName.append(textWrap);
    }
    
    if (sliderTitle.textContent.length >= 18) {
        const textWrap = document.createElement("span");
        textWrap.className = "text-wrap";
        textWrap.innerHTML = sliderTitle.textContent + " " + sliderTitle.textContent;
        sliderTitle.innerHTML = "";
        sliderTitle.append(textWrap);
    }
}

function changeBgBody() {
    const newColor = bgBody[count];
    body.style.backgroundColor = newColor;

    const icons = document.querySelectorAll('.player__button i:not(.play i)');
    icons.forEach(icon => {
        icon.style.color = newColor;
    });

    progresFilled.style.backgroundColor = newColor;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `.progres__filled::before { background-color: ${newColor}; }`;
    document.head.appendChild(styleSheet);

    const sliderNameElements = document.querySelectorAll('.slider__name');
    sliderNameElements.forEach(element => {
        element.style.color = "";
    });

    const sliderTitleElements = document.querySelectorAll('.slider__title');
    sliderTitleElements.forEach(element => {
        element.style.color = newColor;
    });
}

function selectSong() {
    song = playerSongs[count];
    for (const item of playerSongs) {
        if (item !== song) {
            item.pause();
            item.currentTime = 0;
        }
    }
    if (isPlay) song.play();
}

function run() {
    changeSliderContext();
    changeBgBody();
    selectSong();
}

function playSong() {
    if (song.paused) {
        song.play();
        isPlay = true;
        playButton.classList.add('is-playing');
    } else {
        song.pause();
        isPlay = false;
        playButton.classList.remove('is-playing');
    }
}

function progresUpdate() {
    const progresFilledWidth = (this.currentTime / this.duration) * 100 + "%";
    progresFilled.style.width = progresFilledWidth;
    if (isPlay && this.duration === this.currentTime) {
        next();
    }
    if (count === sliderContentLength && song.currentTime === song.duration) {
        playButton.classList.remove('is-playing');
        isPlay = false;
    }
}

function scurb(e) {
    const currentTime = ((e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth) * song.duration;
    song.currentTime = currentTime;
}

function durationSongs() {
    let min = parseInt(this.duration / 60);
    if (min < 10) min = "0" + min;
    let sec = parseInt(this.duration % 60);
    if (sec < 10) sec = "0" + sec;
    const playerSongTime = `${min}:${sec}`;
    this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime);
}

changeSliderContext();
sliderContext.addEventListener("click", openPlayer);
sliderContext.addEventListener("animationend", () => sliderContext.style.animationName = '');
playlistButton.addEventListener("click", closePlayer);
nextButton.addEventListener("click", () => {
    next(0)
});
backButton.addEventListener("click", () => {
    back(0)
});
playButton.addEventListener("click", playSong);
playerSongs.forEach(song => {
    song.addEventListener("loadeddata", durationSongs);
    song.addEventListener("timeupdate", progresUpdate);
});
progres.addEventListener("pointerdown", (e) => {
    scurb(e);
    isMove = true;
});
document.addEventListener("pointermove", (e) => {
    if (isMove) {
        scurb(e);
        song.muted = true;
    }
});
document.addEventListener("pointerup", () => {
    isMove = false;
    song.muted = false;
});
playerPlayList.forEach((item, index) => {
    item.addEventListener("click", function () {
        if (index > count) {
            next(index - 1);
            return;
        }
        if (index < count) {
            back(index + 1);
            return;
        }
    });
});
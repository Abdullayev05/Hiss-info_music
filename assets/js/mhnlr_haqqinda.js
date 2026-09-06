// mahnilar
const songsSwiper = new Swiper(".songs-swiper", {
    slidesPerView: "auto",
    spaceBetween: 15,
    grabCursor: true,

    breakpoints: {
        320: {
            slidesPerView: 1.3,
        },
        768: {
            slidesPerView: 2.5,
        },
        1024: {
            slidesPerView: 4,
        }
    }
});

// sekiller
const wrapper = document.querySelector(".gallery-swiper .swiper-wrapper");

wrapper.innerHTML = wrapper.innerHTML.repeat(4);

const swiper = new Swiper(".gallery-swiper", {
    slidesPerView: "auto",
    spaceBetween: 1,
    loop: false,
    allowTouchMove: false,
    speed: 0
});

let translateX = 0;
const SPEED = 1.2;

const totalWidth = swiper.wrapperEl.scrollWidth;
const singleSetWidth = totalWidth / 4;

function infiniteScroll() {
    translateX -= SPEED;

    if (Math.abs(translateX) >= singleSetWidth * 2) {
        translateX += singleSetWidth;
    }

    swiper.setTranslate(translateX);
    requestAnimationFrame(infiniteScroll);
}

requestAnimationFrame(infiniteScroll);




document.addEventListener("DOMContentLoaded", () => {

  const videoSwiper = new Swiper(".video-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    grabCursor: true,
    simulateTouch: true,
    freeMode: false,           // slide snap
    loop: false,
    nested: true,
    touchStartPreventDefault: false,
    touchMoveStopPropagation: false,

    // swipe target yalnız video
    touchStartTarget: '.draggable-video'
  });

  const videos = document.querySelectorAll(".video-swiper video");

  videos.forEach(video => {
    video.addEventListener("play", () => {
      videos.forEach(v => {
        if (v !== video) v.pause();
      });
    });

    // swipe edəndə video pause
    video.addEventListener('pointerdown', () => {
      videos.forEach(v => {
        if (v !== video) v.pause();
      });
    });
  });

});

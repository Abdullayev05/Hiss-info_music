document.addEventListener("DOMContentLoaded", function () {
    const bgImageElement = document.getElementById("activeClipBg");

    const videoSwiper = new Swiper('.video-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '.video-next',
            prevEl: '.video-prev',
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 24 }
        },
        on: {
            init: function () {
                updateBackground(this);
            },
            slideChange: function () {
                updateBackground(this);
            }
        }
    });

    function updateBackground(swiperInstance) {
        // Aktiv slide-ı tapırıq
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        if (activeSlide) {
            const bgUrl = activeSlide.getAttribute("data-bg");
            if (bgUrl && bgImageElement) {
                // Şəkil dəyişərkən hamar keçid effekti
                bgImageElement.style.opacity = "0";
                setTimeout(() => {
                    bgImageElement.src = bgUrl;
                    bgImageElement.style.opacity = "0.35";
                }, 200);
            }
        }
    }
});
const heroSwiper = new Swiper('.heroSwiper', {
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    // effect: 'fade',  <-- Bu hissəni tamamilə şərhə at (sil)
    // fadeEffect: {    <-- Bunu da sil
    //     crossFade: true
    // },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
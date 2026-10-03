const videos = [
    { title: "Sən olanda", src: "../hiss-klips-videos/Ayaz Babayev x Hiss – Sən Olanda (XT).mp4" },
    { title: "Yuxu Yozmaları", src: "../hiss-klips-videos/Hiss  Yuxu Yozmaları.mp4" },
    { title: "XT", src: "../hiss-klips-videos/Hiss  XT.mp4" },
    { title: "Başqa adamlar", src: "../hiss-klips-videos/Hiss  Başqa Adamlar (Visualizer).mp4" },
    { title: "Heç Nə", src: "../hiss-klips-videos/Hiss - Heç Nə.mp4" },
    { title: "Deyilənlər", src: "../hiss-klips-videos/Ayaz Babayev x Hiss  Deyilənlər (Rəsmi Musiqi Videosu).mp4" },
    { title: "Gün Gələr", src: "../hiss-klips-videos/Hiss x RZZA  Gün Gələr.mp4" },
    { title: "Sınıq Pəncərə", src: "../hiss-klips-videos/Hiss, Rafo, Elçin Cəfərov Sınıq Pəncərə.mp4" },
    { title: "Sevə-sevə", src: "../hiss-klips-videos/Hiss  Sevə-Sevə.mp4" },
    { title: "Canın Sağ Olsun", src: "../hiss-klips-videos/Hiss  Canın Sağ Olsun.mp4" },
    { title: "Kim qalacaq?", src: "../hiss-klips-videos/Hiss x Jeyhun Samedov - Kim qalacaq.mp4" },
    { title: "Bakı tanısın", src: "../hiss-klips-videos/Hiss — Bakı Tanısın .mp4" },
    { title: "Esq limanı", src: "../hiss-klips-videos/Hiss — Eşq Limanı (Lyrics Video).mp4" },
    { title: "Best", src: "../hiss-klips-videos/Best-klip.mp4" },
    { title: "Kədərli bölüm", src: "../hiss-klips-videos/kederli-bolum.mp4" },
    { title: "Dilək", src: "../hiss-klips-videos/dilek.mp4" },
    { title: "Biology", src: "../hiss-klips-videos/biology.mp4" },
    { title: "Etiraf", src: "../hiss-klips-videos/etiraf-klip.mp4" },
    { title: "Laylay", src: "../hiss-klips-videos/laylay.mp4" },
    { title: "Nostalgiya", src: "../hiss-klips-videos/nostalgiya.mp4" },
    { title: "Mənə pis olma", src: "../hiss-klips-videos/mene-pis-olma.mp4" },
    { title: "Unuduram", src: "../hiss-klips-videos/unuduram.mp4" },
    { title: "Busan", src: "../hiss-klips-videos/busan.mp4" },
    { title: "Çək", src: "../hiss-klips-videos/cek.mp4" },
    { title: "Şans", src: "../hiss-klips-videos/sans.mp4" },
    { title: "Sayıram", src: "../hiss-klips-videos/sayiram.mp4" },
    { title: "Sevdim", src: "../hiss-klips-videos/sevdim.mp4" },
    { title: "Bela", src: "../hiss-klips-videos/bela.mp4" },
    { title: "İstəmirəm", src: "../hiss-klips-videos/istemirem.mp4" },
    { title: "Cəsarət", src: "../hiss-klips-videos/cesaret.mp4" },
    { title: "Karma", src: "../hiss-klips-videos/karma.mp4" },
    { title: "Kəpənəklər", src: "../hiss-klips-videos/kepenekler.mp4" }
];

const videoContainer = document.querySelector(".video-swiper .swiper-wrapper");
let currentPlayingVideo = null;

// 2. Videoların dinamik olaraq HTML-ə yerləşdirilməsi
if (videoContainer) {
    videos.forEach(video => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide clip-card";

        const thumb = document.createElement("div");
        thumb.className = "clip-thumb";

        const videoTag = document.createElement("video");
        videoTag.src = video.src;
        videoTag.controls = true;
        videoTag.preload = "metadata";
        // Swiper-in bu element üzərində toxunmanı tutub saxlamaması üçün:
        videoTag.classList.add("swiper-no-swiping");

        const info = document.createElement("div");
        info.className = "clip-info";

        const title = document.createElement("h4");
        title.textContent = video.title;

        info.appendChild(title);
        thumb.appendChild(videoTag);
        slide.appendChild(thumb);
        slide.appendChild(info);
        videoContainer.appendChild(slide);
    });
}

// 3. Eyni anda yalnız bir videonun oxunması üçün qlobal dinləyici
document.addEventListener("play", (event) => {
    const target = event.target;
    if (target.tagName === "VIDEO") {
        if (currentPlayingVideo && currentPlayingVideo !== target) {
            currentPlayingVideo.pause();
        }
        currentPlayingVideo = target;
    }
}, true);

// 4. Swiper ayarları
const swiper = new Swiper(".video-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    noSwiping: true,
    noSwipingSelector: 'video, video controls, .clip-card video',
});
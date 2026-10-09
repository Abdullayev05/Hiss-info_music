const videos = [
    { title: "Alright", src: "../hiss-klips-videos/Hiss – Alright.mp4" },
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

const videoContainer = document.getElementById("videoContainer");
let currentPlayingVideo = null;

if (videoContainer) {
    videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.className = "video-name";

        const title = document.createElement("h3");
        title.textContent = video.title;

        const videoTag = document.createElement("video");
        videoTag.src = video.src;
        videoTag.controls = true;

        videoTag.addEventListener("play", () => {
            if (currentPlayingVideo && currentPlayingVideo !== videoTag) {
                currentPlayingVideo.pause();
            }
            currentPlayingVideo = videoTag;
        });

        videoElement.appendChild(title);
        videoElement.appendChild(videoTag);
        videoContainer.appendChild(videoElement);
    });
}

document.addEventListener("play", (event) => {
    const target = event.target;
    if (target.tagName === "VIDEO") {
        if (currentPlayingVideo && currentPlayingVideo !== target) {
            currentPlayingVideo.pause();
        }
        currentPlayingVideo = target;
    }
}, true);
document.addEventListener("DOMContentLoaded", () => {
    // 1. Swiper-in başladılması
    const videoSwiper = new Swiper('.video-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        preventClicks: false,
        preventClicksPropagation: false,
        touchStartPreventDefault: false,
        navigation: {
            nextEl: '.video-next',
            prevEl: '.video-prev',
        },
    });

    let currentPlayingVideo = null;

    // 2. Play düyməsinə klikləmə mexanizmi
    document.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.custom-play-btn');
        if (!playBtn) return;

        e.preventDefault();
        e.stopPropagation();

        const card = playBtn.closest('.clip-card');
        if (!card) return;

        const video = card.querySelector('video');
        if (!video) return;

        // Digər bütün oynatılan videoları dayandır
        document.querySelectorAll('video').forEach(v => {
            if (v !== video) {
                v.pause();
                v.removeAttribute('controls');
                const otherCard = v.closest('.clip-card');
                const otherBtn = otherCard?.querySelector('.custom-play-btn');
                if (otherBtn) otherBtn.style.display = 'flex';
            }
        });

        // Seçilən videonu işə sal
        video.controls = true;
        video.play().then(() => {
            playBtn.style.display = 'none';
            currentPlayingVideo = video;
        }).catch(err => {
            console.error("Video oynatma xətası:", err);
        });
    });

    // 3. Video dayandırıldıqda və ya başqa yerdən pauza veriləndə play düyməsini qaytar
    document.addEventListener('pause', (e) => {
        if (e.target.tagName !== 'VIDEO') return;
        const video = e.target;
        const card = video.closest('.clip-card');
        const playBtn = card?.querySelector('.custom-play-btn');
        if (playBtn) {
            playBtn.style.display = 'flex';
        }
        video.removeAttribute('controls');
    }, true);
});
const videos = [
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

const videoContainer = document.getElementById('videoContainer');
videos.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.className = 'video-name';

    const title = document.createElement('h3');
    title.textContent = video.title;

    const videoTag = document.createElement('video');
    videoTag.src = video.src;
    videoTag.controls = true;

    videoElement.appendChild(title);
    videoElement.appendChild(videoTag);
    videoContainer.appendChild(videoElement);
});
const overlay = document.getElementById("img-overlay");
const overlayImg = document.getElementById("overlay-img");
const imgs = document.querySelectorAll(".imgs-hiss img");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentIndex = 0;

// Overlay açmaq
imgs.forEach((img, index) => {
    img.addEventListener("click", () => {
        overlay.style.display = "flex";
        overlayImg.src = img.src;
        currentIndex = index;
    });
});

// Overlay fonuna klikləyib bağlamaq
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none";
        overlayImg.src = "";
    }
});

// Növbəti şəkil
next.addEventListener("click", (e) => {
    e.stopPropagation(); // klik overlay-ə getməsin
    currentIndex = (currentIndex + 1) % imgs.length;
    overlayImg.src = imgs[currentIndex].src;
});

// Əvvəlki şəkil
prev.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    overlayImg.src = imgs[currentIndex].src;
});

// Touch / Swipe funksionallığı (mobil üçün)
let startX = 0;
overlay.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

overlay.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
        // sağdan sola swipe -> əvvəlki
        currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
        overlayImg.src = imgs[currentIndex].src;
    } else if (startX - endX > 50) {
        // soldan sağa swipe -> növbəti
        currentIndex = (currentIndex + 1) % imgs.length;
        overlayImg.src = imgs[currentIndex].src;
    }
});

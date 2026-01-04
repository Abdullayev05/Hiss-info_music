const overlay = document.getElementById("img-overlay");
const overlayImg = document.getElementById("overlay-img");
const imgs = document.querySelectorAll(".imgs-hiss img");

// Şəkil klikləndikdə
imgs.forEach(img => {
    img.addEventListener("click", () => {
        overlay.style.display = "flex";
        overlayImg.src = img.src;
    });
});

// Overlay fonuna kliklədikdə bağlamaq
overlay.addEventListener("click", (e) => {
    // Əgər klik məhz overlay fonuna olubsa (şəklin üzərinə yox)
    if (e.target === overlay) {
        overlay.style.display = "none";
        overlayImg.src = "";
    }
});

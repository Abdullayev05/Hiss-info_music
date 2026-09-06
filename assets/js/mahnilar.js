// Vaxt span-larını seç
const currentTimeEl = document.querySelector(".current-time");
const totalTimeEl = document.querySelector(".total-time");

// Progres bar ilə birləşdir
function updateProgressAndTime(song, index) {
    // Mahnı yüklənəndə total-time və color
    song.addEventListener("loadeddata", function () {
        totalTimeEl.textContent = formatTime(this.duration);
        currentTimeEl.textContent = "0:00";
        progresFilled.style.width = "0%";

        // Rəngləri tətbiq et
        const newColor = bgBody[index];
        progresFilled.style.backgroundColor = newColor;
        currentTimeEl.style.color = newColor;
        totalTimeEl.style.color = newColor;
    });

    // Mahnı oynadıqca currentTime və progress bar
    song.addEventListener("timeupdate", function () {
        currentTimeEl.textContent = formatTime(this.currentTime);
        const percent = (this.currentTime / this.duration) * 100;
        progresFilled.style.width = percent + "%";
    });
}

// Bütün mahnılara tətbiq et
playerSongs.forEach((song, index) => {
    updateProgressAndTime(song, index);
});

// Formatlama funksiyası
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Mahnı dəyişəndə avtomatik total-time və rəngləri yenilə
function selectSong() {
    song = playerSongs[count];
    for (const item of playerSongs) {
        if (item !== song) {
            item.pause();
            item.currentTime = 0;
        }
    }
    if (isPlay) song.play();

    // Total-time və progress bar yeniləyək
    totalTimeEl.textContent = formatTime(song.duration);
    currentTimeEl.textContent = formatTime(song.currentTime);
    progresFilled.style.width = (song.currentTime / song.duration) * 100 + "%";

    // Rəngləri yenilə
    const newColor = bgBody[count];
    progresFilled.style.backgroundColor = newColor;
    currentTimeEl.style.color = newColor;
    totalTimeEl.style.color = newColor;
}

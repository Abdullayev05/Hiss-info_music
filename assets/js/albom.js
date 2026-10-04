let activeGatefoldAudio = null;
const progressBar = document.getElementById('SongProgressBar');
const currentTimeEl = document.getElementById('CurrentTime');
const totalDurationEl = document.getElementById('ActiveDuration');

// Səhifəyə yüklənən kimi audio faylların real müddətlərini yazdıran köməkçi funksiya
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// DOM yüklənəndə track müddətlərini təyin et
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.track-duration').forEach(durationElement => {
        const audioId = durationElement.getAttribute('data-audio');
        const audio = document.getElementById(audioId);

        if (audio) {
            audio.addEventListener('loadedmetadata', () => {
                durationElement.textContent = formatTime(audio.duration);
                
                // Əgər 1-ci mahnıdırsa, sol paneldəki vaxtı da yenilə
                if (audioId === 'g-1' && totalDurationEl) {
                    totalDurationEl.textContent = formatTime(audio.duration);
                }
            });
        }
    });
});

// Mahnını oynadan/dayandıran əsas funksiya
function playGatefoldSong(cardElement, audioId, title, coverImg) {
    const audio = document.getElementById(audioId);
    const activeTitle = document.getElementById('GatefoldActiveTitle');
    const activeCover = document.getElementById('GatefoldActiveCover');
    const icon = cardElement.querySelector('.g-icon i');

    if (!audio) return;

    // Əgər kliklənən mahnı hazırda aktiv olan mahnıdırsa (eyni mahnı)
    if (activeGatefoldAudio === audio) {
        if (!audio.paused) {
            // Oxunursa -> dayandır (pauza et), AMMA currentTime-ı sıfırlama!
            audio.pause();
            cardElement.classList.remove('active');
            if (icon) icon.className = "fas fa-play";
        } else {
            // Dayanıbsa (pauzadadırsa) -> xəttin qaldığı yerdən davam et
            audio.play();
            cardElement.classList.add('active');
            if (icon) icon.className = "fas fa-pause";
        }
        return;
    }

    // Əgər fərqli bir mahnı oxunursa, əvvəlkini tamamilə dayandır və sıfırla
    if (activeGatefoldAudio) {
        activeGatefoldAudio.pause();
        activeGatefoldAudio.currentTime = 0;
    }

    // Bütün kartların aktiv statusunu sıfırla
    document.querySelectorAll('.g-track-card').forEach(c => {
        c.classList.remove('active');
        const cIcon = c.querySelector('.g-icon i');
        if (cIcon) cIcon.className = "fas fa-play";
    });

    // Yeni mahnını aktivləşdir və başlat
    activeGatefoldAudio = audio;
    activeGatefoldAudio.play();
    cardElement.classList.add('active');
    if (icon) icon.className = "fas fa-pause";

    // Sol paneldəki məlumatları yenilə
    if (activeTitle) activeTitle.textContent = title;
    if (totalDurationEl && audio.duration) {
        totalDurationEl.textContent = formatTime(audio.duration);
    }
    
    // Mahnı oxunduqca tərəqqi çubuğunu və cari vaxtı yenilə
    activeGatefoldAudio.ontimeupdate = () => {
        if (activeGatefoldAudio.duration && progressBar) {
            const progressPercent = (activeGatefoldAudio.currentTime / activeGatefoldAudio.duration) * 100;
            progressBar.value = progressPercent;
        }
        if (currentTimeEl) {
            currentTimeEl.textContent = formatTime(activeGatefoldAudio.currentTime);
        }
    };

    // Şəkli animasiya ilə dəyiş
    if (activeCover) {
        activeCover.style.opacity = '0';
        setTimeout(() => {
            activeCover.src = coverImg;
            activeCover.style.opacity = '1';
        }, 150);
    }

    // Mahnı bitəndə işləyəcək funksiya
    activeGatefoldAudio.onended = function() {
        cardElement.classList.remove('active');
        if (icon) icon.className = "fas fa-play";
        if (progressBar) progressBar.value = 0;
        if (currentTimeEl) currentTimeEl.textContent = "0:00";
    };
}

// Tərəqqi çubuğu (progress bar) vasitəsilə irəli-geri çəkmək üçün
if (progressBar) {
    progressBar.addEventListener('input', () => {
        if (activeGatefoldAudio && activeGatefoldAudio.duration) {
            const seekTime = (progressBar.value / 100) * activeGatefoldAudio.duration;
            activeGatefoldAudio.currentTime = seekTime;
        }
    });
}
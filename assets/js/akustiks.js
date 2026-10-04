let currentAudio = null;
    let progressInterval = null;
    let isDragging = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function playSong(element, audioId, songName) {
        const audio = document.getElementById(audioId);
        const currentIcon = element.querySelector('.play-btn-mini i');
        const titleElement = document.getElementById('current-song-title');
        const currentTimeEl = document.getElementById('current-time');
        const totalDurationEl = document.getElementById('total-duration');
        const progressBar = document.getElementById('progress-bar');
        const playerControls = document.getElementById('player-controls');

        // Əgər eyni mahnı onsuz da oxunursa, dayandır
        if (currentAudio === audio && !audio.paused) {
            audio.pause();
            clearInterval(progressInterval);
            element.classList.remove('active');
            currentIcon.className = "fas fa-play";
            return;
        }

        // Əvvəlki mahnını dayandır
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            clearInterval(progressInterval);
        }

        const allItems = document.querySelectorAll('.song-item');
        allItems.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.play-btn-mini i').className = "fas fa-play";
        });

        // Yeni mahnını işə sal
        currentAudio = audio;
        currentAudio.play();
        element.classList.add('active');
        currentIcon.className = "fas fa-pause";
        titleElement.textContent = songName;

        // Pleyer panelini üzə çıxar
        playerControls.classList.add('show');

        currentAudio.onloadedmetadata = function() {
            totalDurationEl.textContent = formatTime(currentAudio.duration);
        };

        if (!isNaN(currentAudio.duration)) {
            totalDurationEl.textContent = formatTime(currentAudio.duration);
        }

        progressInterval = setInterval(() => {
            if (currentAudio.paused || isDragging) return;
            
            currentTimeEl.textContent = formatTime(currentAudio.currentTime);
            const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.style.width = progressPercent + '%';

            if (currentAudio.ended) {
                clearInterval(progressInterval);
                element.classList.remove('active');
                currentIcon.className = "fas fa-play";
                progressBar.style.width = '0%';
                currentTimeEl.textContent = '0:00';
            }
        }, 200);
    }

    // --- Sürüşdürmə (Drag & Drop / Touch) funksionallığı ---
    const progressContainer = document.getElementById('progress-container');

    function updateAudioTime(clientX) {
        if (!currentAudio || isNaN(currentAudio.duration)) return;

        const rect = progressContainer.getBoundingClientRect();
        let clickX = clientX - rect.left;
        let width = rect.width;

        if (clickX < 0) clickX = 0;
        if (clickX > width) clickX = width;

        const clickPercent = clickX / width;
        
        // Sürükləyərkən vizual olaraq dərhal xətti hərəkət etdir
        const progressBar = document.getElementById('progress-bar');
        const currentTimeEl = document.getElementById('current-time');
        
        progressBar.style.width = (clickPercent * 100) + '%';
        currentTimeEl.textContent = formatTime(clickPercent * currentAudio.duration);
    }

    // Maus hadisələri
    if (progressContainer) {
        progressContainer.addEventListener('mousedown', (e) => {
            if (!currentAudio || isNaN(currentAudio.duration)) return;
            isDragging = true;
            updateAudioTime(e.clientX);
        });
    }

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateAudioTime(e.clientX);
        }
    });

    window.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            const rect = progressContainer.getBoundingClientRect();
            let clickX = e.clientX - rect.left;
            let width = rect.width;
            if (clickX < 0) clickX = 0;
            if (clickX > width) clickX = width;
            
            const clickPercent = clickX / width;
            currentAudio.currentTime = clickPercent * currentAudio.duration;
        }
    });

    // Mobil telefonlar üçün toxunma (Touch) hadisələri
    if (progressContainer) {
        progressContainer.addEventListener('touchstart', (e) => {
            if (!currentAudio || isNaN(currentAudio.duration)) return;
            isDragging = true;
            updateAudioTime(e.touches[0].clientX);
        });
    }

    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateAudioTime(e.touches[0].clientX);
        }
    });

    window.addEventListener('touchend', (e) => {
        if (isDragging) {
            isDragging = false;
            // Touchend zamanı e.changedTouches istifadə olunur
            const touch = e.changedTouches[0];
            const rect = progressContainer.getBoundingClientRect();
            let clickX = touch.clientX - rect.left;
            let width = rect.width;
            if (clickX < 0) clickX = 0;
            if (clickX > width) clickX = width;
            
            const clickPercent = clickX / width;
            currentAudio.currentTime = clickPercent * currentAudio.duration;
        }
    });
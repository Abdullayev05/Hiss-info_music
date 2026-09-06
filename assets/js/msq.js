document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".song-card");

    const RADIUS = 21;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    let currentAudio = null;
    let currentCard = null;
    let rafId = null;

    cards.forEach(card => {

        const audio = card.querySelector(".audio-element");
        const button = card.querySelector(".play-button");
        const icon = card.querySelector(".main-icon");
        const circle = card.querySelector(".progress-ring__circle");

        if (!audio || !button || !icon || !circle) return;

        circle.style.strokeDasharray = CIRCUMFERENCE;
        circle.style.strokeDashoffset = CIRCUMFERENCE;

        button.addEventListener("click", () => {

            // Əvvəlki mahnı varsa və fərqlidirsə, onu sıfırla
            cards.forEach(c => {
                if (c !== card) resetCard(c);
            });

            if (audio.paused) {
                audio.play();
                icon.classList.replace("fa-play", "fa-pause");
                card.classList.add("playing");

                currentAudio = audio;
                currentCard = card;

                startProgress();
            } else {
                audio.pause(); // dayandır, amma progress sıfırlanmasın
                icon.classList.replace("fa-pause", "fa-play");
                card.classList.remove("playing");

                cancelAnimationFrame(rafId);
                currentAudio = null;
                currentCard = null;
            }
        });

        audio.addEventListener("ended", () => {
            resetCard(card);
        });
    });

    function startProgress() {
        cancelAnimationFrame(rafId);

        function update() {
            if (!currentAudio || currentAudio.paused) return;

            const progress = currentAudio.currentTime / currentAudio.duration;
            const circle = currentCard.querySelector(".progress-ring__circle");

            circle.style.strokeDashoffset =
                CIRCUMFERENCE - progress * CIRCUMFERENCE;

            rafId = requestAnimationFrame(update);
        }

        rafId = requestAnimationFrame(update);
    }

    function resetCard(card) {
        const audio = card.querySelector(".audio-element");
        const icon = card.querySelector(".main-icon");
        const circle = card.querySelector(".progress-ring__circle");

        audio.pause();
        audio.currentTime = 0;

        icon.classList.replace("fa-pause", "fa-play");
        card.classList.remove("playing");

        circle.style.strokeDashoffset = CIRCUMFERENCE;

        // Əgər bu card current-dirsə, currentAudio və currentCard sıfırla
        if (card === currentCard) {
            cancelAnimationFrame(rafId);
            currentAudio = null;
            currentCard = null;
        }
    }
});

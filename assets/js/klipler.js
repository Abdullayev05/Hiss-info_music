const video = document.getElementById('myVideo');
    video.onclick = function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };
document.getElementById('playPauseButton').addEventListener('click', function() {
    var playIcon = this.querySelector('.fa-play');
    var pauseIcon = this.querySelector('.fa-pause');
    
    if (playIcon.style.display === 'none') {
        playIcon.style.display = 'inline-block';
        pauseIcon.style.display = 'none';
    } else {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
    }
});
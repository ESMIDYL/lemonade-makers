// Audio player functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if audio is already playing from localStorage
    const isPlaying = localStorage.getItem('audioPlaying') === 'true';
    const audio = document.getElementById('game-theme');
    const button = document.getElementById('play-button');
    
    if (isPlaying) {
        audio.play();
        button.innerHTML = '🔇 Pause Theme';
    }
});

function togglePlay() {
    const audio = document.getElementById('game-theme');
    const button = document.getElementById('play-button');
    
    if (audio.paused) {
        audio.play();
        button.innerHTML = '🔇 Pause Theme';
        localStorage.setItem('audioPlaying', 'true');
    } else {
        audio.pause();
        button.innerHTML = '🔊 Play Theme';
        localStorage.setItem('audioPlaying', 'false');
    }
}
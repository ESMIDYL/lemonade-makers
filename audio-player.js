// Audio player functionality
function saveAudioState(audio) {
    localStorage.setItem('audioPlaying', !audio.paused);
    localStorage.setItem('audioTime', audio.currentTime);
}

document.addEventListener('DOMContentLoaded', function() {
    const isPlaying = localStorage.getItem('audioPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('audioTime')) || 0;
    const audio = document.getElementById('game-theme');
    const button = document.getElementById('play-button');

    if (!audio) {
        console.log('Audio element not found!');
        return;
    }

    // Wait for audio to be ready before setting currentTime
    audio.addEventListener('loadedmetadata', function() {
        audio.currentTime = Math.min(savedTime, audio.duration || savedTime);
        if (isPlaying) {
            audio.play().then(() => {
                button.innerHTML = '🔇 Pause Theme';
            }).catch((e) => {
                button.innerHTML = '🔊 Play Theme';
                console.log('Autoplay blocked or error:', e);
                // Try to play after user gesture
                button.addEventListener('click', function tryPlayOnce() {
                    audio.play();
                    button.innerHTML = '🔇 Pause Theme';
                    button.removeEventListener('click', tryPlayOnce);
                });
            });
        } else {
            button.innerHTML = '🔊 Play Theme';
        }
    });

    // If metadata is already loaded (cache), trigger manually
    if (audio.readyState >= 1) {
        audio.dispatchEvent(new Event('loadedmetadata'));
    }

    // Save state on manual pause/play
    audio.addEventListener('pause', function() { saveAudioState(audio); });
    audio.addEventListener('play', function() { saveAudioState(audio); });
    audio.addEventListener('timeupdate', function() { saveAudioState(audio); });
});

window.addEventListener('beforeunload', function() {
    const audio = document.getElementById('game-theme');
    if (audio) {
        localStorage.setItem('audioPlaying', !audio.paused);
        localStorage.setItem('audioTime', audio.currentTime);
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
    localStorage.setItem('audioTime', audio.currentTime);
}
// click me overlay thing
document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('overlay').classList.add('hidden');
    document.querySelector('.container').classList.add('visible');
    document.querySelector('.music-container').classList.add('visible');
    loadTrack(0);
    audioPlayer.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
});

// get audio elements and buttons
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('song-title');

// playlist, might add more later
// (if you have any suggestions, please let me know!)
const playlist = [
    'music/wifiskeleton - Bipolar.mp3',
    'music/Laufey - Trouble.mp3',
    'music/Laufey - Let You Break My Heart Again.mp3',
    'music/Laufey - Silver Lining.mp3',
    'music/Omori - Title.mp3'
];

let currentTrack = 0;

// function to get the name of the song from the path
function getFileName(path) {
    try {
        const decodedPath = decodeURIComponent(path);
        return decodedPath.split('/').pop().split('.').slice(0, -1).join('.');
    } catch {
        return path.split('/').pop().split('.').slice(0, -1).join('.');
    }
}

function loadTrack(trackIndex) {
    if (trackIndex >= 0 && trackIndex < playlist.length) {
        currentTrack = trackIndex;
        audioPlayer.src = playlist[currentTrack];
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
            songTitle.textContent = 'Error loading audio file';
        });
        playBtn.classList.replace('fa-play', 'fa-pause');
        songTitle.textContent = 'Now playing... ' + getFileName(playlist[currentTrack]);
    }
}

// going to previous track
prevBtn.addEventListener('click', () => {
    const newTrack = currentTrack - 1 >= 0 ? currentTrack - 1 : playlist.length - 1;
    loadTrack(newTrack);
});

// going to next track
nextBtn.addEventListener('click', () => {
    const newTrack = currentTrack + 1 < playlist.length ? currentTrack + 1 : 0;
    loadTrack(newTrack);
});

// when the audio ends, move to the next track
audioPlayer.addEventListener('ended', () => {
    loadTrack(currentTrack + 1 < playlist.length ? currentTrack + 1 : 0);
});

// play/pause button functionality
playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        if (!audioPlayer.src) loadTrack(0);
        audioPlayer.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
    } else {
        audioPlayer.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
    }
});

// load the first track when the page loads
loadTrack(0);

// snowflake stuff
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];
let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

// Snowflake class 
class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.8 + 0.3;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.wobble = Math.random() * 2 - 1;
    }

    update() {
        this.y += this.speed;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 300) {
            let force = (300 - distance) / 30000;
            this.x += dx * force;
            this.y += dy * force;
        }

        this.x += this.wobble * Math.sin(this.y / 50);

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// create snowflakes at the start
function createSnowflakes() {
    for (let i = 0; i < 80; i++) snowflakes.push(new Snowflake());
}

// animate the snowflakes
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
    });
    requestAnimationFrame(animate);
}

// resizing the canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// mouse movement to control snowflakes 
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// start snowflakes animation
createSnowflakes();
animate();

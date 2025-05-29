// SCRIPT SKIDDED FROM FROGGIE!!!

const textElement = document.getElementById("text");
const overlay = document.getElementById("overlay");
const audio = document.getElementById("audio-player");

// lyrics 
const phrases = [
    "",
    "I",
    "I talk",
    "I talk.",
    "I talk..",
    "I talk...",
    "I talk... at",
    "I talk... at night",
    "I talk... at night.",  
    "I talk... at night..",
    "I talk... at night..",
];

// second delays
const delays = [1.66, 0.25, 0.2, 0.2, 0.2, 0.4, 0.5, 0.2, 0.2, 0.5];

overlay.addEventListener("click", () => {
    textElement.textContent = "";
    audio.play();
});

// main animation fade in
audio.addEventListener("play", () => {
    let i = 0;
    overlay.style.opacity = "1";
    
    // add staggered animations for containers
    setTimeout(() => {
        document.querySelector('.container').classList.add('visible');
        setTimeout(() => {
            document.querySelector('.music-container').classList.add('visible');
        }, 200);
    }, 300);
    
    function updateText() {
        if (i < phrases.length) {
            textElement.textContent = phrases[i];
            setTimeout(updateText, delays[i] * 1000);
            i++;
        } else {
            setTimeout(() => {
                overlay.style.transition = "opacity 1s ease";
                overlay.style.opacity = "0";
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 1000);
            }, 300);
        }
    }
    updateText();
});

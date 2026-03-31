const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const volumeSlider = document.getElementById('volume');
const playlistContainer = document.getElementById('playlist');

const tracks = [
    {title: "You Are What You Hate", file: "music/You_Are_What_You_Hate.mp3", art: "images/You_Are_What_You_Hate.png"},
    {title: "9oijiji", file: "music/9oijiji.mp3", art: "images/9oijiji.png"}
];

let currentTrack = 0;

// Inject track cards
tracks.forEach((track, index) => {
    const card = document.createElement('div');
    card.className = 'track-card';
    card.innerHTML = `
        <img src="${track.art}" alt="${track.title}">
        <div class="track-info">
            <strong>${track.title}</strong>
        </div>
    `;
    card.addEventListener('click', () => playTrack(index));
    playlistContainer.appendChild(card);
});

// Play track
function playTrack(index) {
    currentTrack = index;
    audio.src = tracks[currentTrack].file;
    audio.play();
    playBtn.innerHTML = "&#10074;&#10074;"; // pause icon
}

playBtn.addEventListener('click', () => {
    if(audio.paused) {
        audio.play();
        playBtn.innerHTML = "&#10074;&#10074;";
    } else {
        audio.pause();
        playBtn.innerHTML = "&#9654;";
    }
});

nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    playTrack(currentTrack);
});

prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    playTrack(currentTrack);
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Autoplay next
audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    playTrack(currentTrack);
});

// Initialize first track
playTrack(0);

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const shuffleBtn = document.getElementById('shuffle');
const volumeSlider = document.getElementById('volume');
const playlistContainer = document.getElementById('playlist');

// ==== Updated tracks list ====
const tracks = [
    {title: "You Are What You Hate", file: "music/You-Are-What-You-Hate.mp3", art: "images/9oijiji.png"},
    {title: "9oijiji", file: "music/9oijiji.mp3", art: "images/9oijiji.png"},
    {title: "A Home", file: "music/A-Home.mp3", art: "images/9oijiji.png"},
    {title: "A Mode of Being", file: "music/A-Mode-Of-Being.mp3", art: "images/9oijiji.png"}
];

let currentTrack = 0;
let isShuffled = false;

// ==== Inject track cards ====
tracks.forEach((track,index)=>{
    const card = document.createElement('div');
    card.className='track-card';
    card.innerHTML=`
        <img src="${track.art}" alt="${track.title}">
        <div class="track-info"><strong>${track.title}</strong></div>
    `;
    card.addEventListener('click',()=>playTrack(index));
    playlistContainer.appendChild(card);
});

// Highlight current track
function updateActiveCard(){
    document.querySelectorAll('.track-card').forEach((c,i)=>{
        c.classList.toggle('active', i===currentTrack);
    });
}

// ==== Play track safely ====
function playTrack(index){
    currentTrack = index;
    audio.pause();         
    audio.currentTime = 0; 
    audio.src = tracks[currentTrack].file;
    audio.play();           
    playBtn.innerHTML = "&#10074;&#10074;";
    updateActiveCard();
}

// ==== Controls ====
playBtn.addEventListener('click', ()=>{
    if(audio.paused){ audio.play(); playBtn.innerHTML="&#10074;&#10074;"; }
    else { audio.pause(); playBtn.innerHTML="&#9654;"; }
});

nextBtn.addEventListener('click', ()=>{
    currentTrack = (currentTrack + 1) % tracks.length;
    playTrack(currentTrack);
});

prevBtn.addEventListener('click', ()=>{
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    playTrack(currentTrack);
});

shuffleBtn.addEventListener('click', ()=>{
    isShuffled = !isShuffled;
    shuffleBtn.style.opacity = isShuffled ? 1 : 0.5;
});

volumeSlider.addEventListener('input', ()=>{ audio.volume = volumeSlider.value; });

// Auto-next track
audio.addEventListener('ended', ()=>{
    if(isShuffled) currentTrack = Math.floor(Math.random()*tracks.length);
    else currentTrack = (currentTrack+1)%tracks.length;
    playTrack(currentTrack);
});

// ==== Visualizer ====
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const src = audioCtx.createMediaElementSource(audio);
src.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw(){
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0,0,canvas.width,canvas.height);
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x=0;
    for(let i=0;i<bufferLength;i++){
        const barHeight = dataArray[i]/2;
        ctx.fillStyle = `rgba(${barHeight+100},50,150,0.8)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}
draw();

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize first track
playTrack(0);

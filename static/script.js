const audio = document.getElementById("audio")
const button = document.getElementById("enterButton")

const canvas = document.getElementById("visualizer")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let audioCtx = new AudioContext()

let source = audioCtx.createMediaElementSource(audio)
let analyser = audioCtx.createAnalyser()

source.connect(analyser)
analyser.connect(audioCtx.destination)

analyser.fftSize = 256

let bufferLength = analyser.frequencyBinCount
let dataArray = new Uint8Array(bufferLength)


// PARTICLES

let particles = []

for(let i=0;i<120;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.5,
vy:(Math.random()-0.5)*0.5,
size:Math.random()*2+1

})

}


// ENTER BUTTON

button.onclick = function(){

audioCtx.resume()
audio.play()

button.style.display="none"

draw()

}


// MAIN DRAW LOOP

function draw(){

requestAnimationFrame(draw)

analyser.getByteFrequencyData(dataArray)

ctx.fillStyle="rgba(0,0,0,0.2)"
ctx.fillRect(0,0,canvas.width,canvas.height)

drawParticles()
drawWaveform()
drawGlitch()

}


// PARTICLE FIELD

function drawParticles(){

for(let p of particles){

p.x += p.vx
p.y += p.vy

if(p.x<0) p.x=canvas.width
if(p.x>canvas.width) p.x=0

if(p.y<0) p.y=canvas.height
if(p.y>canvas.height) p.y=0

ctx.fillStyle="rgb(0,150,255)"

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()

}

}


// WAVEFORM ENERGY

function drawWaveform(){

let barWidth = canvas.width/bufferLength

for(let i=0;i<bufferLength;i++){

let height=dataArray[i]

ctx.fillStyle="rgb(0,140,255)"

ctx.fillRect(

i*barWidth,
canvas.height-height,
barWidth-2,
height

)

}

}


// GLITCH EFFECT

function drawGlitch(){

if(Math.random()>0.97){

ctx.fillStyle="rgba(0,150,255,0.2)"

ctx.fillRect(

Math.random()*canvas.width,
Math.random()*canvas.height,
Math.random()*200,
10

)

}

}

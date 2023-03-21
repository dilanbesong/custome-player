// &#9658 ---- pause
// &#x23f8 ------ play


const playButton = qs("#play")
const stopButton = qs("#stop")
const timeStamp = qs("#timer")
const audioRange = qs("#audioRange")
const volumeSlide = qs("#volume-slide")
const volumeValue = qs('[data-volumeRate]')
const barContainer = qs('.bar-container')
const nextSongButton = qs('#next')
const prevSongButton = qs('#prev')
const replayButton = qs('#replay')
const shuffleButton = qs('#shuffle')
const forwardButton = qs('#forward')
const backwardButton = qs('#backward')
const autoButton = qs('#auto')
const resetButton = qs('#reset')

resetButton.style.color = "yellow"

let isReplay = false
let isShuffle = false
let isAuto = false
let isReset = true
let songIndex = 0
let skipcount = 0
const songs = [
  "./audio/heaven.mp3",
  "./audio/soledad.mp3",
  "./audio/truelove.mp3",
  "./audio/wedding.mp3",
  "./audio/yeah.mp3",
  "./audio/tonight.mp3",
];

function qs(selector, parent=document){
  return parent.querySelector(selector)
}

let audio = new Audio(songs[songIndex])
audio.volume = 0.5

 
  setInterval(() => {
      let currentRange = (audio.currentTime/audio.duration) * 100
      audioRange.value = currentRange;
      audioRange.title = adjustTime(audio.currentTime)
  }, 1000)


audioRange.addEventListener("change", (e) => {
   let selectedTime = ( parseInt(e.target.value) / 100 ) * audio.duration
   audio.currentTime = selectedTime
});
volumeSlide.addEventListener("input", e => {
   let volumeRate = parseInt(e.target.value)/100
   audio.volume = volumeRate
   volumeValue.innerText = `${Math.floor(volumeRate * 100)}%`;
})

playButton.addEventListener("click", playAndPauseAudio)

stopButton.addEventListener("click", stopAudio)

nextSongButton.addEventListener('click', () => {
   nextSong() 
})
prevSongButton.addEventListener('click', () => {
   songIndex -= 1
   if(songIndex < 0) songIndex = songs.length - 1
   playButton.innerHTML = "⏸";
   audio.src = songs[songIndex];
   audio.play()
    
})

resetButton.addEventListener('click', () => {
    isReset = true
    isAuto = false;
    isReplay = false;
    isShuffle = false;
    resetButton.style.color = 'yellow'
    autoButton.style.color = "#fff";
    replayButton.style.color = "#fff";
    shuffleButton.style.color = "#fff";

})

autoButton.addEventListener('click', () => {
    isAuto = true
    isReplay = false
    isShuffle = false
    resetButton.style.color = "#fff";
    autoButton.style.color = 'yellow'
    replayButton.style.color = '#fff'
    shuffleButton.style.color = '#fff'

})

replayButton.addEventListener('click', () => {
    isAuto = false;
    isReplay = true
    isShuffle = false
    resetButton.style.color = "#fff";
    autoButton.style.color = "#fff";
    replayButton.style.color = 'yellow'
    shuffleButton.style.color = '#fff'
})
shuffleButton.addEventListener('click', () => {
    isAuto = false;
    isReplay = false; 
    isShuffle = true
    resetButton.style.color = "#fff";
    autoButton.style.color = "#fff";
    replayButton.style.color = "#fff"
    shuffleButton.style.color = "yellow"
})
forwardButton.addEventListener('click', () => {
   skipcount += 5
   if(skipcount > 100) skipcount = 100
   audioRange.value = (skipcount / audio.duration) * 100
   audio.currentTime = (skipcount / 100) * audio.duration
})
backwardButton.addEventListener('click', () => {
   skipcount -= 5
   if( skipcount < 0 ) skiptime = 0
   audioRange.value = (skipcount / audio.duration) * 100
   audio.currentTime = (skipcount / 100) * audio.duration
})

function playAndPauseAudio() {
   barContainer.classList.toggle("animate-container")
  if (playButton.innerHTML == "►") {
    playButton.innerHTML = "&#x23f8"
    playButton.title = 'pause'
    audio.play();
    setInterval(() => {
      timeStamp.innerText = adjustTime(audio.currentTime)
      if (audio.currentTime == audio.duration && isReplay){
         resetAudio()
      }
      else if(audio.currentTime == audio.duration && isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length - 1)
        audio.src = songs[songIndex]
        playButton.innerHTML = "⏸"
        audio.play()
      }else if(audio.currentTime == audio.duration && isAuto){
        nextSong()
      }
    }, 1000);
  } else if (playButton.innerHTML == "⏸") {
    playButton.innerHTML = "&#9658"
     playButton.title = "play";
    audio.pause()
  }
}
function resetAudio(){
   audio.play();
   audio.currentTime = 0;
   timeStamp.innerText = adjustTime(0)
   barContainer.classList.add("animate-container");
}
function nextSong(){
   songIndex += 1;
   if (songIndex > songs.length - 1) songIndex = 0;
   playButton.innerHTML = "⏸";
   audio.src = songs[songIndex];
   audio.play();
}
function stopAudio() {
  audio.pause();
  audio.currentTime = 0
  timeStamp.innerText = adjustTime(0)
  barContainer.classList.remove("animate-container")
  playButton.innerHTML = "►"
}

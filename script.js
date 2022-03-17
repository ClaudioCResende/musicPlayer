const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.music-name');
const musicImage = document.querySelector('.music-image');

const timeSlider = document.getElementById('time');
const currentTime = document.querySelector('.current-time');
const totalTime = document.querySelector('.total-time');

const btnRandom = document.querySelector('.random-btn');
const btnRepeat = document.querySelector('.repeat-btn');
const btnPrevious = document.querySelector('.previous-btn');
const btnNext = document.querySelector('.next-btn');
const btnPlayPause = document.querySelector('.playpause-btn');

const currentMusic = document.createElement('audio')

let musicIndex = 0;
let isRandom = false;
let isPlaying = false;
let updateTimer;

const musicList = [
    {
        name:"Vida Louca",
        artist:"Poze do Rodo",
        image:"./images/image1.jpg",
        music:"./music/MC Poze do Rodo - Vida Louca (prod Neobeats).mp4"
    },
    {
        name:"Balão",
        artist:"Orochi",
        image:"./images/image2.jpg",
        music:"./music/Orochi - Balão Prod Dallass).mp4"
    },
    {
        name:"Sem Limite",
        artist:"Bispo",
        image:"./images/image3.jpg",
        music:"./music/BISPO - Sem Limite.mp4"
    }    
];

btnRandom.addEventListener('click',randomSong);
btnRepeat.addEventListener('click',repeatSong);
btnPlayPause.addEventListener('click',playpauseSong);
btnNext.addEventListener('click',nextSong);
btnPrevious.addEventListener('click',previousSong);
timeSlider.addEventListener('change',seekTo);



loadSong(musicIndex);

function loadSong(musicIndex){
    clearInterval(updateTimer);
    reset();

    currentMusic.src = musicList[musicIndex].music;
    currentMusic.load();

    artistName.textContent = musicList[musicIndex].artist;
    musicName.textContent = musicList[musicIndex].name;
    musicImage.src = musicList[musicIndex].image;

    updateTimer = setInterval(setUpdate, 1000);

    currentMusic.addEventListener('ended', nextSong);
    randomBackgoundColor();
}

function randomBackgoundColor(){
    let hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e'];
    let a;
    function generateColor(a){
        for(let i = 0;i<6;i++){
            let x = Math.round( Math.random() * hex.length );
            let y = hex[x];
            a += y
        }
        return a;
    };
    const color1 = generateColor('#');
    const color2 = generateColor('#');
    const gradient = `linear-gradient(120deg,${color1},${color2})`;
    document.body.style.backgroundImage = gradient;
}

function reset(){
    currentTime.textContent = '00:00';
    totalTime.textContent = '00:00';
    timeSlider.value = 0;
}

function randomSong(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
    isRandom = true;
    btnRandom.classList.add('randomActive');
    loadSong(musicIndex);
    console.log('play random');
}

function pauseRandom(){
    isRandom = false;
    btnRandom.classList.remove('randomActive');
    console.log('pause random');

}

function repeatSong(){
    let currentIndex = musicIndex;
    loadSong(currentIndex);
    playSong();
    console.log('repeat Song');
}

function playpauseSong(){
    isPlaying ? pauseSong() : playSong();
}

function playSong(){
    isPlaying = true;
    currentMusic.play();
    musicImage.classList.add('spin-animation');
    btnPlayPause.innerHTML =' <i class="fa-solid fa-circle-pause" id="playpause"></i>'
    
}

function pauseSong(){
    isPlaying = false;
    currentMusic.pause();
    musicImage.classList.remove('spin-animation');
    btnPlayPause.innerHTML = '';
    btnPlayPause.innerHTML =' <i class="fa-solid fa-circle-play" id="playpause"></i>'

}

function nextSong(){
    console.log('next song');
    if(musicIndex < musicList.length -1 && isRandom === false){
        musicIndex +=1;
    }
    else if(musicIndex < musicList.length - 1 && isRandom === true){
        musicIndex = Math.round( Math.random() * (musicList.length -1)  );
    }
    else{
        musicIndex = 0;
    }
    loadSong(musicIndex);
    playSong();
}

function previousSong() {
    console.log('prev song');
    if(musicIndex > 0 && isRandom === false){
        musicIndex -= 1;
    }
    else if(musicIndex > 0 && isRandom === true){
       musicIndex = Math.round( Math.random() * (musicList.length -1)  );
    }
    else{
        musicIndex = musicList.length - 1;
    }
    loadSong(musicIndex);
    playSong();
}

function seekTo(){
    let seek = currentMusic.duration * ( timeSlider.value / 100 );
    currentMusic.currentTime = seek;
}

function setUpdate(){
    let sliderPosition = 0;
    if(!isNaN(currentMusic.duration)) {
        sliderPosition = currentMusic.currentTime * (100 / currentMusic.duration);
        timeSlider.value = sliderPosition;
        timeSlider.style.background = "linear-gradient(to right, #000000ad " + timeSlider.value + "%, transparent " + timeSlider.value + "%)"; 

        let currentMinutes = Math.floor(currentMusic.currentTime / 60);
        let currentSeconds = Math.floor(currentMusic.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentMusic.duration / 60);
        let durationSeconds = Math.floor(currentMusic.duration - durationMinutes*60);

        if(currentMinutes < 10){currentMinutes = '0' + currentMinutes};
        if(currentSeconds < 10){currentSeconds = '0' + currentSeconds};
        if(durationMinutes < 10){durationMinutes = '0' + durationMinutes};
        if(durationSeconds < 10){durationSeconds = '0' + durationSeconds};

        currentTime.textContent = currentMinutes + ':' + currentSeconds;
        totalTime.textContent = durationSeconds + ':' + durationSeconds;
    }
}


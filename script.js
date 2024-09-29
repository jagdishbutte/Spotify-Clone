console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songitems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Manzar Hai Ye Naya", filePath: "songs/0.mp3", coverpath: "Images/cover1.jpg"},
    {songName: "Lakhsya", filePath: "songs/1.mp3", coverpath: "Images/cover2.jpg"},
    {songName: "Kar Har Maidan fateh", filePath: "songs/2.mp3", coverpath: "Images/cover3.jpg"},
    {songName: "Dangal Title Track", filePath: "songs/3.mp3", coverpath: "Images/cover4.jpg"},
    {songName: "Jai Ho", filePath: "songs/4.mp3", coverpath: "Images/cover5.jpg"},
    {songName: "Badhte Chalo", filePath: "songs/5.mp3", coverpath: "Images/cover6.jpg"},
    {songName: "Sultan Title Track", filePath: "songs/6.mp3", coverpath: "Images/cover7.jpg"},
]

songitems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName; 
})

// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
    const seekTime = myProgressBar.value * audioElement.duration / 100;
    audioElement.currentTime = seekTime;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-pause');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=6){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }

    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
})
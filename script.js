console.log("Welcome to Spotify")
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Let me Love You", filepath: "song/1.mp3", coverpath: "cover/1.jpg"},
    {songName: " Don't Let me Love You", filepath: "song/2.mp3", coverpath: "cover/2.jpg"},
    {songName: "I Love You", filepath: "song/3.mp3", coverpath: "cover/3.jpg"},
    {songName: "Salam-e-Ishq", filepath: "song/4.mp3", coverpath: "cover/4.jpg"},
    {songName: "We Don't Talk Anymore", filepath: "song/5.mp3", coverpath: "cover/5.jpg"},
    {songName: "Pasoori", filepath: "song/6.mp3", coverpath: "cover/6.jpg"},
    {songName: "Sunflower", filepath: "song/7.mp3", coverpath: "cover/7.jpg"},
    {songName: "One-Kiss", filepath: "song/8.mp3", coverpath: "cover/8.jpg"},
    {songName: "Levitating", filepath: "song/9.mp3", coverpath: "cover/9.jpg"},
    {songName: "Nights", filepath: "song/10.mp3", coverpath: "cover/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play()

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;  
    }
})
//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100)
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
    })
    
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
       console.log(e.target);
       makeAllPlays();
       songIndex = parseInt(e.target.id);
       e.target.classList.remove('fa-circle-play');
       e.target.classList.add('fa-pause-circle');
       audioElement.src = `song/${songIndex+1}.mp3`;
       masterSongName.innerText = songs[songIndex].songName;
       audioElement.currentTime = 0;
       audioElement.play();
       gif.style.opacity= 1;
       masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity= 1;
    masterPlay.classList.remove('fa-circle-play');
     masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity= 1;
    masterPlay.classList.remove('fa-circle-play');
     masterPlay.classList.add('fa-pause-circle');
})
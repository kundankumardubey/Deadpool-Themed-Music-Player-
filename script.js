console.log("Welcome to Deadpool Player");

const playPath = "M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9l0-176c0-8.7 4.7-16.7 12.3-20.9z";
const pausePath = "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm80 344c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V160c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v192zm-128 0c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V160c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v192z";
const gif = document.querySelector("#gif");

let songItems = Array.from(document.getElementsByClassName('songs'));
let index = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('progressbar');
let songitemplay = document.getElementsByClassName('songitemplay');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('previous');
let currentSongElements = document.getElementsByClassName('current-song');

// List of songs
let songs = [
    { songName: "O Sajni Re", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" },
    { songName: "Sang Rahiyo", filePath: "songs/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "Never Gonna Give You Up", filePath: "songs/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "Abhi Kuch Dino Se", filePath: "songs/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "Hukum", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" },
    { songName: "O Maahi", filePath: "songs/6.mp3", coverPath: "cover/6.jpg" }
];


songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

const updateSongUI = () => {
    audioElement.src = songs[index].filePath;
    audioElement.play();
    makeAllPlays();
    document.querySelector(`[data-index='${index}']`).querySelector('path').setAttribute('d', pausePath);
    gif.style.opacity = 1; // Ensure GIF is visible when song starts playing
    currentSongElements[0].innerText = songs[index].songName; // Update the current song name
};

// Play or pause the audio
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.querySelector('path').setAttribute('d', pausePath);   
        gif.style.opacity = 1; // Show the GIF when playing
        currentSongElements[0].innerText = songs[index].songName; // Update the current song name
    } else {
        audioElement.pause();
        masterPlay.querySelector('path').setAttribute('d', playPath);   
        gif.style.opacity = 0; // Hide the GIF when paused
    }
});


audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(songitemplay).forEach((element) => {
        element.querySelector('path').setAttribute('d', playPath); 
    });
};

Array.from(songitemplay).forEach((element, i) => {
    element.setAttribute('data-index', i);
    element.addEventListener('click', (e) => {
        index = parseInt(e.currentTarget.getAttribute('data-index'));
        updateSongUI();
    });
});

nextBtn.addEventListener('click', () => {
    index = (index + 1) % songs.length; // Loop back to the start
    updateSongUI();
});

prevBtn.addEventListener('click', () => {
    index = (index - 1 + songs.length) % songs.length;
    updateSongUI();
});

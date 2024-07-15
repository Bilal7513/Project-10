const container = document.getElementById('container');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const title = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');

const tracks = ['Hum Ko Maloom Hai Hum Nishane Pe Hain', 'Aqsa Ke Liye Sher Ki Awaz Uthao', 'Hijab Apna', 'Labaik Ya Aqsa', 'Watu Izzu Mantasha Watu Zillu Mantasha', 'Wo Sang E Giran Jo Hayal Hai'];

let trackIndex = 0;

loadTrack(tracks[trackIndex]);

function loadTrack(track){
    title.innerText = track;
    audio.src = `music/${track}.mp3`;
    albumArt.src = `images/${track}.webp`;
};

function playTrack(){
    container.classList.add('play');
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
};

function pauseTrack(){
    container.classList.remove('play');
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
};


function prevTrack(){
    trackIndex--;
    if(trackIndex < 0){
        trackIndex = tracks.length - 1;
    };
    loadTrack(tracks[trackIndex]);
    playTrack();
};

function nextTrack(){
    trackIndex++;
    if(trackIndex == tracks.length){
        trackIndex = 0;
    };
    loadTrack(tracks[trackIndex]);
    playTrack();
};

function updateProgress(e){
    const{ duration, currentTime } = e.srcElement;
    const progressPercentage = currentTime/duration * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickLocation = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = clickLocation / width * duration;
}

playBtn.addEventListener('click',() => {
    const isPlaying = container.classList.contains('play');
    if(isPlaying){
        pauseTrack();
    } else{
        playTrack();
    }
});

previousBtn.addEventListener('click', prevTrack);

nextBtn.addEventListener('click', nextTrack);

audio.addEventListener('timeupdate', updateProgress);

progress.addEventListener('click', setProgress);

audio.addEventListener('ended', nextTrack);
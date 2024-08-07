// window.alert("working");
// public\audio\1.mp3

const music = new Audio('humdard.mp3');
// music.play();

// create array
const songs = [
    {
        id: '1',
        songName: `On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "public/img/1.jpg"
    },
    {
        id: '2',
        songName: `Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "public/img/2.jpg"
    },
    {
        id: '3',
        songName: `Cartoon-On & On <br>
        <div class="subtitle"> Daniel Levi</div>`,
        poster: "public/img/3.jpg"
    },
    {
        id: '4',
        songName: `Warriyo-Mortals <br>
        <div class="subtitle">Mortals </div>`,
        poster: "public/img/4.jpg"
    },
    {
        id: '5',
        songName: `Ertugrul Gazi <br>
        <div class="subtitle"> Ertugrul </div>`,
        poster: "public/img/5.jpg"
    },
    {
        id: '6',
        songName: `Electronic Music <br>
        <div class="subtitle">Electro </div>`,
        poster: "public/img/6.jpg"
    },
    {
        id: '7',
        songName: `Agar Tum Saath Ho <br>
        <div class="subtitle"> Tamashaa </div>`,
        poster: "public/img/7.jpg"
    },
    {
        id: '8',
        songName: `Suna Hai <br>
        <div class="subtitle">Neha Kakker </div>`,
        poster: "public/img/8.jpg"
    },
    {
        id: '9',
        songName: `Dilbar <br>
        <div class="subtitle">Satyameva Jayate </div>`,
        poster: "public/img/9.jpg"
    },
    {
        id: '10',
        songName: `Duniya <br>
        <div class="subtitle">Luka Chhuppi </div>`,
        poster: "public/img/10.jpg"
    },
    {
        id: '11',
        songName: `Lagdi Lahore Di <br>
        <div class="subtitle">Guru Randhava </div>`,
        poster: "public/img/11.jpg"
    },
    {
        id: '12',
        songName: `Putt Jatt Da <br>
        <div class="subtitle">Putt Jatt Da </div>`,
        poster: "public/img/12.jpg"
    },
    {
        id: '13',
        songName: `Baarishein <br>
        <div class="subtitle"> Atif Aslam</div>`,
        poster: "public/img/13.jpg"
    },
    {
        id: '14',
        songName: `Vaste <br>
        <div class="subtitle">Dhvani Bhanushali</div>`,
        poster: "public/img/14.jpg"
    },
    {
        id: '15',
        songName: `Lut gaya <br>
        <div class="subtitle">Jubin Nautiyal</div>`,
        poster: "public/img/15.jpg"
    },
]


const menuSideElement = document.getElementsByClassName("menu_side")[0];
const popularSong = document.getElementsByClassName("popular_song")[0];

const songItemElement = menuSideElement.getElementsByClassName('songItem');
const songItemElement2 = popularSong.getElementsByClassName('songItem');

let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementsByClassName("wave")[0];

const playListPlay = document.getElementsByClassName("playListPlay");
const songItem = document.getElementsByClassName("songItem");

const poster_master_play = document.getElementById('poster_master_play');
const title_master_play = document.getElementById('title');


// dynamically updating the menu_side menu_song list
// adding the poster, name, indexing of side song list
Array.from(songItemElement).forEach((element, i) => {
    const spanElement = element.getElementsByTagName('span')[0];
    const h5Element =  element.getElementsByTagName('h5')[0];
    const imgElement = element.getElementsByTagName('img')[0];
    const iElement = element.getElementsByTagName('i')[0];
    
    spanElement.innerHTML = i+1;
    h5Element.innerHTML = songs[i].songName;
    imgElement.src = songs[i].poster;
    iElement.id = i+1;
});

// dynamically updating the song_side popular_song list
// adding the poster, name, indexing of side song list
Array.from(songItemElement2).forEach((element, i) => {
    const h5Element =  element.getElementsByTagName('h5')[0];
    const imgElement = element.getElementsByTagName('img')[0];
    const iElement = element.getElementsByTagName('i')[0];

    h5Element.innerHTML = songs[i].songName;
    imgElement.src = songs[i].poster;
    iElement.id = i+1;
});



const playMusic = () => {
    music.src = `public/audio/${index}.mp3`;
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
    
    // updating the master_play
    poster_master_play.src = songs[index-1].poster;
    title_master_play.innerHTML = songs[index-1].songName;
    
    music.play();
}
const pauseMusic = () => {
    music.pause();
    masterPlay.classList.remove("bi-pause-fill");
    masterPlay.classList.add("bi-play-fill");
    wave.classList.remove("active2");
}



masterPlay.addEventListener('click', () => {
    if(music.paused || music.currentTime <= 0 ) {
        playMusic();
    } else {
        pauseMusic();
    }
});


const makeAllPlays = () => {
    Array.from(playListPlay).forEach((element) => {
        element.classList.remove("bi-pause-circle-fill");
        element.classList.add("bi-play-circle-fill");
    })
}
const makeAllBackgrounds = () => {
    Array.from(songItem).forEach((element) => {
        element.style.background = "rgb(105, 105, 170, 0)";
    })
}



let index = 0;
Array.from(playListPlay).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        index = e.target.id;
        e.target.classList.remove("bi-play-circle-fill");
        e.target.classList.add("bi-pause-circle-fill");
        
        // Adds background to the clicked SONG ITEM
        makeAllBackgrounds();
        let parentNode = e.target.parentNode;
        if(parentNode.classList.value == "img_play") {
            parentNode = parentNode.parentNode;
        }
        parentNode.style.background = "rgb(105, 105, 170, 0.1)";
        parentNode.style.borderRadius = "10px";
        
        music.addEventListener('ended', () => {
            pauseMusic();
        });
        playMusic();
    })
});


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let musicCurrentTime = music.currentTime;
    let musicDuration = music.duration;
    
    // updating the current time of master play
    let currentTimeMinutes = Math.floor(musicCurrentTime/60);
    let currentTimeSec = Math.floor(musicCurrentTime%60);
    if(currentTimeSec < 10) { currentTimeSec = `0${currentTimeSec}`};
    currentStart.innerHTML = `${currentTimeMinutes}:${currentTimeSec}`;
    
    // setting the song duration
    let durationMinutes = Math.floor(musicDuration/60);
    let durationSec = Math.floor(musicDuration%60);
    if(durationSec < 10) { durationSec = `0${durationSec}`};
    currentEnd.innerHTML = `${durationMinutes}:${durationSec}`;
    
    // updating the seek bar
    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

});

seek.addEventListener('change', () => {
    music.currentTime = music.duration * seek.value/100;
});

music.addEventListener('ended', () => {
    pauseMusic();
});


// UPDATING THE VOLUME BAR
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');                       // input tag
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', () => {
    if(vol.value ==  0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
    }
    if(vol.value > 0) {
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
    }
    if(vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let volValue = vol.value;
    vol_bar.style.width = `${volValue}%`;
    vol_dot.style.left = `${volValue}%`;
    music.volume = volValue/100;
});

// UPDATING THE MASTER BAR BACK BUTTON
let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index--;
    if(index < 1) {
        alert("No Previous Song");
        index = 1;
    }
    playMusic();
    makeAllBackgrounds();

});
next.addEventListener('click', () => {
    index++;
    let maxIndex = songs.length;
    if(index > maxIndex) {
        alert("No Next Song");
        index = 1;
    }
    playMusic();
    makeAllBackgrounds();

});

const leftScroll = document.getElementById('left_scroll');
const rightScroll = document.getElementById('right_scroll');
const popSong = document.getElementsByClassName('pop_song')[0];

leftScroll.addEventListener('click', () => {
    popSong.scrollLeft -= 110;
})
rightScroll.addEventListener('click', () => {
    popSong.scrollLeft += 110;
})

const leftScrolls = document.getElementById('left_scrolls');
const rightScrolls = document.getElementById('right_scrolls');
const item = document.getElementsByClassName('item')[0];

leftScrolls.addEventListener('click', () => {
    item.scrollLeft -= 80;
})
rightScrolls.addEventListener('click', () => {
    item.scrollLeft += 80;
})

// console.log(progressbar);

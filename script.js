const toggle = document.getElementById('toggle');
const mute = document.getElementById('mute');
const locations = document.getElementById('locations');
const speed = document.getElementById('speed');
const audio = document.getElementById('music');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

var currentCityIndex;
var currentCity
var currentVideoIndex;
var currentVideo;
var currentAudioIndex;
var currentAudio;

const data = [
    {
        city:'London',
        videos:[
            'Ujyu8foke60',
            '__Eo-dvEH7g'
    ],
        music:[
            'https://solid41.streamupsolutions.com/proxy/lmuespnh',
            'http://uk2.internet-radio.https://s24.myradiostream.com/:10690/stream/1/'
        ]
    },
    {
        city:'NewYork',
        videos:[
            'F8MN0o6RS9o',
            '__Eo-dvEH7g'
    ],
        music:[
            'https://jking.cdnstream1.com/b75154_128mp3',
            'https://usa6.fastcast4u.com/proxy/nhhqucow2'
        ]
    },
    {
        city:'Dubai',
        videos:[
            'TE2tfavIo3E',
            'gAejektGusM'
    ],
        music:[
            'https://dmirdo.mangomolo.com/dubairdo.mp3',
            'https://eu8.fastcast4u.com/proxy/clyedupq'
        ]
    },
    {
        city:'Delhi',
        videos:[
            'lv8AoqDU13Q',
            '_UlKnvXKUWE'
    ],
        music:[
            'http://brahman.riggrodigital.com:8082/stream',
            'http://uk2.internet-radio.com:8066/stream',
            'https://eu8.fastcast4u.com/proxy/clyedupq'
        ]
    },

    {
        city:'Los Ageles',
        videos:[
            'eR5vsN1Lq4E',
            'lTvYjERVAnY'
    ],
        music:[
            'http://backbonenetworks.streamguys.com/pierce',
            'http://sarcheshmeh.icdndhcp.com:18452/stream'
        ]
    },
    {
        city:'Amsterdam',
        videos:[
            '_nS2FvZ0h2g'
    ],
        music:[
            'http://server-23.stream-server.nl:8438/;',
            'https://kathy.torontocast.com:2495/stream'
        ]
    },
    {
        city:'Paris',
        videos:[
            'FBjjYw-xcdg'
    ],
        music:[
            'https://stream3.vestaradio.com/aligrefmradio',
            'https://amilaradio.ice.infomaniak.ch/amilaradio-128.mp3'
        ]
    }

]

const availablespeeds = [0.5, 1, 1.5, 2]
onLoad()
function onLoad(){

    currentCityIndex = randomNumber(data.length);
    currentCity = data[currentCityIndex];
    currentVideoIndex = randomNumber(currentCity.videos.length);
    currentVideo = currentCity.videos[currentVideoIndex];
    currentAudioIndex = randomNumber(currentCity.music.length);
    currentAudio = currentCity.music[currentAudioIndex];

    console.log(currentAudio)
    audio.src = currentAudio;
    audio.volume = 0.5;
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');

    data.forEach((el, idx) => {
        var locationElement = document.createElement('li');
        locationElement.innerText = el.city;
        locationElement.id = idx;
        locationElement.addEventListener('click', () => {
            currentCityIndex = Number(e.target.id);
            currentCity = currentCity.music[currentAudioIndex];

            audio.src = currentAudio;
            audio.volume = 0.5;
            play.classList.remove('fa-play');
            play.classList.add('fa-pause');

        })

        locations.append(locationElement)
    })

    availablespeeds.forEach((el, idx) => {
        var speedEl = document.createElement('p');
        speedEl.id = el;
        speedEl.innerText = el + 'x';
        speedEl.addEventListener('click', (e) =>{
            player.setPlayBackRate(Number(e.target.id))
        })
        speed.append(speedEl)
    })
    highlight()
    
}

function highlight() {
    console.log(locations.childNodes)
    locations.childNodes.forEach((el, idx) => {
       el.classList.remove('active');
       if(idx == currentCityIndex){
        el.classList.add('active')
       }
    })
}

function randomNumber (max) {
    return Math.floor(Math.random()*(max))
}

play.addEventListener('click',() =>{
    if(audio.paused){
        audio.play()
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }else{
        audio.pause()
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    }
})

next.addEventListener('click', () =>{
    if(currentAudioIndex < (currentCity.music.length-1)){
        currentAudioIndex++;
    }else{
        currentAudioIndex = 0;
    }

    currentAudio = currentCity.music[currentAudioIndex];
    audio.src = currentAudio;
    audio.play()
})

prev.addEventListener('click', () => {
    if(currentAudioIndex > 0){
        currentAudioIndex--
    }else{
        currentAudioIndex = currentCity.music.length-1;
    }

    currentAudio = currentCity.music[currentAudioIndex];
    audio.src = currentAudio;
    audio.play()
})

mute.addEventListener('click', () => {
    if(player.isMuted()){
        player.unMute();
        mute.innerText = 'On'
    }else{
        player.mute();
        mute.innerText = 'Off'
    }
})

toggle.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('hide');
})

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: window.innerHeight*1.2,
    width:  window.innerHeight*1.2*(16/9),
    videoId: currentVideo,
    playerVars: {
      'playsinline': 1,
      'controls':0,
      'mute':1,
      'showinfo':0,
      'enablejsapi':1,
      'disablekb':1,
      'modestbranding':1,
      'origin':window.location.origin,
      'widget_referrer': window.location.href
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
    if(event.data == YT.PlayerState.ENDED){
        if(currentVideoIndex < currentCity.videos.length){
            currentAudioIndex++
        }else{
            currentVideoIndex = 0
        }
        currentVideo = currentCity.videos[currentVideoIndex];
        player.loadVideoById({videoId: currentVideo});
        highlight()
    }
    if(event.data == YT.PlayerState.BUFFERING){
        loading.style.display = 'flex'
    }
  if (event.data == YT.PlayerState.PLAYING ) {
   loading.style.display = 'flex';
   setTimeout(() => {
    loading.style.display = 'none'
   }, 3000)
  }
}

function changeVolume(e) {
    audio.volume = parseFloat(e.value / 100);
}
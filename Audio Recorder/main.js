const mic_btn =document.querySelector('#mic')
const playback = document.querySelector('.playback')

mic_btn.addEventListener('click', ToggleMic);

let can_record = false
let is_recording = false;

let recorder = null

let chunks = [];

console.log("Setup")

function SetupAudio(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices
            .getUserMedia({
                audio: true
            })
            .then(setupStream)
            .catch(err => 
                {console.error(err)
            });
    }
}

SetupAudio();

function setupStream(stream){
    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = e => {
        chunks.push(e.data)
    }

    recorder.onstop = e =>{
        const blob = new Blob(chunks, {type: "audio/mp3; codecs=opus"})
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob)
        playback.src = audioURL;
    }

    can_record = true;
}

function ToggleMic(){
    if(!can_record) return;

    is_recording = !is_recording

    if(is_recording){
        recorder.start()
    } else {
        recorder.stop()
    }
}
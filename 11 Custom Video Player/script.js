const video = document.querySelector('video');


// hover player to display the controls

const player = document.querySelector('.player');
player.addEventListener('mouseenter', () => {
	player.classList.add('hover');
});
player.addEventListener('mouseleave', () => {
	player.classList.remove('hover');
})


// click to play or pause the video, also change the play_button icon

const play_button = document.querySelector('.play_button');
play_button.addEventListener('click', play_Or_Pause);
video.addEventListener('click', play_Or_Pause);
function play_Or_Pause() {
	const method = video.paused ? 'play' : 'pause';
	play_button.querySelector('span').textContent = !video.paused ? 'play_arrow' : 'pause'
	video[method]();
}
video.addEventListener('ended', () => {
	video.pause();
	play_button.querySelector('span').textContent = 'replay';
})


// forward and rewind the video

const rewind = document.querySelector('.rewind')
rewind.addEventListener('click', () => {
	video.currentTime = video.currentTime - 10;
})
const forward = document.querySelector('.forward')
forward.addEventListener('click', () => {
	if(video.currentTime + 10 > video.duration) {
		return;
	}
	video.currentTime = video.currentTime + 10;
})


// create the progress bar to display the progress, and click/drag to jump

const progress = document.querySelector('.progress')
video.addEventListener('timeupdate', () => {
	progress.style.setProperty('--my-progress', `${video.currentTime / video.duration * 100}%`);
});
// click to jump
progress.addEventListener('click', (e) => {
	const ratio = e.offsetX / progress.offsetWidth;
	video.currentTime = ratio * video.duration;
});
// drag to jump
let isJump;
progress.addEventListener('mousedown', () => {
	isJump = true;
});
window.addEventListener('mousemove', (e) => {
	if(isJump) {
		const ratio = e.offsetX / progress.offsetWidth;
		video.currentTime = ratio * video.duration;
	}
});
window.addEventListener('mouseup', () => {
	isJump = false;
})


// timer to display precise progress

video.addEventListener('loadeddata', displayTimer);
video.addEventListener('timeupdate', displayTimer);
function displayTimer() {
	const timer = document.querySelector('.timer');
	timer.textContent = `${secondsToHHMMSS(video.currentTime)} / ${secondsToHHMMSS(video.duration)}`;
}
function secondsToHHMMSS(time) {
	const timeFloor = Math.floor(time);
	const hour = Math.floor(timeFloor / 3600);
	const minute = Math.floor((timeFloor - hour * 3660) / 60);
	const second = timeFloor % 60;
	return timeFloor < 3600 ? `${pad(minute)} : ${pad(second)}` : `${pad(hour)} : ${pad(minute)} : ${pad(second)}`;
}
function pad(time) {
	return time.toString().padStart(2, '0');
}


// hover speed and volume button will display the range input bar
const speed = document.querySelector('.speed');
speed.addEventListener('mouseenter', () => {
	speed.classList.add('hover');
	speed.addEventListener('mouseleave', () => {
		speed.classList.remove('hover');
	});
});
const volume = document.querySelector('.volume');
const volume_container = document.querySelector('.volume_container');
volume.addEventListener('mouseenter', () => {
	volume.classList.add('hover');
	volume_container.addEventListener('mouseleave', () => {
		volume.classList.remove('hover');
	});
});

// click volume button to mute

volume.addEventListener('click', () => {
	video.muted = !video.muted;
	volume.querySelector('span').textContent = video.muted ? 'volume_off' : 'volume_up';
})

// adjust the bar to control the playbackRate and valume

const rate_slider = document.querySelector('.rate_slider')
rate_slider.addEventListener('change', () => {
	video.playbackRate = rate_slider.value;
})
const volume_slider = document.querySelector('.volume_slider')
volume_slider.addEventListener('input', () => {
	video.volume = volume_slider.value;
	volume.querySelector('span').textContent = video.volume === 0 ? 'volume_off' : 'volume_up';
})


// click to enter fullscreen state

const fullscreen = document.querySelector('.fullscreen');
fullscreen.addEventListener('click', openFullscreen);
function openFullscreen() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	}
}










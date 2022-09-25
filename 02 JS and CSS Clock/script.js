const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGTH = canvas.height = 400;

ctx.translate(CANVAS_WIDTH/2, CANVAS_HEIGTH/2);

function drawClock(){
	const date = new Date();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	showDigitalClock();

	ctx.clearRect(-CANVAS_WIDTH/2, -CANVAS_HEIGTH/2, CANVAS_WIDTH, CANVAS_HEIGTH);

	ctx.fillStyle = 'orange';
	ctx.arc(0, 0, 5, 0, 2*Math.PI);
	ctx.fill();

	ctx.fillStyle = 'white';

	ctx.save()

	// hour marks
	for (let i = 0; i < 12; i++) {
		ctx.fillRect(160, -2.5, 20, 5);
		ctx.rotate(degToRad(30));
	}

	// minute marks
	for (let j = 0; j < 60; j++) {
		ctx.fillRect(170, -1.5, 10, 3);
		ctx.rotate(degToRad(6));
	}


	// Rotate -1/4 circle for counting clock easily
	ctx.rotate(-Math.PI/2);

	// hour hand
	ctx.save();
	ctx.fillStyle = 'rgba(255, 255, 255, 1)';
	ctx.rotate(degToRad(hour/12 * 360 + minute/60 * 30));
	ctx.beginPath();
	ctx.ellipse(5, 0, 90, 3, 0, 1.5*Math.PI, 2.5*Math.PI);
	ctx.fill();
	// ctx.fillRect(0, -3 , 110, 6);
	ctx.restore();

	// minute hans
	ctx.save();
	ctx.fillStyle = 'rgba(255, 255, 255, 1)';
	ctx.rotate(degToRad(minute/60 * 360 + second/60 * 6));
	ctx.beginPath();
	ctx.ellipse(5, 0, 130, 2, 0, 1.5*Math.PI, 2.5*Math.PI);
	ctx.fill();
	// ctx.fillRect(0, -2 , 140, 4);
	ctx.restore();

	// second hand
	ctx.fillStyle = 'rgba(255, 0, 0, 1)';
	ctx.rotate(degToRad(second/60 * 360));
	ctx.beginPath();
	ctx.ellipse(5, 0, 170, 1, 0, 1.5*Math.PI, 2.5*Math.PI);
	ctx.fill();
	// ctx.fillRect(0, -1 , 170, 2);

	ctx.restore();

	requestAnimationFrame(drawClock);
}

function degToRad(deg) {
	return 2 * Math.PI * deg / 360;
}

function showDigitalClock() {
	const digitalClock = document.querySelector('.digitalClock');
	digitalClock.textContent = `${pads2(new Date().getHours())} : ${pads2(new Date().getMinutes())} : ${pads2(new Date().getSeconds())}`;
}

function pads2(num) {
	return num.toString().padStart(2, '0');
}

window.addEventListener('load', drawClock);









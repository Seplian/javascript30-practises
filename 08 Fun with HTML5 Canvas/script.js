const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = window.innerWidth * 0.95;
const CANVAS_HEIGHT = canvas.height = window.innerHeight * 0.86;

ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.lineCap = 'round';
// ctx.lineJoin = 'round';

// declare and initialize
let x = 0;
let y = 0;
let isDraw = false;
let hue = randomNumber(360);
let lineWidth = randomNumber(30);
let plusMinus = ['plus', 'minus'][Math.floor(Math.random()*2)];

// Attach event listener
canvas.addEventListener(`mousedown`, (e) => {
	x = e.offsetX;
	y = e.offsetY;
	isDraw = true;
});

canvas.addEventListener('mousemove', (event) => {
	if (isDraw) { draw(); }
});

window.addEventListener('mouseup', ()=> {
	isDraw = false;
})

// random function
function randomNumber(max) {
	return Math.floor(Math.random() * max);
}

// draw function
function draw() {
	let dx = event.offsetX;
	let dy = event.offsetY;

	ctx.beginPath();
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
	ctx.lineWidth = lineWidth;
	ctx.moveTo(x, y);
	ctx.lineTo(dx, dy);
	ctx.stroke();
	// ctx.closePath();

	x = event.offsetX;
	y = event.offsetY;

    hue > 360 ? hue = 0 : hue++;

	// hue++;
	// if (hue > 360) {
	// 	hue = 0;
	// }

	if (lineWidth >= 30) {
		plusMinus = 'minus';
	} else if (lineWidth <= 0) {
		plusMinus = 'plus';
	}

	console.log(plusMinus);
	plusMinus === 'minus' ? lineWidth-- : lineWidth++;

	// if (plusMinus === 'minus') {
	// 	lineWidth--;
	// } else {
	// 	lineWidth++;
	// }
}






// random number test

// function getRndInteger(min, max) {
//   return Math.floor(Math.random() * (max - min) ) + min;
// }
// let min = 0;
// let max = 10;
// let superNum = 5;
// let subNum = 5;

// for (let i = 0; i < 100000; i++) {
// 	let randomNum = getRndInteger(0, 10);

// 	if (randomNum > superNum) {
// 		superNum = randomNum;
// 	}

// 	if (randomNum < subNum) {
// 		subNum = randomNum;
// 	}
// } // [0, 10)

// function getRndInteger(min, max) {
//   return Math.ceil(Math.random() * (max - min) ) + min;
// }
// let min = 0;
// let max = 10;
// let superNum = 5;
// let subNum = 5;

// for (let i = 0; i < 100000; i++) {
// 	let randomNum = getRndInteger(0, 10);

// 	if (randomNum > superNum) {
// 		superNum = randomNum;
// 	}

// 	if (randomNum < subNum) {
// 		subNum = randomNum;
// 	}
// } // (0, 10]

// function getRndInteger(min, max) {
//   return Math.round(Math.random() * (max - min) ) + min;
// }
// let min = 0;
// let max = 10;
// let superNum = 5;
// let subNum = 5;

// for (let i = 0; i < 100000; i++) {
// 	let randomNum = getRndInteger(0, 10);

// 	if (randomNum > superNum) {
// 		superNum = randomNum;
// 	}

// 	if (randomNum < subNum) {
// 		subNum = randomNum;
// 	}
// } // (0, 10)










let inputContent = [];
const password = 'right';

window.addEventListener('keypress', e => {
	isCorrect(e);
})

function isCorrect(e) {
	inputContent.push(e.key);
	inputContent.splice(-password.length-1, inputContent.length-password.length);
	inputContent.join('').includes(password) ? cornify_add() : console.log('wrong');
	document.querySelector('.main p').innerHTML = inputContent.join('-');
}

// function isCorrect(e) {
// 	if (inputContent.push(e.key) >= password.length) {
// 		if (inputContent.join('') === password) {
// 			cornify_add();
// 		} else {
// 			console.log('wrong');
// 		}
// 		inputContent.shift();
// 	} else {
// 		console.log('short');
// 	}
// }



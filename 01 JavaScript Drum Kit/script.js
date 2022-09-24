const drumKit = document.querySelector('.drumKit');
const kits = document.querySelectorAll('.aKit');

kits.forEach((aKit) => {
	aKit.addEventListener('mousedown', (e) => {
		aKit.classList.add('active');
		playADrum(e.currentTarget);
		// console.log(e.currentTarget === aKit);

		document.addEventListener('mouseup', () => {
			aKit.classList.remove('active');
		});
	});

	document.addEventListener('keydown', (e) => {
		const aKey = aKit.querySelector('.key');
		if (aKey.textContent.toLowerCase() === e.key) {
			aKit.classList.add('active');
			playADrum(aKit);

			document.addEventListener('keyup', () => {
				aKit.classList.remove('active');
			});
		}
	});
});

function playADrum (aKit) {
	const aDrum = aKit.querySelector('.drum');
	const drumSrc = aDrum.textContent.toLowerCase();
	console.log(drumSrc);

	const aAudio = new Audio(`sounds/${drumSrc}.wav`);
	aAudio.play();
}
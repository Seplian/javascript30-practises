const spacing = document.querySelector('#spacing');
const blur = document.querySelector('#blur');
const grayscale = document.querySelector('#grayscale');
const baseColor = document.querySelector('#baseColor');
const img = document.querySelector('img');

spacing.addEventListener('input', () => {
	img.style.setProperty('--my-spacing', `${spacing.value}px`);
});

blur.addEventListener('input', () => {
	img.style.setProperty('--my-blur', `${blur.value}px`);
});

grayscale.addEventListener('input', () => {
	img.style.setProperty('--my-grayscale', `${grayscale.value}%`);
});

baseColor.addEventListener('input', () => {
	img.style.setProperty('--my-color', baseColor.value);
});


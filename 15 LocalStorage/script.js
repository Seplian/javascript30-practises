const list = document.querySelector('.wrapper ul');
const form = document.querySelector('.wrapper form');
const itemInput = document.querySelector('#tapasInput');
let listArray = [];

form.addEventListener('submit', (e) => {
	e.preventDefault();
	list.innerHTML = '';

	const newItem = document.createElement('li');
	const newCheckbox = document.createElement('input');
	newCheckbox.setAttribute('type', 'checkbox');
	newCheckbox.setAttribute('id', itemInput.value);
	const newLabel = document.createElement('label');
	newLabel.setAttribute('for', itemInput.value);
	const labelContent = document.createElement('span');
	labelContent.textContent = itemInput.value;
	newLabel.appendChild(labelContent);
	newItem.appendChild(newCheckbox);
	newItem.appendChild(newLabel);

	listArray.push(newItem);

	listArray.forEach(ele => {
		list.appendChild(ele);
	});
});







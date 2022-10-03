const checkboxes = document.querySelectorAll('.inbox .item input');
const checkedArray = [];
checkboxes.forEach((ele, index) =>{
	ele.addEventListener('input', (e) => {

		if (ele = e.currentTarget) {
			if (!e.currentTarget.checked) {
				checkedArray.splice(checkedArray.indexOf(index), 1);
			} else {
				checkedArray.push(index);
			}
		}
		// console.log(checkedArray);

		// let checkedCount = 0;
		// checkboxes.forEach((ele2) => {
		// 	if (ele2.checked) {
		// 		checkedCount++;
		// 	}
		// });

		if (checkedArray.length >= 2 && keydownShift) {
			let upperBound = Math.max(checkedArray.at(-1), checkedArray.at(-2));
			let lowerBound = Math.min(checkedArray.at(-1), checkedArray.at(-2))
			// console.log('OK');

			for (let i = lowerBound; i <= upperBound; i++) {
				checkboxes[i].checked = true;
			}
		}

		checkboxes.forEach((ele3) => {
			if (ele3.checked) {
				ele3.nextElementSibling.classList.add('checkedP');
			} else {
				ele3.nextElementSibling.classList.remove('checkedP');
			}
		});
	});
});

let keydownShift = false;

window.addEventListener('keydown', (e) => {
	if (e.key === 'Shift') {
		keydownShift = true;
	}
});

window.addEventListener('keyup', (e) => {
	if (e.key === 'Shift') {
		keydownShift = false;
	}
})
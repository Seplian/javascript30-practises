const panels = document.querySelectorAll('.panel')

panels.forEach((ele) => {
	ele.addEventListener('click', (e) => {
		if (!Array.from(e.currentTarget.classList).includes('active')) {
			panels.forEach((element) => {
				element.classList.remove('active');
			});
		}

		e.currentTarget.classList.toggle('active');
	});
});

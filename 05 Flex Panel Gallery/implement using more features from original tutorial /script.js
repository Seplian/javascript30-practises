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

panels.forEach((ele) => {
	ele.addEventListener('transitionend', toggleMove);
});

function toggleMove(e) {
  console.log(e.propertyName);
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('move');
  }
}


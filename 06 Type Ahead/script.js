const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities;
if (cities) {
	console.log('Data has been fetched.')
} else {
	fetch(endpoint)
		.then(response => response.json())
		.then(result => {
			cities = result;
			console.log('Data is fetched.')
		});
};

const suggestions = document.querySelector('.suggestions');

const search = document.querySelector('.search');
search.addEventListener('input', () => {

	// Matching
	const searchContent = new RegExp(search.value, 'gi')
	const matchingCities = cities.filter((element) => {
		return element.city.match(searchContent) || element.state.match(searchContent);;
	})

	// Sorting
	const matchingCitiesSorted = matchingCities.sort((a, b) => {
		return -(a.population - b.population);
	});

	// display
	suggestions.innerHTML = "";
	for (let i = 0; i < matchingCitiesSorted.length; i++){
		const li = document.createElement('li');

		// Replacing
		const spanMatch = `<span class='match'>${search.value}</span>`;
		let liContentCity = matchingCitiesSorted[i].city.replace(searchContent, spanMatch);
		let liContentState = matchingCitiesSorted[i].state.replace(searchContent, spanMatch);
		li.innerHTML = `<span>${liContentCity}, ${liContentState}</span>`;

		const spanPopulation = document.createElement('span');
		spanPopulation.setAttribute('class', 'population');
		spanPopulation.textContent = matchingCitiesSorted[i].population;
		li.appendChild(spanPopulation);
		suggestions.appendChild(li);
	}
});



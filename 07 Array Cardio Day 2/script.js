// ## Array Cardio Day 2

const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
];

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];

// Some and Every Checks

// Array.prototype.some()
// is at least one person 19 or older?

const someCheck1 = people.some(ele => {
	return 2022 - ele.year >= 19;
});
console.log({has19: someCheck1});

// Array.prototype.every()
// is everyone 19 or older?

const everyCheck1 = people.every(ele => {
	return 2022 - ele.year >= 19;
});
console.log({every19: everyCheck1});

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

const findOne = comments.find(ele => {
	return ele.id === 823423;
});
console.log(findOne);

// Array.prototype.findIndex()
// Find the comment with this ID

const findOneComment = comments.find(ele => {
	return ele.id === 823423;
}).text;
console.log(`comment of ID 823423: ${findOneComment}`);

// delete the comment with the ID of 823423

const findOneIndex = comments.findIndex(ele => {
	return ele.id === 823423;
});
console.table(comments);
comments.splice(findOneIndex, 1);
console.table(comments);





// display the two arrays in table

const tablePeople = document.querySelector('.tablePeople tbody')
people.forEach((ele) => {
	const tr = document.createElement('tr');
	const nameTD = document.createElement('td');
	const yearTD = document.createElement('td');
	nameTD.textContent = ele.name;
	yearTD.textContent = ele.year;
	tr.appendChild(nameTD);
	tr.appendChild(yearTD);
	tablePeople.appendChild(tr);
});

const tableComments = document.querySelector('.tableComments tbody')
comments.forEach((ele) => {
	const tr = document.createElement('tr');
	const textTD = document.createElement('td');
	const idTD = document.createElement('td');
	textTD.textContent = ele.text;
	idTD.textContent = ele.id;
	tr.appendChild(textTD);
	tr.appendChild(idTD);
	tableComments.appendChild(tr);
});

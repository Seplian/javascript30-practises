const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's

const Array1 = inventors.filter(function (element) {
  return element.year >= 1500 && element.year < 1600;
})
console.table(Array1);

// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names

const Array2 = inventors.map((element) => {
    return { first: element.first, last: element.last };
});
console.table(Array2);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest

const Array3 = inventors.sort((a, b) => {
    return a.year - b.year;
});
console.table(Array3);

// Array.prototype.reduce()
// 4. How many years did all the inventors live?

const initialValue = 0
const Array4 = inventors.reduce((sum, current) => {
    return sum + current.passed - current.year;
}, initialValue
);
console.log(Array4);

// 5. Sort the inventors by years lived

const Array5 = inventors.sort((a, b) => {
    return (a.passed - a.year) - (b.passed - b.year);
});

const Array5_2 = Array5.map((element) => {
    return { first: element.first, last: element.last, lived: element.passed - element.year};
});
console.table(Array5_2);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// const boulevards_In_Paris = document.querySelectorAll('.mw-category a')
// const links = Array.from(boulevards_In_Paris);
// const Array6 = links.map(a => a.textContent).filter((element) => {
//     return element.includes('de');
// });
// console.table(Array6);

// 7. sort Exercise
// Sort the people alphabetically by last name

const Array7 = people.sort((a, b) => {
    const A = a.split(', ')[1];
    const B = b.split(', ')[1];

    return A > B ? 1 : -1;
});
console.table(Array7);

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

const Array8 = data.reduce(function(allNames, name) {
    if (name in allNames) {
        allNames[name]++;
    } else {
        allNames[name] = 1;
    }
    return allNames;
}, {});

console.table(Array8);
// ------------------------------------------------------------------------





// create a table to display inventors array.
const inventorsTableBody = document.querySelector('.inventorsTable tbody');

inventors.forEach((element) => {
    const tr = document.createElement('tr');
    for (const obj in element) {
        const td = document.createElement('td');
        td.innerHTML = element[obj];
        tr.appendChild(td);
    };

    inventorsTableBody.appendChild(tr);
});




const dogs = [
    { name: 'Snickers', age: 2 },
    { name: 'hugo', age: 8 }
];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('---------- 1. Regular ----------')
console.log('Hello!')

// Interpolated
// Interpolated template literals
console.log('---------- 2. Interpolated ----------')
let testInterpolation = '💩';
console.log('Testing interpolation: %s <-- This should be poop!', testInterpolation);
console.log(`Testing interpolation: ${testInterpolation} <-- This should be poop!`);

// Styled
console.log('---------- 3. Styled ----------')
console.log('This is %c Styling stuff maybe?', 'font-size:1.2em; color: blue;');

// warning!
console.log('---------- 4. warning ----------')
console.warn(`WARNING: This is a warning! You know?`);

// Error :|
console.log('---------- 5. Error ----------')
console.error(`Error: This is an error! You made it?`);

// Info
console.log('---------- 6. Info ----------')
console.info('It is the sixth console method in this subject.');

// Testing
console.log('---------- 7. Testing ----------')
const p = document.querySelector('p');
console.assert(p.classList.contains('expected-class-name'), 'This is not valid!');

// clearing
console.log('---------- 8. clearing ----------')
// console.clear();

// Viewing DOM Elements
console.log('---------- 9. Viewing DOM Elements ----------')
console.log(p);
console.dir(p);

// Grouping together
console.log('---------- 10. Grouping together ----------')
dogs.forEach(dog => {
    console.group(`${dog.name}`);
    console.log(`Dog name: ${dog.name}`);
    console.log(`${dog.name}'s age: ${dog.age} yrs old`);
    console.log(`${dog.name} age (dog years): ${dog.age * 7}`);
    console.groupEnd(`${dog.name}`);
})
console.log('---------- 10.2 Grouping together (groupCollapsed) ----------')
dogs.forEach(dog => {
    console.groupCollapsed(`${dog.name}`);
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.log(`${dog.name} is ${dog.age * 7} dog years old`);
    console.groupEnd(`${dog.name}`);
});

// counting
console.log('---------- 11. counting ----------')
console.count('Woo?');
console.count('Woo?');
console.count('Wuhoo');
console.count('Wuhoo');
console.count('Woo?');
console.count('Wuhoo');
console.count('Woo?');
console.count('Wuhoo');
console.count('Wuhoo');
console.count('Wuhoo');
console.count('Wuhoo');
console.count('Wuhoo');

// timing
console.log('---------- 12. timing ----------')
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
    .then(data => data.json())
    .then(data => {
        console.timeEnd('fetching data');
        console.log(data);

// talbe
console.log('---------- 13. table ----------')
console.table(dogs);
});










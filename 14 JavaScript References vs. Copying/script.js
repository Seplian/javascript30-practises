
// start with strings, numbers and booleans
const str = 'I am a string.';
const num = 42;
const judge = false;
console.log('-----Primitive values-----')
console.log(str, num, judge);
console.log(`string: ${str}; number: ${num}; boolean: ${judge}`);

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const copy_players = players;
console.log('-----Array-----');
console.log('-----reference-----');
console.log(players, copy_players);

// You might think we can just do something like this:

// however what happens when we update that array?
copy_players[2] = 'Jimmy';
console.log(players, copy_players);

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!

// one way
const true_copy1 = players.slice();
true_copy1[0] = '12121212';
console.log('-----copy: slice()-----');
console.log(players, true_copy1);

// or create a new array and concat the old one in
const true_copy2 = [].concat(players);
true_copy2[1] = true;
console.log('-----copy: concat()-----');
console.log(players, true_copy2);

// or use the new ES6 Spread
const true_copy3 = [...players];
true_copy3.push('ES6 spread');
console.log('-----copy: Spread-----');
console.log(players, true_copy3);

// or use the new ES6 Array.from()
const true_copy4 = Array.from(players);
true_copy4.unshift('ES6 Array.from()');
console.log('-----copy: Array.from()-----');
console.log(players, true_copy4);

// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
	name: 'Seplian',
	age: 42
};

// and think we make a copy:
const copy_person = person;
copy_person.hobby = 'magic';
console.log('-----Object-----');
console.log('-----reference-----');
console.log(person, copy_person);

// how do we take a copy instead?
const true_person1 = Object.assign({}, person);
true_person1.profession = 'wander';
console.log('-----copy: assign()-----');
console.log(person, true_person1);

// We will hopefully soon see the object ...spread
const true_person2 = {...person};
true_person2.ideality = 'small goal';
console.log('-----copy: Spread-----');
console.log(person, true_person2);

// Things to note - this is only 1 level deep - both for Arrays and Objects. Lodash library has a cloneDeep method, but you should think twice before using it.

const seplian = {
	name: 'Seplian',
	age: 42,
	social: {
		github: '@Seplian',
		email: 'Seplian@gmail.com'
	}
}

const ref = Object.assign({}, seplian);
const ref2 = Object.assign({}, seplian);

seplian.name = 'Neplian';
ref.age = 101;
console.log('-----shallow copy, deep reference-----')
console.log('-----ref-----')
console.log(seplian, ref);
seplian.social.github = 'You think I have one?';
ref2.social.email = 'none';
console.log('-----ref2_deep-----')
console.log(seplian, ref2);

const seplian2 = {
	name: 'Seplian',
	age: 42,
	social: {
		github: '@Seplian',
		email: 'Seplian@gmail.com'
	}
}

const copy = JSON.parse(JSON.stringify(seplian2));
const copy2 = JSON.parse(JSON.stringify(seplian2));

seplian2.name = 'indescribable';
copy.age = 'very very old';
console.log('-----deep copy-----')
console.log('-----copy-----')
console.log(seplian2, copy);
copy2.social.email = 'confidential';
console.log('-----copy2_deep-----')
console.log(seplian2, copy2);












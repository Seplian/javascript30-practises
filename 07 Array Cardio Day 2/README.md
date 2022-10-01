# Note 07: Array Cardio Day 2

## Subject

Use built-in array methods and perform the necessary operations to provide the expected values.

---

## Thought

Understand the various examples of each array method, with appropriate callback function, the built-in methods are utility and powerful。

---

## CSS tricks

Styleing a from if often arbitrary rather than following fixed criteria， but there are some general rules， See more: [Styling tables](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Styling_tables])

---

## JS recap

1. ### `Array.prototype.some()`

The `some()` method executes the `callbackFn` function once for each element present in the array until it finds the one where callbackFn returns a truthy value (a value that becomes true when converted to a Boolean). If such an element is found, `some()` immediately returns `true`. Otherwise, `some()` returns `false`.

```
// Arrow function
some((element, index, array) => { /* … */ } )

// Inline callback function
some(function(element, index, array) { /* … */ }, thisArg)
```

#### Example: Checking whether a value exists in an array

```
const fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
  return arr.some((arrVal) => val === arrVal);
}

checkAvailability(fruits, 'kela');   // false
```
2. ### `Array.prototype.every()`

The `every()` method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value( [falsy value](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) and [truthy value](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)).

```
// Arrow function
every((element, index, array) => { /* … */ } )

// Inline callback function
every(function(element, index, array) { /* … */ }, thisArg)
```

#### Example: Check if one array is a subset of another array

```
const isSubset = (array1, array2) => array2.every((element) => array1.includes(element));

console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6])); // true
```

3. ### `Array.prototype.find()`

The find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, `undefined` is returned.

```
// Arrow function
find((element, index, array) => { /* … */ } )

// Inline callback function
find(function(element, index, array) { /* … */ }, thisArg)
```

#### Example: Find a prime number in an array

```
function isPrime(element, index, array) {
  let start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
console.log([4, 5, 8, 12].find(isPrime)); // 5
```

4. ### `Array.prototype.findIndex()`

The `findIndex()` method returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, `-1` is returned.

```
// Arrow function
findIndex((element, index, array) => { /* … */ } )

// Inline callback function
findIndex(function(element, index, array) { /* … */ }, thisArg)
```

### More 1: `Array.prototype.splice()`

The `splice()` method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. It returns An array containing the deleted elements.

The `splice() method` is a mutating method. It may change the content of this.

```
splice(start, deleteCount, item1, item2, itemN)
```

#### Example: Remove 1 element at index 2, and insert "trumpet"

```
const myFish = ['angel', 'clown', 'drum', 'sturgeon'];
const removed = myFish.splice(2, 1, 'trumpet');

// myFish is ["angel", "clown", "trumpet", "sturgeon"]
// removed is ["drum"]
```

### More 2: `Array.prototype.slice()`

The `slice()` method returns a [**shallow copy**](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array.

The original array will not be modified.

```
slice(start, end)
```

### More 3: `String.prototype.split()`

The `split()` method takes a pattern and divides a String into an ordered list of substrings by searching for the pattern, puts these substrings into an array, and returns the array.

```
split(separator, limit)
```
#### Returning a limited number of splits

```
const myString = 'Hello World. How are you doing?'
const splits = myString.split(' ', 3) // ["Hello", "World.", "How"]

```

#### Splitting with a RegExp to include parts of the separator in the result

If `separator` is a regular expression that contains capturing parentheses `( )`, matched results are included in the array.

```
const myString = 'Hello 1 word. Sentence number 2.'
const splits = myString.split(/(\d)/)
// [ "Hello ", "1", " word. Sentence number ", "2", "." ]
```







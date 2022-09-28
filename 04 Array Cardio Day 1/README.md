# Note 04: Array Cardio Day 1

## Subject

Use built-in array methods and perform the necessary operations to provide the expected values.

---

## Thought

Understand the various examples of each array method, with appropriate callback function, the built-in methods are utility and powerful。

---

## CSS tricks

Styleing a from if often arbitrary rather than following fixed criteria， but there are some general rules， See more: (Styling tables)[https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Styling_tables]

---

## JS recap

1. ### `Array.prototype.map()`

The `map()` method calls a provided `callbackFn` function once for each element in an array, in order, and constructs a **new array** from the results.

```
// Arrow function
map((element, index, array) => { /* … */ })

// Inline callback function
map(function(element, index, array) { /* … */ }, thisArg)
```

#### Example: Using map to reformat objects in an array

```
const kvArray = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 },
];

const reformattedArray = kvArray.map(({ key, value}) => ({ [key]: value }));
```
2. ### `Array.prototype.filter()`

The `filter()` method calls a provided `callbackFn` function once for each element in an array, and constructs a **new array** of all the values for which callbackFn returns a value that coerces to `true`((Type coercion
)[https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion]). Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.

```
// Arrow function
filter((element, index, array) => { /* … */ } )

// Inline callback function
filter(function(element, index, array) { /* … */ }, thisArg)
```

#### Example: Searching in array

```
function filterItems(arr, query) {
  return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
}
```

3. ### `Array.prototype.sort()`

The `sort()` method sorts the elements of an array (in place)[https://en.wikipedia.org/wiki/In-place_algorithm] and returns the reference to the **same array**, now sorted. The default sort order is ascending.

If `compareFn` is not supplied, all non-undefined array elements are sorted by converting them to strings and comparing strings in *UTF-16 code* units order. All `undefined` elements are sorted to the end of the array.

```
sort(function compareFn(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
})
```

4. ### `Array.prototype.reduce()`

The `reduce()` method takes two arguments: a `callback` function and an optional **initial value**. If an initial value is provided, reduce() calls the "reducer" callback function on each element in the array, in order. If no initial value is provided, reduce() calls the callback function on each element in the array after the first element.

```
// Arrow function
reduce((accumulator, item, index, array) => { /* … */ }, initialValue)

// Inline callback function
reduce(function(accumulator, item, index, array) { /* … */ }, initialValue)
```

#### Example: Counting instances of values in an object

```
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

const countedNames = names.reduce((allNames, name) => {
  const currCount = allNames[name] ?? 0;
  return {
    ...allNames,
    [name]: currCount + 1,
  };
}, {});
```

This example from the MDN documentation feels so ingenious. First create an empty object as the initial value of reduce() method. Then set a const to track the times of occurrences of each instance, which is initialized by the Nullish coalescing operator (???): if the instance has not appeared before, make the const equal to 0; if it does, use the number of previous occurrences.

The most awesome part is the use of `return`, which directly returns an object containing the last return result(allNames), but adds one to the counter(\[name\]) of the instance that appears this time.

#### Example: Grouping objects by a property

```
const people = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 },
];

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

const groupedPeople = groupBy(people, "age");
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
```

### More 1: `Console.table()`

The `console.table()` method displays tabular data as a table. This function takes one mandatory argument `data`, which must be an array or an object, and one additional optional parameter `columns`.

### More 2: Nullish coalescing operator (`??`)

The nullish coalescing operator (`??`) is a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, and otherwise returns its left-hand side operand.

### More 3: Spread syntax (`...`)

Spread syntax can be used when all elements from an object or array need to be included in a new array or object, or should be applied one-by-one in a function call's arguments list.

```
myFunction(a, ...iterableObj, b)
[1, ...iterableObj, '4', 'five', 6]
{ ...obj, key: 'value' }
```











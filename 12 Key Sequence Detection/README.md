# Note 12: Key Sequence Detection

## Subject

We get an external js file that displays random unicorns on the page when you call the `cornify_add()` function. We activate this effect once as an Easter egg every time the user enters the correct secret code.

---

## Thought

1. Listen to the user's keyboard input, save the every input key into an array, when its length is equal to the secret code, convert it to string for matching. If it is correct, trigger the Easter egg; if it is wrong, delete the first element for the next input.

---

## JS recap

### `Array.prototype.push()`

Return value of this method is the new length property of the object upon which the method was called.

**Note**: Neither a new array nor the modified old array! Just the length! So does `Array.prototype.unshift()`

### `Array.prototype.join()`

The `join()` method creates and returns a new string by concatenating all of the elements in an array, separated by a specified separator string.

---

## Original Tutorial

### JS

#### `Array.prototype.splice()` & `Array.prototype.includes()`

I used an `if` condition to check the length of the input array, `shift()` to remove the first element when it has too long, and the basic Strict equality (`===`) to compare if it matches the secret code. The original tutorial uses the more flexible `splice()` to control the length of the array, and the `includes()` method is chosen for comparison.

```
inputContent.splice(-password.length - 1, inputContent.length - password.length);
# splice(start, deleteCount), If start is negative, it will begin that many elements from the end of the array.
```






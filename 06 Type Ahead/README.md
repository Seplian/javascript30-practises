# Note 06: Type Ahead

## Subject

Retrieve data from the remote server, match it with the user input, and display the associated data in real time.

### What is Typeahead?

Typeahead - also known as autocomplete or autosuggest - is a language prediction tool that many search interfaces use to provide suggestions for users as they type in a query.

---

## Thought

1. The json file in the remote server database can be retrieved using `fetch()` and converted into an object(array).

2. Apply the `filter()` method and with the provided matching test function to iterate over each item in the fetched array and return all matching items. The specific match function reads the input value and uses `string.match()` to compare it with the city and state data.

3. Sort the matching data according to the population in descending order, a simple `sort()` method can nail it.

4. Declare a constant equal to a \<span\> element wrapped around the search content, giving it a class to highlight. Iterate through the matching data, replacing all the matching search content in the matching data(city and state) with the this constant.

5. Write the replaced city, replaced state and population data into the innerHTML of a new \<li\> element, append this \<li\> to \<ul\> in order to display it under the search box.

6. Attach `input` event listener to the input box to activate the above search, sorting and display functions in real time when the user enters the search content.

---

## Issues

### `Array.sort()` applying on numbers

If `compareFn` is not supplied, all non-`undefined` array elements are sorted by converting them to strings and comparing strings in UTF-16 code units order. In a numeric sort, 9 comes before 80, but because numbers are converted to strings, "80" comes before "9" in the Unicode order.

Therefore, to compare two numbers in size instead of string unicode order, either return the difference within ·compareFn· with a minus b (instead of comparing with operators), or use `Number()` to force a and b to numbers before comparing.

### Regular expressions with flags

At first I used `toLowerCase()` to ignore case sensitivity for the match test, but this method was very complicated and almost impossible for replacement, so I chose the **flags** feature of regular expressions for advanced search and replacement.

```
# To include a flag with the regular expression

const re = /pattern/flags;

const re = new RegExp('pattern', 'flags');

```

#### `i` flag

The i flag indicates that case should be ignored while attempting a match in a string.

#### `g` flag

The `g` flag indicates that the regular expression should be tested against all possible matches in a string.

A string pattern will only be replaced once with `replace()`. To perform a global search and replace, use a regular expression with the `g` flag, or use replaceAll() instead.

**Note**: `String.replace()` with `g` flag, or `String.replaceAll()` without `g` flag. Don't make a mistake!

### display result has no spacing?

After using case-insensitive and global matching regular expressions, the problem of search matching and replacing can be solved perfectly, but the final display result always ignores all spaces, including spaces in the search content, and format spaces added with teamplate literals .

At first I thought there was something wrong with my regular expressions. After building a specific test html file, I realized that the problem comes up with the CSS code of the \<li\> element: in order to make the content whthin \<li\> stick to the left edge, I set `display: flex;` and `justify-content: flex-start` property to force all childNodes of \<li\> to move to the left.

Wrapping a \<span\> element around the contents (the replaced city and state) inside the \<li\> element will solve the problem.

---

## CSS tricks

### `transform: skew()`

In order to build an isosceles trapezoidal li element border, I have imagined a variety of methods, I believe the most reliable method is to use the trasform function to deform, but after testing many approaches are not very well.

Finally I applied a relatively complex method, adding a ::before pseudo element to the left of the li element, making it 0 wide and the same height as the li element, with a large border thickness, and using the transform: skew() method to stretch the upper left corner to the left; the right side is the same, except this time it is an after pseudo element and stretched to the right.

**Note**: use `position: absolute` to adjust the position and set the `z-index` of a negative value to prevent obscuring the \<li\> element itself.

### `:nth-child()`

Use `odd` and `even` parameters to alternately select elements to create alternating CSS effects.

### `justify-content: space-between`

Distribute items evenly. The first item is flush with the start, the last is flush with the end.

In our implementation, we use this property to make the textual content (city and state) and the numerical content (population) of the search results, separated on both sides of the list.

---

## JS recap

### `Element.innerHTML`

The `innerHTML` property returns the text content of the element, including all spacing and inner HTML tags. So unlike `textContent`, where only text content can be added, we can use innerHtml to attach html elements.



---

## Original Tutorial

### CSS

####  Create trapezoidal border elements using the `transform` function

`transform: rotateX(3deg)`

Rotates an element around the abscissa (horizontal axis) without deforming it. In this example, it is equivalent to rotating around the x-axis to bring the upper border of the element closer to us.

`transform: perspective(100px)`

Set the distance between the user and the z=0 plane. Because the upper border of the element is closer to us in the previous step, when increasing the value of this property, the upper border expands more and looks as if it is stretched.

### JS

#### Adding Commas(,) to a Number every three digits with Lookaround

```
number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
```

This regular expression is a bit hard to understand, with the explanation of **lookaround** in this book \<Mastering Regular Expressions\>, this assertion matches the position of the gap between words? Not a character. Then `\B` is used to ensure that there must be a number to the left of this position rather than a boundary.

But I still don't understand the role of `(?!\d)` here. I need to study it later, just record the relevant documentation content.

Here is some testing:

```
(123456789).toString().replace(/\B(?=(\d{3})+(?!\d))/, ',')
# '123,456789'
```

```
(123456789).toString().replace(/(?=(\d{3})+(?!\d))/g, ',');
# ',123,456,789'
(123456789).toString().replace(/(?=(\d{3})+(?!\d))/, ',');
# ',123456789'
```

```
(123456789).toString().replace(/\B(?=(\d{3})+)/g, ',');
# '1,2,3,4,5,6,789'
(123456789).toString().replace(/\B(?=(\d{3})+)/, ',');
# '1,23456789'
```

```
(123456789).toString().match(/\B(?=(\d{3})+(?!\d))/g);
# ['', '']
(123456789).toString().match(/\B(?=(\d{3})+)/g);
# ['', '', '', '', '', '']
```

##### `\B`

Matches a non-word boundary. This is a position where the previous and next character are of the same type: Either both must be words, or both must be non-words, for example between two letters or between two spaces.

##### `x(?=y)`

Lookahead assertion: Matches "x" only if "x" is followed by "y".

#### `x(?!y)`

Negative lookahead assertion: Matches "x" only if "x" is not followed by "y".

#### `\d`

Matches any digit (Arabic numeral).

#### `x{n}`

Where "n" is a positive integer, matches exactly "n" occurrences of the preceding item "x".

#### `x+`

Matches the preceding item "x" 1 or more times.



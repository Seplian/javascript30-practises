# Note 10: Hold Shift and Check Checkboxes

## Subject

Given a form with many checkboxes, when shift is holding down and click on the checkbox, all options between the last selection and the current selection will be selected.

---

## Thought

1. To avoid adding an event listener inside the event listener, we use a global variable `keydownShift` with a default value of `false` to check whether the shift key is pressed or not. Attach an event listener to the window which will set the `keydownShift` to `true` when the shift is pressed and reset to `false` when it is released.

2. When you hold shift to check multiple items , at least two checkboxes are already checked (including the one being clicked this time), so we use a `checkedCount` variable to track the number of checkboxes that have been checked.

3. Then, we iterate through all input checkboxes, attach event listener for them, listen to `input` event, and call the multi-select function to select multiple items when both `keydownShift` and `checkedCount` meet the conditions.

4. The input checkbox selected with `querySelectorAll()` is actually an array, so we can use the index to identify which item is selected. Thus, an array is created to record the index of the last two clicked checkboxes, and when the multi-select function is called, the checkboxes between the two indexes are selected.

5. At the end of the event listener, iterate through the checkbox: if it is checked, add a class to its adjacent sibling \<p\> element to display the strikethrough effect; if it is not checked, remove the class.

---

## Issues

1. In the original tutorial, the entire checkbox is traversed and a logical or operation is used to check whether the current checkbox is between the two already selected checkboxes. All items between two selected checkboxes can be marked precisely by a awesome logical negation operation.

```
if (checkbox === this || checkbox === lastChecked) {
	inBetween = !inBetween;
}
```

2. But just keeping track of the last clicked target and treating click selection and click cancellation equally, which will causes that clicking to unselect an item also makes an multi-selection.

3. guahsu solves the above problem by distinguishing three cases: click, multiple select, and multiple cancel, and by using different functions for different cases. At the same time, his method not only allows multiple selections, but also multiple cancellations.

```
if (e.shiftKey && this.checked) {
    selectClick = this;
    selectBox();
} else if (e.shiftKey && !this.checked) {
    cancelClick = this;
    cancleBox();
} else if (this.checked) {
    click = this;
    selectClick = undefined;
    cancelClick = undefined;
} else {
    click = undefined;
    selectClick = undefined;
    cancelClick = undefined;
}
```

4. This implementation, however, also has certain problems: if you click 1 to select, click 2 to select, and then click 1 to cancel, then all subsequent multi-select operations with shift held down will fail.

5. My idea is to introduce an array that records the index of the clicked checkbox. When the checkbox is clicked to select, add its index to the array, and when the checkbox is clicked to cancel, remove its index from the array that was added before. Therefore when the checkbox condition is satisfied, the last two items in the array must be the upper and lower bounds of the multiple checkboxes.

6. My method also has problems because deselecting the checkbox removes its information from the index array, so it is not possible to do multiple deselections in the opposite way. I haven't thought of a good solution yet.

---

## HTML essential

### checked attribute V.S. checked IDL attribute

The content attribute is the attribute as you set it from the content (the HTML code) and you can set it or get it via `element.setAttribute()` or `element.getAttribute()`.

The IDL attribute is also known as a JavaScript property. These are the attributes you can read or set using JavaScript properties like `element.foo`.

The `checked` attrubite of checkbox indicates that the checkbox is checked by default (when the page loads). It **does not** indicate whether this checkbox is currently checked: if the checkbox's state is changed, this content attribute **does not** reflect the change.

The `checkbox.checked` IDL attribute, more like a JavaScript property, indicates the current state of a checkbox; it also reflect when the state is changed.

---

## CSS tricks

### `text-decoration`

The text-decoration-line CSS property sets the kind of decoration that is used on text in an element, such as an underline or overline.

- underline

Each line of text has a decorative line beneath it.

- overline

Each line of text has a decorative line above it.

- line-through

Each line of text has a decorative line going through its middle.

---

## JS recap

### HTMLElement: change event

The `change` event is fired for \<input\>, \<select\>, and \<textarea\> elements when the user modifies the element's value. Unlike the `input` event, the change event is not necessarily fired for each alteration to an element's value.

For a text-like type of input element, the `change` event fires when the element loses focus after its value was changed. But the `input` event fires when the value has been changed.

### `Element.nextElementSibling`

The `Element.nextElementSibling` read-only property returns the element immediately following the specified one in its parent's children list, or `null` if the specified element is the last one in the list.

### `Array.prototype.at()`

The `at()` method takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.

```
array.at(-1)
array[array.length-1]
```

### `Math.max()`

The `Math.max()` function returns the largest of the numbers given as input parameters, or `Infinity` if there are no parameters.

---

## Original Tutorial

### JS

#### `KeyboardEvent.shiftKey`

The `KeyboardEvent.shiftKey` read-only property is a boolean value that indicates if the `shift` key was pressed (true) or not (false) when the event occurred.






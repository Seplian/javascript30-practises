# Note 01: JavaScript Drum Kit

## Subject

When the user clicks on a button by mouse or presses a key by keyboard that matches the name of the key displayed on the page, a corresponding sound clip will be played and the button will display a visual highlighting effect.

---

## Thought

1. For each drum kit, we use a container to wrap two elements, the first one holds the key information and the second one saves the drum name.

2. Since there are two types of operations: `click` and `keypress`, we add two event listener to handle them separately, here we use "mousedown" and "keydown" instead, for dealing with other issues later.

3. For each key and drum container, the same event listener needs to be added, so we use `querySelectorAll()` to select all of them and then iterate through them with the `forEach()` function.

4. In the event listener, perform following process:
	- Add the class name `active` to the container to display zoom in and color change effects.
	- Call the `playDrum` function.
	- Add `mouseup` and `keyup` evant listener to remove the `active` class name for the container.

5. The `playADrum` function takes one argument, i.e. the container that was clicked (or the container contains the same key name as the key pressed). According to the second element in the container - the saved key name - we can assemble the sound address by template literals and play it.

---

## CSS tricks

1. `background-image: url('')` together with `background-color()` has no effect, image covers the color layout directly. A smart way to make a semi-transparent background is using `background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('');`

2. The default height of html and body element is `0`. If you adding some content, their height will be expanded to accommodate all. A common case is:
```
html{
  height: 100%;
}
body {
  min-height: 100%;
}
```
For a responsive full page height, set it like this:
```
body {
	min-height: 100vh;
}
```

3. The best way for single row layout, of course, is the `flex`.

---

## JS recap

1. `Element.querySelector` is not only could be used on document, but also on other elements.

2. `e.key` can obtain the key name when you add an `keydown` event listener.

3. To play a audio, use `new Audio(url)` to implement an instance, then call the `play()` method.

4. Don't forget `forEach()` method is the best way to execute a function for each array element. Meanwhile， `querySelectorALl()` returns an array.

---

## Original Tutorial

### HTML

1. HTML `data-*` attributes allow us to store custom data.

---

### CSS

1. `transform: scale(1.1)` is a great way in practice to create an instant zoom in effect when clicking an element, with a very transitory `transition` property.

---

### JS

1. We can use the `transitionend` event to detect that an animation has finished running.

2. My approach is include an down event listener in another up event listener to add and remove the `active` class name. This may call the function repeatedly and the trigger time between the two listeners is difficult to control. So it seems better to use `transitionend` event listener here.

3. `audio.currentTime = 0;` can end audio play immediately, convenient for multiple triggers.

4. The Document method `querySelectorAll()` returns a static **NodeList**, which is not a array, withoud any `array.prototype` method. A common idea is converting it to an standard array by `Array.from()`, which creates a new, shallow-copied Array instance from an iterable or array-like object.



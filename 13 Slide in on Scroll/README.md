# Note 13: Slide in on Scroll

## Subject

Scroll the window to trigger the effect of sliding the image in when scrolling to a specific position.

---

## Thought

1. Add a class to the image when the conditions are met, changing the x-axis position and opacity to create a move-in effect.

2. I set the condition to add the class when 20% of the image enters the current viewport, and remove the class when 80% of the image leaves the viewport.

3. The functions of the judgment and toggle class are bound to the window's `scroll` event, which determines whether to trigger the animation during the window scrolling process.

4. According to the documentation, the `scroll` event may be triggered too often, causing performance problems. The original tutorial provides a function that sets a delay to reduce its triggering rate.

---

## CSS tricks

### `opacity`

The `opacity` CSS property sets the opacity of an element. Opacity is the degree to which content behind an element is hidden, and is the opposite of transparency.

---

## JS recap

### `Element.getBoundingClientRect()`

The `Element.getBoundingClientRect()` method returns a `DOMRect` object providing information about the size of an element and its position relative to the **viewport**.

#### `DOMRectReadOnly.top`

The `top` read-only property of the DOMRectReadOnly interface returns the top coordinate value of the `DOMRect`. (Has the same value as `y`, or `y + height` if height is negative.)

### `Window.innerHeight`

The read-only `innerHeight` property of the Window interface returns the interior height of the window in pixels, including the height of the horizontal scroll bar, if present.

---

## Original Tutorial

The position coordinates used in the tutorial are based on the entire document rather than the viewport.

```
// The viewport is already over half the height of the image

window.scrollY + window.innerHeight - sliderImage.height/2 > sliderImage.offsetTop;

// Vertical scrolling is not yet beyond the bottom of the image

window.scrollY < sliderImage.offsetTop + sliderImage.height;
```

### JS

#### `Window.scrollY`

The read-only `scrollY` property of the Window interface returns the number of pixels that the document is currently scrolled vertically.

#### `HTMLElement.offsetTop`

The `HTMLElement.offsetTop` read-only property returns the distance of the outer border of the current element relative to the inner border of the top of the `offsetParent`, the closest positioned ancestor element.

#### `HTMLElement.offsetParent`

The `HTMLElement.offsetParent` read-only property returns a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element.

If there is no positioned ancestor element, the `body` is returned.

**Note**: In our example, the parent element is the `body`.

## More

### Debounce Function

```
// Returns a function, that, as long as it continues to be invoked, will not be triggered. The function will be called after it stops being called for N milliseconds. If `immediate` is passed, trigger the function on the
leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

```








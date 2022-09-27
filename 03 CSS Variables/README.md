# Note 03: CSS Variables

## Subject

An image is displayed on a web page and the user can manipulate the image's filters through a form to adjust the border thickness, blur and grayscale filter values, and border color.

---

## Thought

1. The top is a set of user-adjustable form values, the bottom is the displayed image, and the layout is determined by the `grid` property.

2. Wrap the `label` and `input` element to make it easier to adjust the relative position with `flex` layout.

3. Add `var` functions and **CSS variables** for the properties that can to be adjusted by user.

4. Add event listener to `input` element to monitor value changes and update CSS variables values instantly.

---

## CSS tricks

### CSS custom properties (variables)

1. We can declare custom properties(CSS variables) to reused it throught a document, e.g. `--my-color:black;` (CSS variables name is case sensitive). CSS variables are accessed using the `var` function, e.g. `color: var(--my-color);`

2. A common best practice is to define custom properties on the `:root` pseudo-class, so that it can be applied globally across your HTML document:
```
:root {
  --main-bg-color: brown;
}
```

3. Using the `var()` function, we can define multiple fallback values when the given variable is not yet defined:
```
color: var(--my-color, red);
```

### `filter`

The filter CSS property applies graphical effects like blur or color shift to an element. Filters are commonly used to adjust the rendering of images, backgrounds, and borders.

#### `blur(radius)`

A CSS function applies a Gaussian blur to the input image. The only parameter is the radius of the blur, specified as a \<length\>, which defines how many pixels on the screen blend into each other.

#### `grayscale(amount)`

A CSS function converts the input image to grayscale. The only parameter is the amount of the conversion, specified as a \<number\> or a \<percentage\>. A value of `100%` is completely grayscale, while a value of `0%` leaves the input unchanged.

#### More

See (MDN References: \<filter-function\>)[https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function]

---

## JS recap

### Custom CSS properties

1. Get variable from inline style:
```
element.style.getPropertyValue("--my-var");
```

2. Set variable on inline style
```
element.style.setProperty("--my-var", `${--my-var}px`);
```

### HTMLElement: input event V.S. change event

The `input` event is fired every time the value of the element changes. This is unlike the `change` event, which only fires when the value is committed, such as by pressing the enter key, selecting a value from a list of options, and the like.

---

## Original Tutorial

### JS

1. Instead of `input` event, Using two other event: `change` and `mousemove`, which seem to perform in similar way.

2. Store the suffix(`px`, `%`) in the `data-*` attributes of `input` element, then the CSS varibles like `blur` and `border-width`, which value need measurement to be valid, can be assembled using template literals. This way is more brief and flexible:
```
function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
```



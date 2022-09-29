# Note 05: Flex Panel Gallery

## Subject

Create an image display gallery site. When a panel is clicked, plays an expand animation, displays the full text(extra two hidden texts) and enlarges it.

---

## Thought

1. The main part of the site consists of five panels, which aligns by flexbox layout model.

2. At first I intented to build a pure CSS implementation to avoid js loading issues. So I chose to `:active` pseudo class to select the clicked panel, but this only took effect for the moment of the click; later I switched to `:focus-within`, but this method required additional `tabindex` attribute for the panel, which also seemed inappropriate. Finally, I decided to toggle class attribute with JavaScript.

3. Use `flex-flow` to make the clicked panel get a larger width, and the animation effect is built by the `transition` property. Here we apply **cubic-bezier** to adjust the animation speed to match our desired effect.

4. Two hidden text paragraphs are placed outside the viewport with `position: absolute` and a big `top` property value. When the panel was  clicked, reset the `top` property value to move them into the viewport.

---

## CSS tricks

### `flex-grow`

This property specifies how much of the remaining space in the flex container should be assigned to the item (the flex grow factor).

Note: it is set to the flex items, not the flex containter.

```
/* Three values: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```

### `::after` pseudo-element

It can be used to create semi-transparent black masks to make images more harmonious when displayed together. This is more flexible than adding multiple background.

### transition-timing-function

We want the clicked panel shrink a little before expanding (and similarly, open a little before closing), as if it is accumulate strength for the subsequent expansion, which generates a more vivid animation effect.

In order to do this, we need to select the appropriate transition-timing-function, we can view the animation effect in real time and confirm the required parameters [in this site](https://cubic-bezier.com/)

### `overflow: hidden;`

For an `position: absolute` element, using a negative `top` value will hide it outside of the upper bound of the viewport, but for the lower bound,  a very large `top` value may not perform well in the same way, but rather stretch the page extremely long.

Then `overflow: hidden;` will be helpful here, as long as we set the height of the container, then the overflow content will be automatically hidden and will not affect the height of our page.

### `transition-delay`

This property specifies the duration to wait before starting a property's transition effect when its value changes.

```
/* property name | duration | easing function | delay */
transition: margin-right 4s ease-in-out 1s;
```

---

## JS recap

### `classList.toggle()`

Selecting the clicked panel is rather simple, we just iterate through the panels and attach the click event listener for all of them, track the class attribute by `classlist`. Since it involves state switch, we use `toggle` instead of `add` and `remove`.

### `Array.from()` and `includes()`;

In the ideal case, clicking on a panel not only expands it, but also restores the other expanded panel, ensuring that the user remains focused on the current panel.

There are two two situations here：

1. when the clicked panel is already expanded, clicking it again should switch its class without any additional action.

2. When the clicked panel is still in its original state, then you should first iterate through all panels to remove the `active` class value, and then switch its class.

Obviously, we can use an `if` judgment to determine the state of the clicked panel. Note that `querrySelectorAll()` returns a NodeList, which has to be converted to a normal array using Array.from() to take advantage of the methods of Array, such as `includes()`.

---

## Original Tutorial

### CSS

####  `flex-direction: column;`

This setting aligns the items in the flex container vertically, with a significant benefit of being able to use `flex: 1 0 auto;` to vertically split the items equally.

#### \<p\> element as flex container

The \<p\> element is a block by default, so when we put three \<p\> elements in a flex container panel, using `justify-content` and `align-items` only affects the position of the \<p\> element itself, not its text content. While we can set `text-align: center` to center our text horizontally, we can't do anything about it vertically.

So, we can make the \<p\> element itself as a flex container with `jusify-content: center` and `align-items: center` to completely center the text.

#### `transform: translateY()`

The `translate()` function can move the position of an element, which is not very intuitive in layout, but works very well with `transition` to create move-in and move-out animations.

```
.panel p:first-child { transform: translateY(-100%); }
.panel.active p:first-child { transform: translateY(0); }
.panel p:last-child { transform: translateY(100%); }
.panel.active p:last-child { transform: translateY(0); }
```

### JS

1. Instead of `input` event, Using two other event: `change` and `mousemove`, which seem to perform in similar way.

2. Store the suffix(`px`, `%`) in the `data-*` attributes of `input` element, then the CSS varibles like `blur` and `border-width`, which value need measurement to be valid, can be assembled using template literals. We can obtain the `data-*` attribute by `dataset.*` function, which is equal to `getAttribute()`. This way is more brief and flexible:
```
function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
```



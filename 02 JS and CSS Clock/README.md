# Note 02: JS and CSS Clock

## Subject

Creating a web page with an analog clock displays current time.

---

## Thought

1. `canvas` element is convenient to draw everything about the clock.

2. Use the `requestAnimatinFrame()` function to create an animation that dynamically displays the clock three hands.

3. Draw hour marks and minite marks by `for` loop with the `rotate()` method.

4. Similarly, use `rotate()` to determine the angle of the hands, bearing in mind that the position of the hour hand should plus with the minutes and seconds in the ratio of the whole hour and the whole minute, and the same for the minute hand.

5. Before each rotation, save the canvas state with `save()` method in order to recover it later.

---

## CSS tricks

When i have a no-repeat gradient background working with an image background setting on body element, it doesn't fill all the page.

Here are some solutions:

1. `body {min-height: 100%}` without setting html height

2. `background-attachment: fixed;` to fix entire background

3. `body {height: 80vh}` to restrain body height

3. set background inside html element and `html {min-height: 100%}`

---

## JS recap

### Date object

Creating a new Date object, then you can easily get local date and time. There are many useful methods, such as `Date.prototype.getHours()`, `Date.prototype.getDate()`.

### canvas state

The `content.save()` and `content.restore()` pairs are a kind of **stack structure**:
- `context.save()` pushes the current state onto the stack;
- `context.restore()` pops the top state on the stack, restoring the context to that state.

### setInterval() V.S. requestAnimationFrame()

At first I planned to use setInterval() to update the image of the hands, drawing it once per second, because I thought it would be simpler and more economical. However, after some testing, I found that there would be a bit lag in the first one second of page loading, resulting in the whole effect would not be smooth enough, so I decided to go back to requestAnimationFrame().

### rectangle V.S. ellipse

The early hands drew as very thin rectangles, which were later changed to a right half of an extremely flat ellipses. Note that `context.ellipse()` method, like `context.arc()`, adds a shape to the sub-path, which needs to be filled with the `fill()` method, so before next drawing, you must empty the list of sub-paths with `begintPath()`. If not, the rotated path will lead to some very strange shapes.

---

## Original Tutorial

### HTML

1. The HTML file has 3 `div` elements which correspond with the second, minute, and hour hand on a clock.

---

### CSS

#### `transform-origin`

The CSS property sets the origin for an element's transformations.

#### `transform: rotate();`

This CSS function defines a transformation that rotates an element around a fixed point on the 2D plane, without deforming it.

#### `transition-timing-function`

The CSS property sets how intermediate values are calculated for CSS properties being affected by a transition effect. Often used with cubic-bezier(p1, p2, p3, p4). This creates an animation effect of the second hand jittering and bouncing back, which performs great.

---

### JS

As we discussed above, setInterval() causes a little delay at the beginning, which doesn't work very well.
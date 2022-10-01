# Note 08: Fun with HTML5 Canvas

## Subject

Build a canvas, click + drag mouse to draw lines on it, the color and thickness of the lines will gradually change.

---

## Thought

1. Create three event listener, `mousedown` to determine the start of drawing, `mouseover` to draw lines, `mouseup` to stop drawing.

2. The `mousedown` event listener retrieves the coordinates of the mouse click position as the starting point of the line. In addition, set the draw start variable(`isDraw`) to `true`.

3. The `mouseover` event listener checks the drawing start variable(`isDraw`), if it is `true`, call the `draw()` function.

4. The `mouseup` event listener sets the drawing start variable(`isDraw`) to `false` and ends the drawing.

5. When initializing, choose a random hue, a random lineWidth, and a random direction of increase or decrease of the lineWidth.

6. In the `draw()` function:

- Set the values of hue and lineWidth and draw the lines.

- Increase hue gradually and reset the value of hue to 0 when the boundary condition is reached。

- Increment or decrement lineWidth according to the increment/decrement direction, and reverse the increment/decrement direction when it reaches the boundary.

---

## Issues

In the beginning, I used a completely random color and line thickness, which resulted in that lines changed very quickly and looked like a bunch of rectangles heaped together, with poor results.

I guess it's because the value is changing too fast, so I added a `setInterval()` function to control the speed, and things improved, but it's a drop in the bucket.

Then I tested changing the lines to circles and it looked just fine, but apparently it was different from what should to accomplish in the course.

I carefully examined other people's demo again, and I felt that the color and thickness of the drawn lines changed smoothly, maybe they were incremented with `i++`? I tested this approach and it works well.

At first, I used to take random values when mouse clicked, when increment reached the boundary, new value was randomly selected. But hue tends to keep the same color scheme, which does not look very good. And lineWidth appears unnatural because of the sudden change, it seems that hue and lineWidth must gradually increase and decrease, it is better not to randomly jump to a certain value when starting to draw.

**Note**: `mouseup` event should be added on `window` instead of `canvas` to avoid not being able to catch the event.

---

## CSS tricks

### HSL Colors

HSL stands for hue, saturation, and lightness - and represents a cylindrical-coordinate representation of colors.

```
hsl(hue, saturation, lightness)
```

Hue is a degree on the color wheel (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue. Saturation is a percentage value; 0% means a shade of gray and 100% is the full color. Lightness is also a percentage; 0% is black, 100% is white.

---

## JS recap

1. ### isDraw

Setting an `isDraw` variable that stores a boolean value is a great way to activate and deactivate a function. Onlu call the function when isDraw is `true`.

```
mousedown => isDraw = true;
mouseover => if isDraw {call function};
mouseup => isDraw = false;
```

2. ### `MouseEvent.offsetX` & `MouseEvent.offsetY`

A read-only property provides the offset in the X coordinate or Y coordinate of the mouse pointer between that event and the padding edge of the **target node**.

#### `MouseEvent.clientX` or `MouseEvent.x`

A read-only property provides the horizontal coordinate within the application's viewport at which the event occurred (as opposed to the coordinate within the page).

3. ### `Math.random()`

The Math.random() function returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1, with approximately uniform distribution over that range.

#### a random intager between min (included) and max (excluded)

```
Math.floor( Math.random() * (max - min) ) + min;
```

#### a random integer between min (excluded) and max (included)

```
Math.ceil( Math.random() * (max - min) ) + min;
```
#### a random integer between min and max (both included):

```
Math.round( Math.random() * (max - min) ) + min;
or
Math.floor( Math.random() * (max - min + 1) ) + min;
```

### pick a random element from array

```
Array[Math.floor((Math.random()*Array.length))]
```

4. ### canvas

#### `ctx.beginPath()`

Starts a new path by emptying the list of sub-paths.

#### `ctx.moveTo()`

Begins a new sub-path at the point specified by the given (x, y) coordinates.

#### `ctx.lineTo()`

Adds a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates.

#### `ctx.closePath()`

Attempts to add a straight line from the current point to the start of the current sub-path. If the shape has already been closed or has only one point, this function does nothing.

#### `ctx.lineCap`

Determines the shape used to draw the end points of lines.

- `butt`
The ends of lines are squared off at the endpoints. Default value.

- `round`
The ends of lines are rounded.

- `square`
The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.

#### `ctx.lineJoin`

Determines the shape used to join two line segments where they meet.

- `round`
Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint of connected segments. The radius for these rounded corners is equal to the line width.

- `bevel`
Fills an additional triangular area between the common endpoint of connected segments, and the separate outside rectangular corners of each segment.

- `miter`
Connected segments are joined by extending their outside edges to connect at a single point, with the effect of filling an additional lozenge-shaped area. This setting is affected by the miterLimit property. Default value.

![lineJoin example image](images/canvas_linejoin.png)

---

## Original Tutorial

### JS

#### Conditional (ternary) operator

This operator is frequently used as an alternative to an if...else statement.

```
condition ? exprIfTrue : exprIfFalse
```

#### increaseLineWidth

When the boundary condition is reached, the simple way to reverse the direction of increase or decrease is to make it equal to its negation.

```
direction = !direction
```

#### Handle a group of items by array & object

It feels good to store a set of items that need to be handled in an array, then you can apply various methods of the array to make the code more concise and efficient.

```
// An object with key/value pairs corresponding with the name of the action
// and the function we want to for that action
const quick = {
  add: () => myCanvas.addEventListener('mousemove', quickDraw),
  rem: () => myCanvas.removeEventListener('mousemove', quickDraw)
}

// Array of event + eventHandler objects to iterate over and use as arguments for adding event listeners to myCanvas
const evs = [
  {e: 'mousemove', h: setMouseLocation},
  {e: 'mousedown', h: quick.add},
  {e: 'mouseup', h: quick.rem},
  {e: 'mouseout', h: quick.rem}
];

// Attach event listeners
evs.forEach(({e, h}) => { myCanvas.addEventListener(e, h); });
```

Note: an implement for Nitish




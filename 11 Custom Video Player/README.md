# Note 11: Custom Video Player

## Subject

Custom a video controls, including fast rewind, fast forward 10 seconds, play, pause, video speed adjustment, volume adjustment, full screen and skippable progress bar.

---

## Thought

1. The whole controls is usually hidden and only a very narrow progress bar is displayed; when the mouse is moved over the player, the controls pops up to display. This function is easy to implement, just listen to the `mouseenter` and `mouseleave` event to toggle a hover class for the player.

2. The top half of the controls is the progress bar, the bottom half is different click-triggered functions and timers.

3. The play button and volume button will change to the corresponding icons when the state switches.

4. The playback speed and volume adjustment bar will pop up when the mouse moves over the relevant buttons.

---

## Issues

### Hover evoked controls

Initially, `display: none` was used to toggle the display of controls, but this resulted in that is is  impossible to display a narrow progress bar under the video alone in a non-hover state; so it was later switched to `overflow: hidden`, which toggles the display by changing the height of the controls. The problem with this approach was that the two range bars (playback speed and volume) that overflow the height of controls were also not displayed.

After that, I chose to add an `overflow: visible` rule to the hover state, which solved the problem. The new issue is that when I create a `transition` effect for controls, it will first show outside the video box and then move up, which is very strange.

Finally I made a complicated solution: when hovering the controls, don't apply the `overflow: visible` rule; until the mouse moves to show the two hidden range bar, I give the player an extra class to change its `overflow` property to `visible`, and delete the extra class when the mouse leaves away. It's a bit tedious, but the issue is fixed.

After the project was finished, I took a look at the original tutorial's approach: it was to set `overflow: hidden` rule to player, not controls, and use `transformY()` to handle the Y-axis position of controls. This way, since the speed and volume bars pop upwards, they won't be hidden for too long when popping up, and there's no need to add a new class to the player. It is indeed better.

### Hover evoked range bars

The speed and volume adjustment buttons are placed to the right of the controls, so it is a bit unreasonable to expand them horizontally, which will push the icon to the left, so we choose to expand the speed and volume bars upwards.

Clicking to expand the operation is a bit tedious, so I chose to use hover to expand it, which creates a problem: because the bar is hovering above the icon by some distance, the bar will close in the process of mouse leaving the icon to the bar because the hover state cancels.

My method is to put a transparent `::before` pseudo element above the icon, and let it connect the icon and the bar. So far it works well, but there are two small problems:

- the bar is a little narrow, the mouse may leave it to make it disappear during the mouse movement. I can only try to make it more wider.

- after adding the function that clicking on the sound icon will mute the video, clicking on the invisible `::before` pseudo element and range bar will also mute the video. So I put a `div` container outside, took the range bar out of the button to become a sibling ralationship, let the `::before` pseudo element wrapped around the range bar, therefore the range bar would not disappear until mouse left the container.

### Built-in full-screen controls

After entering fullscreen, it will automatically call the browser's built-in controls, which will produce a bug: because we also made the controls for play/pause by clicking on the player, so one click will actually trigger twice, which means it can't be paused. I don't know if we can make our own fullscreen controls, I have not thought of a good solution yet.

---

## CSS tricks

### Google Material Icons / Material Symbols

It's more difficult to handle icons as images. Whether adjusting the color or determining the position, may encounter unexpected situations. So if you want to have a simple icon as the content of the button to indicate the user, a better choice is to use a font similar to the icon.

I searched for some related fonts and found one that works well: Google Material Icons / Material Symbols.

[Material Design icons Github repository](https://github.com/google/material-design-icons)

[Material Icons Guide](https://developers.google.com/fonts/docs/material_icons?hl=en)

[Material Icons Library](https://fonts.google.com/icons/)

All icons are packed in one font file, just import it with `@font-face` and add a small snippet of CSS rules to rendering. You can also simply import the official external CSS file.

It is quite convenience to render an icon glyph by using its textual name.

```
<span class="material-icons">face</span>
```

### `overflow: hidden;`

Content is clipped if necessary to fit the padding box.

This CSS property is more useful than I thought. `display: none` directly turns of the element and its descendants; `visibility: hidden` can set different values for every descendants, but it is only a visual effect.

`overflow: hidden` is very flexible and can be partially or fully obscured or unobscured with the position property which is very easy to control with JavaScript code, and it is also convenience to make `transition` animation.

### `linear-gradient()`

Previously, I have used two \<div\> elements to create a progress bar, and the video progress ratio corresponds to the width of the child element.

This time I choose to use only one element to implement the progress by using two colors of linear-gradient background, and adjust the position ratio of the two colors through CSS custom properties to reflect to the playing progress ratio.

```
// CSS
background: linear-gradient(to right, red 0% var(--my-progress, 0%), rgba(100, 100, 100, 0.75) var(--my-progress, 0%) 100%);
// JavaScript
progress.style.setProperty('--my-progress', `${video.currentTime / video.duration * 100}%`);
```

---

## JS recap

### The `HTMLMediaElement` interface

#### `HTMLMediaElement.paused`

Returns a boolean that indicates whether the media element is paused.

#### HTMLMediaElement: `ended` event

The `ended` event is fired when playback or streaming has stopped because the end of the media was reached or because no further data is available.

#### `HTMLMediaElement.currentTime`

The HTMLMediaElement interface's `currentTime` property specifies the current playback time in seconds.

Changing the value of `currentTime` seeks the media to the new time.

#### `HTMLMediaElement.duration`

The read-only HTMLMediaElement property `duration` indicates the length of the element's media in seconds.

**Note**: This property may not be read correctly if the video is not yet loaded or if streaming video is used.

#### `HTMLMediaElement.muted`

indicates whether the media element muted.

#### `HTMLMediaElement.volume`

The `HTMLMediaElement.volume` property sets the volume at which the media will be played.

#### `HTMLMediaElement.playbackRate`

The HTMLMediaElement.playbackRate property sets the rate at which the media is being played back.

#### HTMLMediaElement: `timeupdate` event

The `timeupdate event` is fired when the time indicated by the `currentTime` attribute has been updated.

The event frequency is dependent on the system load, but will be thrown between about 4Hz and 66Hz (assuming the event handlers don't take longer than 250ms to run).

#### HTMLMediaElement: `loadeddata` event

The `loadeddata` event is fired when the frame at the current playback position of the media has finished loading; often the first frame.

#### `element.requestFullscreen()`

```
const elem = document.getElementById("myvideo");

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
```


### Position and size read-only property

#### `HTMLElement.offsetWidth`

read-only property returns the layout width of an element as an integer.

#### `MouseEvent.offsetX`

read-only property of the MouseEvent interface provides the offset in the X coordinate of the mouse pointer between that event and the padding edge of the target node.

#### `MouseEvent.clientX`

read-only property of the MouseEvent interface provides the horizontal coordinate within the application's viewport at which the event occurred (as opposed to the coordinate within the page).

### `String.prototype.padStart()`

The `padStart()` method pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start of the current string.

```
padStart(targetLength, padString)
```

### Simplify: Conditional (ternary) operator and Logical NOT

Following the example of the previous tutorials, this time I introduced a bit of them to simplify the code and it did work well.

---

## Original Tutorial

### CSS

####  `transform` function

##### `transform: translateY()`

The `translateY()` CSS function repositions an element vertically on the 2D plane.

\<transform-function\> is really useful for adjusting the details of different positions and sizes, especially with `translation` to create hover animation effect. I am applying absolute position to create a pop-up display effect with `overflow: hidden`, but the tutorial with `translate` seems more concise and less likely to cause problems.

### JS

#### `video\[method\]()`

I think it's a very clever usage, video is obviously an JavaScript object, so its methods and properties can be accessed by dot or by square brackets, the advantage of the latter is that you can put strings, numbers, and variables inside the brackets

---

## More

The [completion of Nitish](https://github.com/nitishdayal/JavaScript30/tree/master/exercises/11%20-%20Custom%20Video%20Player) is very concise and uniform, with a high level of abstraction that is worth considering.





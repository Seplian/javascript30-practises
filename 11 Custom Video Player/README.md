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

### `Array.sort()` applying on numbers

一开始用display: none来切换controls的显示，但是这样无法单独显示一个窄窄的进度条；所以后来换成了overflow: hidden，搭配改变controls的高度来控制显示。这个方案的问题是，超过高度的两个range也显示不出来了，我选择在play.hover时增加一个overflow: visible参数，这样就解决问题了；新问题是，添加transition效果，会先在视频的框外显示，然后向上移动，很不自然；最后搞了个复杂的解决方法，在鼠标移动让隐藏的两个控制条显示是，再为player添加一个额外类，改变它的overflow属性，移开鼠标就删掉额外类。虽然觉得有点繁琐，但问题是解决了。

原来原教程的方法是把overflow: hidden给player，而非controls，用transformY控制hover前后controls的Y轴位置。这样因为弹出的速度框和声音框是向上的，所以不用考虑hidden的问题，也就没必要为player添加新的类了。确实更好。

横向展开放在右边的按钮感觉有点不合理，因为会把图标往左边顶，所以选择向上展开的速度和音量条。点击展开昂巨额有点累赘，因此使用了hover展开，这会产生一个问题，因为条是悬空在图标上边一定距离的，鼠标离开图标去条的过程中，会取消hover状态，因此条就关闭了。我的方法是在图标上放一个透明的before，让它连接图标和条。目前效果不错，但有两个小问题：1.条还是有点窄，鼠标扫过去可能漏导致它消失，我只能尽量把它弄宽一点；2.后边设置了点击声音图标会静音，导致点击看不见的before和条都会静音。。。所以我在外边又套了一个div container，鼠标离开它才会让条消失，然后让before整个包住条。最终效果还不错。

进入全屏以后，会自动调用浏览器内置的一套controls，尴尬的是，因为我们自己也设置了一次点击player会播放/暂停的控制，所以点击一次会触发两次，等于没法暂停了。。。我发现原版和guahua都是的。。。

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






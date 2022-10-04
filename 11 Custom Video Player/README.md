# Note 06: Type Ahead

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

### `transform: skew()`

In order to build an isosceles trapezoidal li element border, I have imagined a variety of methods, I believe the most reliable method is to use the trasform function to deform, but after testing many approaches are not very well.

Finally I applied a relatively complex method, adding a ::before pseudo element to the left of the li element, making it 0 wide and the same height as the li element, with a large border thickness, and using the transform: skew() method to stretch the upper left corner to the left; the right side is the same, except this time it is an after pseudo element and stretched to the right.

**Note**: use `position: absolute` to adjust the position and set the `z-index` of a negative value to prevent obscuring the \<li\> element itself.

### 进度条用linegradint

Use `odd` and `even` parameters to alternately select elements to create alternating CSS effects.

### `justify-content: space-between`

Distribute items evenly. The first item is flush with the start, the last is flush with the end.

In our implementation, we use this property to make the textual content (city and state) and the numerical content (population) of the search results, separated on both sides of the list.

---

## JS recap

### `HTMLMediaElement.paused`

Returns a boolean that indicates whether the media element is paused.



大量使用 a = !a和 b = c ? d : e来简化代码很不错。



---

## Original Tutorial

### CSS

####  Create trapezoidal border elements using the `transform` function

`transform: rotateX(3deg)`

Rotates an element around the abscissa (horizontal axis) without deforming it. In this example, it is equivalent to rotating around the x-axis to bring the upper border of the element closer to us.

`transform: perspective(100px)`

Set the distance between the user and the z=0 plane. Because the upper border of the element is closer to us in the previous step, when increasing the value of this property, the upper border expands more and looks as if it is stretched.

### JS

#### `Array.prototype.join()`

video[method]();

video显然是个对象嘛，那它的方法用dot和用[]写都行呀，不要忘记[]最大的又是就是里边可以放变量


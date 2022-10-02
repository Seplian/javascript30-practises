# Note 09: Dev Tools Domination

## Subject

Some common development tools usage exercises. The first part is how to add breakpoints to help debugger in the browser; the second part is some methods of the console object, about their usage and role.

---

### Breakpoints

Use breakpoints to pause your JavaScript code for debugger in browser. This article has a more detailed explanation: [Pause your code with breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints/)

Note: This entire documentation is well worth reading since it talks about all aspects of Chrome DevTools

---

### Console

1. `console.log()`

For general output of logging information.

2. Use string substitution

It feels like a very old method of string substitution, which should be replaced by template literals now.

```
console.log("Hello, %s!", "Bob");
 ```

3. Style console output

Use the `%c` directive to apply a CSS style to console output. The text before the directive will not be affected, but the text after the directive will be styled using the CSS declarations in the parameter.

```
console.log(
  "This is %cMy stylish message",
  "color: yellow; font-style: italic; background-color: blue;padding: 2px"
);
```

4. `console.warn()`

Outputs a warning message.

5. `console.error()`

Outputs an error message.

6. `console.info()`

Informative logging of information.

Firefox has an "i" sign in front of the message, Chrome doesn't seem to have one.

7. `console.assert()`

This method writes an error message to the console if the assertion is false. If the assertion is true, nothing happens.

```
console.assert(p.classList.contains('expected-class-name'), 'This element don't have this class!');
```

8. `console.clear()`

Clear the console.

9. `console.dir()`

Displays an interactive listing of the properties of a specified JavaScript object. This listing lets you use disclosure triangles to examine the contents of child objects.

10. Grouping output information together

- `console.group()`

Creates a new inline group, indenting all following output by another level. To move back out a level, call `groupEnd()`.

- `console.groupCollapsed()`

Creates a new inline group, indenting all following output by another level. However, unlike group() this starts with the inline group collapsed requiring the use of a disclosure button to expand it. To move back out a level, call `groupEnd()`.

11. `console.count();`

Log the number of times this line has been called with the given label.

12. Set a timer

- `console.time()`
Starts a timer with a name specified as an input parameter. Up to 10,000 simultaneous timers can run on a given page.

- `console.timeEnd()`
Stops the specified timer and logs the elapsed time in milliseconds since it started.

13. `console.table()`

Displays tabular data as a table.










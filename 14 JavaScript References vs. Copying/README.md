# 14 JavaScript References vs. Copying

## Subject

Understand primitive types, references and copying of arrays and objects.

---

## Thought

All types except objects define immutable values (that is, values which can't be changed). We refer to values of these types as "primitive values".

In computer science, an object is a value in memory which is possibly referenced by an identifier.

---

## JS recap

### Seven primitive data types

- `number` for numbers of any kind: integer or floating-point, integers are limited by ±(253-1).
- `bigint` for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there’s no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values – a standalone type that has a single value `null`.
- `undefined` for unassigned values – a standalone type that has a single value `undefined`.
- `symbol` for unique identifiers.

### All primitives are immutable

That is, they cannot be altered. It is important not to confuse a primitive itself with a variable assigned a primitive value. The variable may be reassigned to a new value, but the existing value can not be changed in the ways that objects, arrays, and functions can be altered. The language does not offer utilities to mutate primitive values.

```
let a = 'Bob';
let b = a;

a = 123;
b = true;
console.log(a, b); // 123 true
```

Note: Primitives have no methods but still behave as if they do. When properties are accessed on primitives, JavaScript auto-boxes the value into a wrapper object and accesses the property on that object instead.

### One non-primitive data type

- `object` for more complex data structures.

### Object references

One of the fundamental differences of objects versus primitives is that objects are stored and copied “by reference”, whereas primitive values: strings, numbers, booleans, etc – are always copied “as a whole value”.

```
let user = { name: 'John' };
let admin = user;

admin.name = 'Peter';
console.log(user.name); // 'Pete'
```

### Array copying

#### `Array.prototype.slice()`

The `slice()` method returns a **shallow copy** of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.

```
let copy = array.slice();
```

#### `Array.prototype.concat()`

The `concat()` method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.

```
let copy = [].concat(array);
```

#### Spread syntax (...)

Spread syntax can be used when all elements from an object or array need to be included in a new array or object, or should be applied one-by-one in a function call's arguments list.

```
let copy = [...array];
```

#### `Array.from()`

The `Array.from()` static method creates a new, **shallow-copied** Array instance from an iterable or array-like object.

```
const copy = Array.from(array);
```

### Object copying: shallow copy

#### `Object.assign()`

The `Object.assign()` method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.

If the source value is a reference to an object, it only copies the reference value.

```
const copy = Object.assign({}, object);
```

#### Spread syntax (...)

Spread syntax can be used when all elements from an object or array need to be included in a new array or object, or should be applied one-by-one in a function call's arguments list.

```
const copy = {...object};
```

### Object copying: deep copy

#### JSON Serialization

One way to make a deep copy of a JavaScript object, if it can be **serialized**, is to use `JSON.stringify()` to convert the object to a JSON string, and then `JSON.parse()` to convert the string back into a (completely new) JavaScript object.

```
const copy = JSON.parse(JSON.stringify(object));
```

#### `structuredClone()`

For objects that are serializable, you can alternatively use the `structuredClone()` method to create deep copies.

```
const clone = structuredClone(object);
```

**Note**: Many JavaScript objects are not serializable at all — for example, functions (with closures), Symbols, objects that represent HTML elements in the HTML DOM API, recursive data, and many other cases.

#### Take an existing implementation

For instance `_.cloneDeep(obj)` from the JavaScript library `lodash`.







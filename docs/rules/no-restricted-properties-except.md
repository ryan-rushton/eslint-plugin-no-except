# restrict properties or objects with exceptions (no-restricted-properties-except)

Allows you to restrict properties or objects from the codebase. If a object is restricted then certain properties can be exceptions. Similarly if properties are restricted, an object can be an exception and allowed to use it.

If you want to restrict a certain property from a certain object, use the [no-restricted-properties](https://eslint.org/docs/rules/no-restricted-properties) rule included with eslint.

## Rule Details

This rule aims to restrict properties or objects globally with exceptions if they are needed. A message can be supplied to provide guidance.

Examples of **incorrect** code for this rule:

```js
/* eslint no-restricted-properties-except: [2, {
    "property": "includes",
    "exceptions": []
}] */

const hasBar = foo.includes("bar");
```

```js
/* eslint no-restricted-properties-except: [2, {
    "object": "_",
    "exceptions": []
}] */

const bar = _.filter(foo, Boolean);
```

```js
/* eslint no-restricted-properties-except: [2, {
    "object": "foo",
    "exceptions": []
}] */

const { bar } = foo;
```

Examples of **correct** code for this rule:

```js
/* eslint no-restricted-properties-except: [2, {
    "property": "includes",
    "exceptions": ["_"]
}] */

const isIncluded = _.includes(foo, "bar");
```

```js
/* eslint no-restricted-properties-except: [2, {
    "object": "_",
    "exceptions": ["includes"]
}] */

const hasBar = _.includes(foo, "bar");
```

```js
/* eslint no-restricted-properties-except: [2, {
    "object": "foo",
    "exceptions": ["bar"]
}] */

const { bar } = foo;
```

## When Not To Use It

If you don't need to restrict objects or properties with exceptions, then don't use this rule.

## Further Reading

Use eslint's [no-restricted-properties](https://eslint.org/docs/rules/no-restricted-properties) for specific object.property restrictions.

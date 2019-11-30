# eslint-plugin-no-except

Rules that allow exceptions on some default eslint no rules. These are not supposed to completely replace the eslint rules, just allow the exceptions where they are needed.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-no-except`:

```
$ npm install eslint-plugin-no-except --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-no-except` globally.

## Usage

Add `no-except` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["no-except"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-except/rule-name": 2
    }
}
```

## Supported Rules

-   [no-restricted-properties-except](docs/rules/no-restricted-properties-except.md)

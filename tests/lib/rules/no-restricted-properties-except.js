/**
 * @fileoverview Allows you to restrict properties on objects like the rule no-restricted-properties with the added functionality of having exceptions to the rule.
 * @author Ryan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-restricted-properties-except"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });
ruleTester.run("no-restricted-properties-except", rule, {
    valid: [
        {
            code: "const included = _.includes(myArray, 1)",
            options: [{ property: "includes", message: "Don't use includes.", exceptions: ["_"] }]
        },
        {
            code: "const filtered = _.filter(myArray, Boolean)",
            options: [{ object: "_", message: "Don't use lodash.", exceptions: ["filter"] }]
        },
        {
            code: "let { bar } = foo;",
            options: [{ object: "foo", message: "Don't use foo.", exceptions: ["bar"] }]
        },
        {
            code: "let { bar } = foo;",
            options: [{ property: "bar", message: "Don't use bar.", exceptions: ["foo"] }]
        },
        {
            code: "let blah = foo.bar.yeah;",
            options: [{ object: "foo", message: "Don't use foo.", exceptions: ["bar"] }]
        }
    ],

    invalid: [
        {
            code: "const included = myArray.includes(1);",
            options: [{ property: "includes", message: "Don't use includes.", exceptions: ["_"] }],
            errors: [
                {
                    message: "includes is restricted from being used. Don't use includes.",
                    type: "MemberExpression"
                }
            ]
        },
        {
            code: "const filtered = _.filter(myArray, Boolean);",
            options: [{ object: "_", message: "Don't use lodash.", exceptions: ["map"] }],
            errors: [
                {
                    message: "_ is restricted from being used. Don't use lodash.",
                    type: "MemberExpression"
                }
            ]
        },
        {
            code: "const { bar } = foo",
            options: [{ object: "foo", message: "Don't use foo.", exceptions: ["notBar"] }],
            errors: [
                {
                    message: "foo is restricted from being used. Don't use foo.",
                    type: "ObjectPattern"
                }
            ]
        },
        {
            code: "let { bar } = foo;",
            options: [{ property: "bar", message: "Don't use bar.", exceptions: ["notFoo"] }],
            errors: [
                {
                    message: "bar is restricted from being used. Don't use bar.",
                    type: "ObjectPattern"
                }
            ]
        },
        {
            code: "let blah = foo.bar.yeah;",
            options: [{ object: "foo", message: "Don't use foo.", exceptions: ["yeah"] }],
            errors: [
                {
                    message: "foo is restricted from being used. Don't use foo.",
                    type: "MemberExpression"
                }
            ]
        }
    ]
});

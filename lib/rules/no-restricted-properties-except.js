/**
 * @fileoverview Allows you to restrict properties on objects like the rule no-restricted-properties with the added functionality of having exceptions to the rule.
 * @author Ryan Rushton
 */
"use strict";

const su = require("../utils/syntaxUtils.js");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Allows you to restrict properties on objects like the rule no-restricted-properties with the added functionality of having exceptions to the rule.",
            category: "Best Practices",
            recommended: false
        },
        schema: {
            type: "array",
            items: {
                anyOf: [
                    {
                        type: "object",
                        properties: {
                            property: {
                                type: "string"
                            },
                            exceptions: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            message: {
                                type: "string"
                            }
                        },
                        additionalProperties: false
                    },
                    {
                        type: "object",
                        properties: {
                            object: {
                                type: "string"
                            },
                            exceptions: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            message: {
                                type: "string"
                            }
                        },
                        additionalProperties: false
                    }
                ]
            },
            uniqueItems: true
        }
    },

    create: function(context) {
        const options = context.options;
        const illegalObjects = new Map();
        const illegalProperties = new Map();

        for (const option of options) {
            const { object, property, exceptions, message } = option;
            if (!object) {
                illegalProperties.set(property, { name: property, exceptions, message });
            } else if (!property) {
                illegalObjects.set(object, { name: object, exceptions, message });
            }
        }

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function isIllegalObjectUse(objectName, propertyName) {
            return (
                objectName &&
                illegalObjects.has(objectName) &&
                !illegalObjects.get(objectName).exceptions.includes(propertyName)
            );
        }

        function isIllegalPropertyUse(objectName, propertyName) {
            return (
                propertyName &&
                illegalProperties.has(propertyName) &&
                !illegalProperties.get(propertyName).exceptions.includes(objectName)
            );
        }

        function checkUsage(node, objectName, propertyName) {
            let rule;

            if (isIllegalObjectUse(objectName, propertyName)) {
                rule = illegalObjects.get(objectName);
            } else if (isIllegalPropertyUse(objectName, propertyName)) {
                rule = illegalProperties.get(propertyName);
            }

            if (rule) {
                const { name, message } = rule;
                const additionalMsg = message ? ` ${message}` : "";

                context.report({
                    node,
                    message: "{{name}} is restricted from being used.{{additionalMsg}}",
                    data: {
                        name,
                        additionalMsg
                    }
                });
            }
        }

        function checkVariableDeclarator(node) {
            if (node.init && node.init.type === "Identifier" && node.id.type === "ObjectPattern") {
                node.id.properties.forEach(property => {
                    checkUsage(node.id, node.init.name, su.getPropertyName(property));
                });
            }
        }

        /**
         * Checks property accesses in a destructuring assignment expression, e.g. `var foo; ({foo} = bar);`
         * @param {ASTNode} node An AssignmentExpression or AssignmentPattern node
         * @returns {undefined}
         */
        function checkDestructuringAssignment(node) {
            if (node.right.type === "Identifier" && node.left.type === "ObjectPattern") {
                node.left.properties.forEach(property => {
                    checkUsage(node.left, node.right.name, su.getPropertyName(property));
                });
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            MemberExpression(node) {
                checkUsage(node, node.object && node.object.name, su.getPropertyName(node));
            },
            VariableDeclarator: checkVariableDeclarator,
            AssignmentExpression: checkDestructuringAssignment,
            AssignmentPattern: checkDestructuringAssignment
        };
    }
};

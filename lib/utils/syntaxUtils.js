module.exports = {
    getPropertyName(node) {
        let prop;

        switch (node && node.type) {
            case "Property":
            case "MethodDefinition":
                prop = node.key;
                break;

            case "MemberExpression":
                prop = node.property;
                break;
        }

        switch (prop && prop.type) {
            case "Literal":
                return String(prop.value);

            case "TemplateLiteral":
                if (prop.expressions.length === 0 && prop.quasis.length === 1) {
                    return prop.quasis[0].value.cooked;
                }
                break;

            case "Identifier":
                if (!node.computed) {
                    return prop.name;
                }
                break;
        }

        return null;
    }
};

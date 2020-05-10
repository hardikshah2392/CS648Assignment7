/* globals React */

class ProductRow extends React.Component {
    render() {
        const prod = this.props.prod;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                prod.name
            ),
            React.createElement(
                "td",
                null,
                "$",
                prod.price
            ),
            React.createElement(
                "td",
                null,
                prod.category
            ),
            React.createElement(
                "td",
                null,
                React.createElement(
                    "a",
                    { href: prod.url, target: "__blank" },
                    "View"
                )
            )
        );
    }
}

export default class ProductTable extends React.Component {
    render() {
        const prodrows = this.props.prods.map(prod => React.createElement(ProductRow, { key: prod.id, prod: prod }));
        return React.createElement(
            "table",
            { style: { borderCollapse: "collapse" } },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "Product Name"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Price"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Category"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Image"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                prodrows
            )
        );
    }
}
export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.prodAdd;
    this.props.createProd({
      name: form.name.value,
      price: form.price.value.replace("$", ""),
      category: form.category.value,
      url: form.url.value
    });
    form.name.value = '', form.price.value = "$", form.category.value = "Shirts", form.url.value = "";
  }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement("br", null),
      React.createElement(
        "h2",
        null,
        "Add a Product"
      ),
      React.createElement(
        "form",
        { name: "prodAdd", onSubmit: this.handleSubmit },
        React.createElement(
          "lable",
          null,
          "Category"
        ),
        React.createElement(
          "label",
          null,
          "Name"
        ),
        React.createElement(
          "select",
          { name: "category" },
          React.createElement(
            "option",
            { selected: "selected", value: "Shirts" },
            "Shirts"
          ),
          React.createElement(
            "option",
            { value: "Jeans" },
            "Jeans"
          ),
          React.createElement(
            "option",
            { value: "Jackets" },
            "Jackets"
          ),
          React.createElement(
            "option",
            { value: "Sweaters" },
            "Sweaters"
          ),
          React.createElement(
            "option",
            { value: "Accessories" },
            "Accessories"
          )
        ),
        React.createElement("input", { type: "text", name: "name" }),
        React.createElement(
          "lable",
          null,
          "Price"
        ),
        React.createElement(
          "lable",
          null,
          "Image"
        ),
        React.createElement("input", { type: "text", name: "price" }),
        React.createElement("input", { type: "text", name: "url" }),
        React.createElement(
          "button",
          null,
          "Add"
        )
      )
    );
  }
}
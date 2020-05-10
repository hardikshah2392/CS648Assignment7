/* globals React */
/* eslint "react/jsx-no-undef": "off" */
import ProductTable from './ProductTable.jsx';
import PoductAdd from './PoductAdd.jsx';

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body);
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { prods: [] };
    // this.createTestProd = this.createProd.bind(this);
    this.createProd = this.createProd.bind(this);
    // setTimeout(this.createTestProd.bind(this),2000);
  }
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        prodList {
          id name price category url
        }
      }`;

    // const response = await fetch('/graphql', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json'},
    //   body: JSON.stringify({query})
    // });

    // const results = await response.json();
    // this.setState({ prods: results.data.prodList });
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ prods: data.prodList });
    }
  }

  async createProd(prods) {
    // const newProds = this.state.prods.slice();
    // newProd.id = this.state.prods.length + 1;
    // newProds.push(newProd);
    // console.log({newProds})
    // this.setState({prods:newProds})
    const query = `mutation {
        addProd(prods:{
          name:"${prods.name}"
          category:${prods.category}
          price:${prods.price}
          url:"${prods.url}"
        }) {
          id
        }
      }`;
    // const response = await fetch('/graphql', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json'},
    //   body: JSON.stringify({ query })
    // });
    // this.loadData();
    const data = await graphQLFetch(query, { prods });
    if (data) {
      this.loadData();
    }
  }

  // createTestProd(){
  //   this.createProd({
  //     name:"Deepesh", price:20,category:"Accesories",url:"wikipedia.com"
  //   });
  // }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'My Company Inventory'
      ),
      React.createElement('br', null),
      React.createElement(
        'h2',
        null,
        'Showing all available products',
        React.createElement('hr', null)
      ),
      React.createElement(ProductTable, { prods: this.state.prods }),
      React.createElement(ProductAdd, { createProd: this.createProd })
    );
  }
}
import React from 'react';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch';
import { Panel } from 'react-bootstrap';

export default class ProductList extends React.Component {
  constructor (){
    super();
    this.state = {prods:[], numbers: []};
    // this.createTestProd = this.createProd.bind(this);
    this.createProd = this.createProd.bind(this);
    this.deleteProd = this.deleteProd.bind(this);
    this.loadData = this.loadData.bind(this);
    // setTimeout(this.createTestProd.bind(this),2000);
  }
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      prodList {
        id name price category image
      },
      prodCount {
        count
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
      this.setState({ prods: data.prodList, numbers: data.prodCount[0].count });
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
        image:"${prods.image}"
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

  async deleteProd(index) {
      const query = `mutation deleProd($id: Int!) {
        delProd(id: $id)
        }`;
      const data = await graphQLFetch(query, { id: index });
      if (data && data.delProd) {
        this.loadData();
      }
  }
  
  render(){
    const allprods = this.state.prods;
    const allcount = this.state.numbers;
    
    return (
      <div>
        <h1>My Company Inventory</h1><br/>
        <Panel>
          <Panel.Heading>
            <Panel.Title><h2>Showing {allcount} available products</h2></Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <ProductTable prods = { allprods } deleteProd ={ this.deleteProd } />
          </Panel.Body>
        </Panel>
        <ProductAdd createProd = {this.createProd}/>
      </div>
    )
    }
}
  
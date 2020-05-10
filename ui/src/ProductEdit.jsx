import React from 'react';
import TextInput from './TextInput.jsx';
import NumInput from './NumInput.jsx';
import graphQLFetch from './graphQlFetch';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Panel
  } from 'react-bootstrap';

export default class ProductEdit extends React.Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      prods: {},
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      prods: { ...prevState.prods, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { prods } = this.state;
    const query = `mutation updateProd($id: Int!, $updates: prodUpdateInputs!) {
        updateProd(id:$id, updates: $updates) {
        id name price category image
      }
    }`;
    const { id, ...updates } = prods;
    const data = await graphQLFetch(query, { id, updates });
    if (data) {
      this.setState({ prods: data.updateProd });
      alert('Product Updated. Please go back to see the changes.');

    }
  }

  async loadData() {
    const query = `query prodFind($id: Int!) {
        prodFind    (id: $id) {
      id name price category image
      }
  }`;

    const { match: { params: { id } } } = this.props;
    console.log(id);
    const index = parseInt(id);
    const data = await graphQLFetch(query, { id: index });

    if (data) {
      const { ...prods } = data.prodFind;
      console.log(prods);
      console.log(data);
      prods.name = prods.name ? prods.name : '';
      prods.price = prods.price ? prods.price.toString() : '';
      prods.image = prods.image ? prods.image : '';
      prods.category = prods.category ? prods.category : 'Shirts';
      this.setState({ prods });
    } else {
      this.setState({ prods: {} });
    }
  }

  render() {
    const { prods: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
    const saveTooltip = (
      <Tooltip id="save-tooltip" placement="top">Save Product</Tooltip>
      );
    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title><h2>Product Edit</h2></Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <form name="ProdsEdit">
                <label>Category</label>
                <label>Name</label>
                <select name="category" defaultValue={this.state.prods.category} onChange={this.handleChange}>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Accessories">Accessories</option>
                </select>
                <TextInput name="name" value={this.state.prods.name} onChange={this.onChange} />
                <label>Price</label>
                <label>Image</label>
                <NumInput name="price" value={this.state.prods.price} onChange={this.onChange} />
                <input type="text" name="image" defaultValue={this.state.prods.image} onChange={this.handleChange}/>
                <br/><br/>
                <div><OverlayTrigger delayShow={1000} overlay={saveTooltip}>
                      <Button type="button" id="delbtn" onClick={this.handleSubmit}>
                        <Glyphicon glyph="ok" />
                      </Button>
                    </OverlayTrigger>
                  </div>
            </form>
          </Panel.Body>
        </Panel>
      </div>

    );
  }
}
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Panel
  } from 'react-bootstrap';


export default class ProductAdd extends React.Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.prodAdd;
    this.props.createProd({
      name: form.name.value,
      price: form.price.value.replace("$",""),
      category:form.category.value,
      image:form.image.value
    });
    form.name.value = '',form.price.value = "$", form.category.value = "Shirts", form.image.value= ""
  }
  render() {
    const addTooltip = (
      <Tooltip id="add-tooltip" placement="top">Add Product</Tooltip>
    );
    return (
      <div>
        <br/>
        <Panel>
          <Panel.Heading>
            <Panel.Title><h2>Add a Product</h2></Panel.Title>
          </Panel.Heading>
            <Panel.Body>
            <form name="prodAdd" onSubmit={this.handleSubmit}>
            <label>Category</label>
            <label>Name</label>
            <select name="category" defaultValue="Shirts">
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
            </select>
            <input type="text" name="name"/>
            <label>Price</label>
            <label>Image</label>
            <input type="text" name="price"/>
            <input type="text" name="image"/>
            <br/>
            <span></span>
            <OverlayTrigger delayShow={1000} overlay={addTooltip}>
              <Button id ='btn1' className='.ml-3 .ml-sm-0' bsSize="xsmall" width='20px' onClick= {this.handleSubmit}>
                <Glyphicon glyph="plus" />
              </Button>
            </OverlayTrigger>
            </form>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}
  
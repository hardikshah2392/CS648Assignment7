import React from 'react';
import ProductRow from './ProductRow.jsx';
import { Table } from 'react-bootstrap';
  
export default function ProductTable(props) {
    const { prods } = props;
    const deleteProd = props.deleteProd;
    const prodrows = prods.map(
    prod => <ProductRow key={prod.id} prod={prod} deleteProd={deleteProd}/>);
    return (
        <Table bordered condensed hover responsive>
            <thead>
                <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {prodrows}
            </tbody>
        </Table>
)
}
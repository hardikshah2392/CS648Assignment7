import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger,
  } from 'react-bootstrap';
// eslint-disable-next-line react/prefer-stateless-function
export default function ProductRow(props) {
  const { prod } = props;
  const { deleteProd } = props;
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
  );
  const editTooltip = (
    <Tooltip id="edit-tooltip" placement="top">Edit Product</Tooltip>
  );
  return(
    <tr>
      <td>{prod.name}</td>
      <td>${prod.price}</td>
      <td>{prod.category}</td>
      <td><Link to={`/view/${prod.image}`} target="_blank"> View </Link></td>
      <td>
        <OverlayTrigger delayShow={1000} overlay={editTooltip}>
          <Link to={{ pathname: `/edit/${prod.id}`}}>
            <Glyphicon glyph='pencil'></Glyphicon> 
          </Link>
        </OverlayTrigger>
        {' | '}
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button className='.ml-3 .ml-sm-0' bsSize="xsmall" onClick={() => { deleteProd(prod.id); }}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td> 
    </tr>
  )
}
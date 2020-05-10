import React from 'react';

export default function ProductView ({ match }) {
  let id  = location.hash.substring(7);
  console.log({ match });
  return (
      <img src={id} alt="Icon" />   
  );
}
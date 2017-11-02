import React from 'react';

const Image = ({ name, location = '' }) => (
  <img
    src={`/img/${location}${location !== '' ? '/' : ''}${name}.jpg`}
    alt={name}
  />
);

export default Image;

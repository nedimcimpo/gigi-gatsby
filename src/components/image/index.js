import { h } from 'preact';

const Image = ({ name, location = '' }) => (
  <img
    src={`../../assets/img/${location}${location !== '' ? '/' : ''}${name}.jpg`}
    alt={name}
  />
);

export default Image;

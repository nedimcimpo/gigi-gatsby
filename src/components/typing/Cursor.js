import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Cursor = ({ className }) => <span className={className}>|</span>;

Cursor.propTypes = { className: PropTypes.string };
Cursor.defaultProps = { className: '' };

export default Cursor;

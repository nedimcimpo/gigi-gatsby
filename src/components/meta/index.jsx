import React from 'react';
import Helmet from 'react-helmet';
import { siteMetadata as config } from '../../../gatsby-config';

const Meta = props => {
  const mainTitle = `${config.title}`;
  const metaTitle = props.title ? `${props.title} | ${mainTitle}` : mainTitle;
  const metaDescription = props.description || config.description;
  const absoluteUrl = `${config.url}${props.location.pathname}`;
  const imageUrl = `${config.url}/share.png`;
  const imgWidth = 1200;
  const imgHeight = 800;
  const fbApiId = 1218464051537378;

  const meta = [
    { name: 'description', content: metaDescription },
    { name: 'og:title', content: metaTitle },
    { property: 'og:url', content: absoluteUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: imgWidth },
    { property: 'og:image:height', content: imgHeight },
    { property: 'fb:app_id', content: fbApiId },
  ];

  if (props.noIndex) {
    meta.push({ name: 'robots', content: 'noindex' });
  }

  return (
    <Helmet title={metaTitle} meta={meta} />
  );
};

export default Meta;

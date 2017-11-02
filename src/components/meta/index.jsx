import React from 'react';
import Helmet from 'react-helmet';
import { siteMetadata as config } from '../../../gatsby-config';

const Meta = props => {
  const mainTitle = `${config.title} - Freelance Web Developer`;
  const metaTitle = props.title ? `${props.title} | ${mainTitle}` : mainTitle;
  const metaDescription = props.description || config.description;
  const absoluteUrl = `${config.url}${props.location.pathname}`;

  const meta = [
    { name: 'description', content: metaDescription },
    { name: 'og:title', content: metaTitle },
    { name: 'og:description', content: metaDescription },
    { property: 'og:url', content: absoluteUrl },
    {
      property: 'og:image',
      content: 'http://real-creature.surge.sh/img/mentors/hero2.jpg',
    },
    { property: 'og:title', content: 'Gigi School of Coding' },
  ];

  if (props.noIndex) {
    meta.push({ name: 'robots', content: 'noindex' });
  }

  return <Helmet title={metaTitle} meta={meta} />;
};

export default Meta;

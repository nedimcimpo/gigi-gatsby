/*eslint-disable*/
import React from 'react';
import Helmet from 'react-helmet';

import { siteMetadata as config } from '../gatsby-config';

const isProduction = process.env.NODE_ENV === 'production';
const openGraphUrl = 'http://real-creature.surge.sh/img/mentors/hero2.jpg';
const styles = isProduction
  ? require('!raw-loader!../public/styles.css')
  : null;

const Html = ({ body, headComponents, postBodyComponents }) => {
  const helmet = Helmet.rewind();

  return (
    <html lang="en">
      <head>
        {headComponents}

        {/* Document */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Meta */}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={openGraphUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:title" content="Gigi School of Coding" />
        <meta
          property="og:description"
          content="The new season of Gigi School of Coding is Near, and here is everything you need to know about it."
        />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="theme-color" content="#000000" />

        {/* Styles */}
        {styles && (
          <style
            id="gatsby-inlined-css"
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}
      </body>
    </html>
  );
};

export default Html;

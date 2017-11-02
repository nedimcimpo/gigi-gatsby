import React from 'react';
// import Helmet from 'react-helmet';
import Hero from '../sections/Hero';
import { HeroData } from '../data/data';

import './mentor.scss';

export default function Template({ data }) {
  const { markdownRemark: post } = data;

  return (
    <div>
      <Hero
        data={HeroData}
        bgImage={`${post.frontmatter.id}-color`}
        removeText
        removeBgOverlay
        mentorName={post.frontmatter.name}
      />
      <div className={'block w-100 single-page my-1 mx-auto pb-5'}>
        <h5 className="py-2">{post.frontmatter.name} </h5>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
  );
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        image
        id
        position
        name
      }
    }
  }
`;

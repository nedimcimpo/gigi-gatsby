import React from 'react';
// import Helmet from 'react-helmet';
import Hero from '../sections/Hero';
import { HeroData } from '../data/data';

import './post.scss';

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
        <div className="block float-left w-50 pr-3">
          <img
            src={post.frontmatter.image}
            alt={post.frontmatter.name}
            className="mentors-image"
          />
          <div className="flex flex-ycenter pt-2 felx-start">
            <h5>{post.frontmatter.name} </h5>
            <div> &nbsp; - {post.frontmatter.position}</div>
          </div>
        </div>
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

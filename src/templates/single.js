/*eslint-disable*/
import React from 'react';
// import Helmet from 'react-helmet';
import Hero from '../sections/Hero';
import Header from '../components/header';

import { HeroData } from '../data/data';

import Footer from '../sections/Footer';

import './single.scss';

export default function Template({ data }) {
  const { markdownRemark: post } = data;

  return (
    <div>
      <Header isSinglePage />
      <Hero
        data={HeroData}
        bgImage={
          post.frontmatter.type === 'mentor'
            ? `${post.frontmatter.id}-color`
            : 'hero2'
        }
        removeText
        removeBgOverlay={post.frontmatter.type === 'mentor'}
      />
      <div
        className={`block w-100 single-page ${post.frontmatter.type === 'mentor'
          ? 'my-1'
          : 'my-5'} mx-auto pb-5`}
      >
        {post.frontmatter.type !== 'mentor' && (
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
        )}
        {post.frontmatter.type === 'mentor' && (
          <h5 className="py-2">{post.frontmatter.name} </h5>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      <Footer />
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
        type
        id
        position
        name
      }
    }
  }
`;

/*eslint-disable*/
import React from 'react';
// import Helmet from 'react-helmet';
import Hero from '../sections/Hero';
import Header from '../components/header';

import { HeroData } from '../data/data';

import Footer from '../sections/Footer';

import './testimonial.scss';

export default function Template({ data }) {
  const { markdownRemark: post } = data;

  return (
    <div>
      <Header isSinglePage />

      <Hero data={HeroData} bgImage="hero2" removeText />
      <div className="block w-100 single-page my-5 mx-auto">
        <div className="flex flex-ycenter pb-1 felx-start uppercase">
          <div class="bold">{post.frontmatter.name} </div>
          <div> &nbsp; - {post.frontmatter.position}</div>
        </div>
        <div className="block float-left w-50 pr-3">
          <img
            src={post.frontmatter.image}
            alt={post.frontmatter.name}
            className="mentors-image"
          />

        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} class="justify"/>
      </div>

      <Footer />
    </div>
  );
}

export const postQuery = graphql`
  query TestimonialByPath($path: String!) {
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

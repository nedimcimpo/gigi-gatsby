/*eslint-disable*/
import React, { Component } from 'react';
// import Helmet from 'react-helmet';
import Hero from '../sections/Hero';
import Header from '../components/header';
import ScrollableAnchor , { goToAnchor, removeHash, configureAnchors } from 'react-scrollable-anchor';

import { HeroData } from '../data/data';

import Footer from '../sections/Footer';

import './single.scss';

export default class Template extends Component {
  componentDidMount() {
    const { markdownRemark: post } = this.props.data;
    configureAnchors({offset: -80, scrollDuration: 200});
    if (post.frontmatter.type === 'mentor') {
      goToAnchor('mentor');
    } else {
      goToAnchor('testimonial');
    }
  }
  render () {
    const { markdownRemark: post } = this.props.data;

    return (
      <div>

        <Header isSinglePage/>
        <ScrollableAnchor  id="mentor">

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
        </ScrollableAnchor>

          <ScrollableAnchor  id="testimonial">
        <div className="block w-100 single-page my-4 mx-auto">
          <div className="flex flex-ycenter pb-1 flex-start uppercase single__desc">
            <div className="bold">{post.frontmatter.name} </div>
            {post.frontmatter.type !== 'mentor' && (
              <div> &nbsp; - {post.frontmatter.position}</div>
            )}
          </div>
          {post.frontmatter.type !== 'mentor' && (
            <div className="block float-left w-50 pr-3 single__avatar">
              <img
                src={post.frontmatter.image}
                alt={post.frontmatter.name}
                className="mentors-image"
              />
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="justify"
          />
        </div>
        </ScrollableAnchor >

        <Footer/>
      </div>
    );
  }
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

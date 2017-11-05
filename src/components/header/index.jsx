import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';
import Link from 'gatsby-link';

import './style.scss';
import StickyHeader from '../sticky/';

export default class Header extends Component {
  render() {
    return (
      <StickyHeader disableInlineStyles>
        <header className="header">
          <div className="header__inner mx-auto px-3">
            <a href="/" className="header__link">
              <h1 className="title flex flex-wrap flex-xcenter">
                <span className="flex flex-ycenter mr-2">
                  <img src={'/img/gigi-school-logo.svg' }alt="gigi school logo" title="logo" />
                </span>
                <span className="logo__text">Gigi School of Coding</span>
              </h1>
            </a>
            {this.props.isSinglePage && (
              <nav className="nav">
                <Link to="/" className="inline-block mr-2 link link--gigi">
                  <span>Home</span>
                </Link>
              </nav>
            )}

            {!this.props.isSinglePage && (
              <nav className="nav">
                <Scrollchor
                  to="#about"
                  className="inline-block mr-2 link link--gigi"
                  animate={{ offset: -80, duration: 800 }}
                >
                  <span>About</span>
                </Scrollchor>
                <Scrollchor
                  to="#testimonials"
                  className="inline-block mr-2 link link--gigi"
                  animate={{ offset: -80, duration: 800 }}
                >
                  <span>Testimonials</span>
                </Scrollchor>

                <Scrollchor
                  to="#mentors"
                  className="inline-block mr-2 link link--gigi"
                  animate={{ offset: -80, duration: 800 }}
                >
                  <span>Mentors</span>
                </Scrollchor>
              </nav>
            )}
          </div>
        </header>
      </StickyHeader>
    );
  }
}

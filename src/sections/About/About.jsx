import React, { Component } from 'react';

import './styles.scss';

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgShow: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({ bgShow: true });
  };

  handleMouseLeave = () => {
    this.setState({ bgShow: false });
  };

  render() {
    const bgc = this.state.bgShow ? 'about__gif show' : 'about__gif';

    return (
      <div id="about" className="about relative my-6">
        <div className="about__inner">
          <h3 className="g-title mb-5">About us test</h3>

          <div className="about__text">
            <span>
              {this.props.data.first}
              {''}
            </span>
            <span>
              {this.props.data.second}
              {''}
            </span>
            <span
              className="about__trigger"
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <a href="3">trigger gif dsada</a>
            </span>
            <span>{this.props.data.third}</span>
            <div
              className={bgc}
              style={{
                backgroundImage: 'url("./img/Video-6x.gif")',
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import MediaQuery from 'react-responsive';

import Modal from '../../components/Modal';

import Typing from '../../components/typing';

import { getRandomInt } from '../../utils/numbers';

import './style.scss';

export default class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formModal: false,
    };
  }

  openFormModal = () => {
    this.setState({
      formModal: true,
    });
  };

  closeFormModal = () => {
    this.setState({
      formModal: false,
    });
  };

  render() {
    return (
      <div>
        <Modal visible={this.state.formModal} onClose={this.closeFormModal}>
          <h2>content</h2>
          <h3>content</h3>
        </Modal>
        <div
          className={`hero relative white ${this.props.removeBgOverlay
            ? 'remove-overlay'
            : ''}`}
          style={{
            backgroundImage: `url("/img/mentors/${this.props.bgImage}.jpg")`,
          }}
        >
          {!this.props.removeText && (
            <div className="hero__inner w-100 h-100 mx-auto py-4 px-6 flex flex-start flex-xcenter flex-wrap flex-column">
              <h2 className="hero__title z-1">
                <span className="inline-block">{this.props.data.pretitle}</span>
                <span className="block">{this.props.data.midtitle}</span>
                <div className="block typing__block">
                  <span className="inline-block">
                    {' '}
                    {this.props.data.endtitle}
                  </span>
                  <span className="inline-block">
                    <Typing loop className="typing mx-2" speed={50}>
                      {this.props.data.words.map(word => {
                        const num = getRandomInt(
                          0,
                          this.props.data.colors.length - 1,
                        );
                        const color = this.props.data.colors[num];
                        return (
                          <div
                            style={{ backgroundColor: `${color}` }}
                            className="px-2"
                            key={word.length}
                          >
                            <span>{word}</span>
                            <Typing.Backspace count={word.length + 15} />
                          </div>
                        );
                      })}
                    </Typing>
                  </span>
                </div>
              </h2>
              <div className="block z-1">
                <MediaQuery query="(max-width: 1024px)">
                  <ReactTooltip />
                  <a
                    data-tip="Application form is enabled only on large screens."
                    className="block mt-3 relative z-1 link link--gigi hero__btn uppercase"
                  >
                    <span>WE LIKE THAT. LET'S PUT YOUR TALENTS TO WORK.</span>
                  </a>
                </MediaQuery>
                <MediaQuery query="(min-width: 1025px)">
                  <a
                    onClick={this.openFormModal}
                    role="button"
                    tabIndex="-1"
                    data-tip="You can apply until November 18th, 2017"
                    className="block mt-3 relative z-1 link link--gigi hero__btn hero__btn--active uppercase"
                  >
                    <span>WE LIKE THAT. LET'S PUT YOUR TALENTS TO WORK.</span>
                  </a>
                </MediaQuery>
              </div>
            </div>
          )}
          {this.props.removeText && (
            <div className="hero__inner w-100 h-100  flex flex-end flex-center black" />
          )}
        </div>
      </div>
    );
  }
}

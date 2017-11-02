import React from 'react';
import ReactTooltip from 'react-tooltip';

import Typing from '../../components/typing';

import { getRandomInt } from '../../utils/numbers';

import './style.scss';

const Hero = props => (
  <div
    className={`hero relative white ${props.removeBgOverlay
      ? 'remove-overlay'
      : ''}`}
    style={{
      backgroundImage: `url("/img/mentors/${props.bgImage}.jpg")`,
    }}
  >
    {!props.removeText && (
      <div className="hero__inner w-100 h-100 mx-auto py-4 px-6 flex flex-start flex-xcenter flex-wrap flex-column">
        <h2 className="hero__title z-1">
          <span className="inline-block">{props.data.pretitle}</span>
          <span className="block">{props.data.midtitle}</span>
          <div className="block typing__block">
            <span className="inline-block"> {props.data.endtitle}</span>
            <span className="inline-block">
              <Typing loop className="typing mx-2" speed={50}>
                {props.data.words.map(word => {
                  const num = getRandomInt(0, props.data.colors.length - 1);
                  const color = props.data.colors[num];
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
          <ReactTooltip />
          <a
            data-tip="Application due wont start before November 15th 2017"
            className="block mt-3 relative z-1 link link--gigi hero__btn uppercase"
          >
            <span>WE LIKE THAT. LET'S PUT YOUR TALENTS TO WORK.</span>
          </a>
        </div>
      </div>
    )}
    {props.removeText && (
      <div className="hero__inner w-100 h-100  flex flex-end flex-center black" />
    )}
  </div>
);

export default Hero;

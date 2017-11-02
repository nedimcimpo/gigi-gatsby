import React from 'react';
import Link from 'gatsby-link';

import './style.scss';

import { getFirstNWords } from '../../utils/text';

const Mentors = props => (
  <div id="mentors" className="flex flex-column mx-5 my-5 center mentors">
    <div>
      <h3 className="g-title mb-6">Mentors</h3>
    </div>
    <div className="w-100 mentors__wrapper">
      {props.data &&
        Object.keys(props.data).map((item, index) => {
          const name = props.data[item].name,
            text = getFirstNWords(props.data[item].text);
          return (
            <div
              className={
                index === 0 ? 'item item--hero' : 'item item--standard'
              }
              key={item.name}
            >
              <div className="item__img" />
              <div className="item__desc">
                <h5>{name}</h5>
                <figcaption className="mb-5">{text} </figcaption>

                <Link
                  to={`/mentors/${item}`}
                  className="mentors__link link link--gigi"
                >
                  <span>Read More</span>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  </div>
);

export default Mentors;

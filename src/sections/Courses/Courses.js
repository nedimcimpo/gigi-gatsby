import React from 'react';
import Image from '../../components/image';

import './style.scss';

export const Courses = props => (
  <section id="courses" className="courses block my-5">
    <div className="courses__inner mx-auto">
      <h3 className="g-title mb-5">Courses</h3>
      <div className="relative grid grid-gap-2 grid-cols-3 courses__wrapper">
        {props.data.map((item, index) => (
          <div className="course" key={index}>
            <Image name={item.image} location="courses" />
            <div className="course__caption">
              <h6 className="course__title mb-2">{item.title}</h6>
              <div className="course__body pr-3 m-0">{item.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

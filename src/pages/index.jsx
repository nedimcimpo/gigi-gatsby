import React from 'react';
import MediaQuery from 'react-responsive';

import Meta from '../components/meta';
import Header from '../components/header';
import Hero from '../sections/Hero';
import Count from '../sections/Count';
import Charts from '../sections/Charts';
import Mentors from '../sections/Mentors';
import Courses from '../sections/Courses';
import Testimonials from '../sections/Testimonials';

import ErrorPage from '../sections/ErrorPage';

import Footer from '../sections/Footer';

import {
  HeroData,
  countData,
  TestimonialsData,
  MentorsData,
  CoursesData,
} from '../data/data';

const Index = ({ location }) => (
  <div>
    <Meta location={location} />
    <MediaQuery query="(max-width: 1024px)">
      <ErrorPage />
    </MediaQuery>
    <MediaQuery query="(min-width: 1025px)">
      <Header />
      <Hero data={HeroData} bgImage={'hero2'} />
      <Count data={countData} />
      <Charts />
      <Mentors data={MentorsData} />
      <Courses data={CoursesData} />
      <Testimonials data={TestimonialsData} />
      <Footer />
    </MediaQuery>
  </div>
);

export default Index;

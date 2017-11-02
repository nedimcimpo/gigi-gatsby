import React from 'react';
import Link from 'gatsby-link';

import Meta from '../components/meta';
import Header from '../components/header';
import Hero from '../sections/Hero';
import Count from '../sections/Count';
import Charts from '../sections/Charts';
import Mentors from '../sections/Mentors';

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
    <Header />
    <Hero data={HeroData} bgImage={'hero2'} />
    <Count data={countData} />
    <Charts />
    <Mentors data={MentorsData} />
    <Footer />
  </div>
);

export default Index;

import React from 'react';
import './about-section.scss';

const AboutSection = props => {
  return (
    <section id="about-section">
      <h1>About Quantified</h1>
      <h3>
        Powered by the Best Buy API, Quantified is a project/utility that
        streamlines the receiving of products by organizing product metadata
        into a table that can be saved, organized, filtered, and altered at a
        later time. Additionally, it can be used as general purpose tool for
        creating and organizing tabular data within Best Buy.
      </h3>
      <h3>
        In its current form, Quantified is loosely coupled to Best Buy, but
        could easily be adapted to any other retail environment.
      </h3>
      <h3>
        Quantified is built with battle tested and industry leading technology
        for guaranteed reliability, security, and of course speed.
      </h3>
    </section>
  );
};

export default AboutSection;

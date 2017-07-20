import React from 'react';
import './about-section.scss';

const AboutSection = props => {
  return (
    <section id="about-section">
      <h1>About Quantified</h1>
      <h3>
        Powered by the Best Buy API, Quantified is a project that helps
        streamline the receiving of high cost products in addition to being a
        general purpose tool for creating tabular data within Best Buy.
      </h3>
      <h3>
        Built by a Best Buy employee, Quantified was created with the employee
        in mind and will be consistently improved to ensure reliability and
        accuracy.
      </h3>
      <h3>
        Quantified is built with industry leading technology for enhanced
        reliability, speed, and security. These technologies include NodeJS with
        Express, React, Redux, SCSS, Fuse-Box, MongoDB, and more!
      </h3>
    </section>
  );
};

export default AboutSection;

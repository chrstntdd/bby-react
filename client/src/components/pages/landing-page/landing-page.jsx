import React from 'react';

import HeroArea from './hero-area';
import HowSection from './how-section';
import AboutSection from './about-section';
import Register from '../../auth/register';
import Footer from './footer';

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page">
        <HeroArea />
        <HowSection />
        <AboutSection />
        <Register />
        <Footer />
      </div>
    );
  }
}

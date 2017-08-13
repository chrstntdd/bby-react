import React from 'react';

import HeroArea from './hero-area';
import HowSection from './how-section';
import AboutSection from './about-section';
import Register from '../../auth/register';
import Footer from './footer';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerData: [
        {
          name: 'Official Best Buy API Status',
          link: 'https://developer.bestbuy.com/api-status'
        },
        {
          name: 'Sign up',
          link: '/sign-up'
        },
        {
          name: 'Sign in',
          link: '/sign-in'
        }
      ]
    };
  }
  render() {
    return (
      <div className="landing-page">
        <HeroArea />
        <HowSection />
        <AboutSection />
        <Register />
        <Footer footerData={this.state.footerData} />
      </div>
    );
  }
}

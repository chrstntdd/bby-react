import * as React from 'react';

import HeroArea from './HeroArea';
import HowSection from './HowSection';
import AboutSection from './AboutSection';
import Footer from './footer';

const simple = 'images/atom.svg';
const reliable = 'images/handshake.svg';
const secure = 'images/padlock.svg';
const fast = 'images/rocket.svg';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerData: [
        {
          name: 'Start here',
          link: '/sign-up'
        },
        {
          name: 'Sign in',
          link: '/sign-in'
        },
        {
          name: 'Official Best Buy API Status',
          link: 'https://developer.bestbuy.com/api-status'
        }
      ],
      cardData: [
        {
          name: 'simple',
          img: simple,
          desc: '...but powerful'
        },
        {
          name: 'reliable',
          img: reliable,
          desc: 'There when you need it'
        },
        {
          name: 'safe',
          img: secure,
          desc: 'Without compromises'
        },
        {
          name: 'fast',
          img: fast,
          desc: 'Designed with speed in mind'
        }
      ]
    };
  }
  render() {
    return (
      <div className="landing-page">
        <HeroArea />
        <HowSection cardData={this.state.cardData} />
        <AboutSection />
        <Footer footerData={this.state.footerData} />
      </div>
    );
  }
}

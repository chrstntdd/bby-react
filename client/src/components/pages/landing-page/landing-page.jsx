import React from 'react';

import HeroArea from './hero-area';
import HowSection from './how-section';
import AboutSection from './about-section';
import Register from '../../auth/register';
import Footer from './footer';

import simple from '../../../static/noun_971031_cc.svg';
import reliable from '../../../static/noun_1007187_cc.svg';
import secure from '../../../static/noun_821171_cc.svg';
import fast from '../../../static/noun_658468_cc.svg';

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
        <Register />
        <Footer footerData={this.state.footerData} />
      </div>
    );
  }
}

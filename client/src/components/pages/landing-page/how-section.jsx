import React from 'react';
import './how-section.scss';
import Card from './how-card';

import simple from '../../../static/noun_971031_cc.svg';
import reliable from '../../../static/noun_1007187_cc.svg';
import secure from '../../../static/noun_821171_cc.svg';
import fast from '../../../static/noun_658468_cc.svg';

export default class HowSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const howCards = this.state.cardData.map((card, index) =>
      <Card key={index} {...card} />
    );
    return (
      <section id="how-section">
        <div className="card-container">
          {howCards}
        </div>
      </section>
    );
  }
}

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
          desc: 'lorem ipsum'
        },
        {
          name: 'reliable',
          img: reliable,
          desc: 'lorem ipsum'
        },
        {
          name: 'secure',
          img: secure,
          desc: 'lorem ipsum'
        },
        {
          name: 'fast',
          img: fast,
          desc: 'lorem ipsum'
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

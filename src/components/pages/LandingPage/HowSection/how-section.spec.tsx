import * as React from 'react';
import { shallow } from 'enzyme';

import HowSection from './';

describe('<HowSection/>', () => {
  it('should render without crashing', () => {
    const props = {
      cardData: [
        {
          name: 'simple',
          img: 'fakeimg.jpg',
          desc: '...but powerful'
        },
        {
          name: 'reliable',
          img: 'fakeimg.jpb',
          desc: 'There when you need it'
        },
        {
          name: 'safe',
          img: 'fakeimg.jpg',
          desc: 'Without compromises'
        },
        {
          name: 'fast',
          img: 'fakeimg.jpg',
          desc: 'Designed with speed in mind'
        }
      ]
    };
    shallow(<HowSection {...props} />);
  });
});

import * as React from 'react';
import { shallow } from 'enzyme';

import HowCard from './';

describe('<HowCard/>', () => {
  const props = {
    cardData: [
      {
        name: 'simple',
        img: 'fakeImgUrl.jpg',
        desc: '...but powerful'
      },
      {
        name: 'reliable',
        img: 'fakeImgUrl.jpg',
        desc: 'There when you need it'
      },
      {
        name: 'safe',
        img: 'fakeImgUrl.jpg',
        desc: 'Without compromises'
      },
      {
        name: 'fast',
        img: 'fakeImgUrl.jpg',
        desc: 'Designed with speed in mind'
      }
    ]
  };
  it('should render without crashing', () => {
    const wrapper = shallow(<HowCard {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should have an image, h3, and h5', () => {
    const wrapper = shallow(<HowCard {...props} />);
    const expectedTags = ['img', 'h3', 'h5'];
    const renderedTags = wrapper.children().nodes.map(tag => tag.type);
    expect(expectedTags).toEqual(renderedTags);
  });
});

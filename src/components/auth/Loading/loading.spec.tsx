import * as React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from './';

describe('<Loading />', () => {
  it('should render when waiting is true', () => {
    const props = {
      waiting: true,
      message: 'test'
    };

    const wrapper = shallow(<LoadingIndicator {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render when waiting is false', () => {
    const props = {
      waiting: false,
      message: 'test'
    };

    const wrapper = shallow(<LoadingIndicator {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});

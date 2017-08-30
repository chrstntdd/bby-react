import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from '../../../client/src/components/auth/loading.jsx';

describe('<Loading', () => {
  it('should render without crashing', () => {
    shallow(<LoadingIndicator />);
  });
  it('should have an id of loading-indicator', () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper.props().id).toEqual('loading-indicator');
  });
  it('should have a classname of loader loader-circles', () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper.props().className).toEqual('loader loader-circles');
  });
});

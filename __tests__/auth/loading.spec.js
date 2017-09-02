import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from '../../src/components/auth/loading.jsx';

describe('<Loading', () => {
  it('should render without crashing', () => {
    shallow(<LoadingIndicator />);
  });
  it('should have an id of loading-indicator', () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper.props().id).toEqual('loading-container');
  });
  it('should have a classname of show when waiting', () => {
    const props = {
      waiting: true
    };
    const wrapper = shallow(<LoadingIndicator {...props} />);
    expect(wrapper.props().className).toEqual('show');
  });
  it('should have a classname of hide when NOT waiting', () => {
    const props = {
      waiting: false
    };
    const wrapper = shallow(<LoadingIndicator {...props} />);
    expect(wrapper.props().className).toEqual('hide');
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';

import DashboardHeader from './';

describe('<DashboardHeader/>', () => {
  const props = {
    userData: {
      firstName: 'testFirst',
      lastName: 'testLast'
    }
  };
  it('should render without crashing', () => {
    const wrapper = shallow(<DashboardHeader {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
  it("should render a greeting with the user's first and last name", () => {
    const wrapper = shallow(<DashboardHeader {...props} />);
    const greeting = wrapper
      .find('h2')
      .props()
      .children.join('');
    expect(greeting).toBe(`Hello, ${props.userData.firstName} ${props.userData.lastName}`);
  });

  describe('the Logout button', () => {
    it('should render a button to direct back to the root route', () => {
      const wrapper = shallow(<DashboardHeader {...props} />);
      const logoutButton = wrapper.find('Link');
      expect(logoutButton.props().to).toBe('/');
      expect(logoutButton.props().children.type).toBe('button');
    });
  });
});

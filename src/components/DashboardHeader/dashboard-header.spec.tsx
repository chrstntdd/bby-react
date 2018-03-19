import * as React from 'react';
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
    it('should render a Logout button', () => {
      const wrapper = shallow(<DashboardHeader {...props} />);
      const logoutButton = wrapper.find('Link');
      expect(logoutButton.props().to).toBe('/logout');
      expect(logoutButton.props().children.type).toBe('button');
    });
    it('should render a direct to /logout', () => {
      const context = createRouterContext();

      const props = {
        history: []
      };
      const instance = mount(
        <Router context={context}>
          <DashboardHeader {...props} />
        </Router>
      );
      const router = instance.find('Router');
      const button = instance.find('button');
      expect(router.props().history.location.pathname).toBe('/');
      button.simulate('click', { button: 0 });
      expect(router.props().history.location.pathname).toBe('/logout');
    });
  });
});

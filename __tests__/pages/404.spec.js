import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';

import NotFound from '../../src/components/pages/not-found.jsx';

describe('<NotFound/>', () => {
  it('should render without crashing', () => {
    shallow(<NotFound />);
  });
  it('should respond render an svg', () => {
    const wrapper = shallow(<NotFound />);
    const svg = wrapper.find('svg');
    expect(svg).not.toBe.apply(null);
  });
  describe('the back to safety button', () => {
    it('should route the user back to the dashboard', () => {
      const context = createRouterContext();

      const props = {
        history: []
      };
      const instance = mount(
        <Router context={context}>
          <NotFound {...props} />
        </Router>
      );
      const button = instance.find('#safety');
      const router = instance.find('Router');

      expect(router.props().history.length).toBe(1);
      expect(router.props().history.location.pathname).toBe('/');
      button.simulate('click');
      expect(router.props().history.length).toBe(2);
      expect(router.props().history.location.pathname).toBe('/dashboard');
    });
  });
});

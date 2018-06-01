import React from 'react';
import { shallow } from 'enzyme';

jest.useFakeTimers();

import ConnectedDashboard, { Dashboard } from './';

const requiredProps = {
  syncToDatabase: jest.fn(),
  printTable: jest.fn(),
  formatTable: jest.fn(),
  clearTable: jest.fn(),
  shuffleTable: jest.fn()
};

describe('<Dashboard/>', () => {
  it('should render without crashing', () => {
    shallow(<Dashboard {...requiredProps} />);
  });

  describe('componentDidMount method', () => {
    let render;
    beforeAll(() => {
      render = Dashboard.prototype.render;
      Dashboard.prototype.render = jest.fn();
    });

    afterAll(() => {
      Dashboard.prototype.render = render;
    });

    describe('when the component has products  ', () => {
      it('should call syncToDatabase method after 5 minutes and set the intervalId', () => {
        const wrapper = shallow(<Dashboard {...requiredProps} products={[{ test: 1 }]} />);

        jest.runOnlyPendingTimers();

        expect(wrapper.instance().intervalId).not.toBeNull();
        expect(wrapper.instance().intervalId).toEqual(expect.any(Number));
        expect(wrapper.instance().props.syncToDatabase).toHaveBeenCalledTimes(1);
      });
    });

    describe('when the component does not have any products', () => {
      it('should do nothing', () => {
        const wrapper = shallow(<Dashboard {...requiredProps} />);

        expect(wrapper.instance().intervalId).toBeNull();
      });
    });
  });

  describe('componentWillUnmount method', () => {
    let render;
    let componentDidMount;
    let clearInterval;
    beforeAll(() => {
      render = Dashboard.prototype.render;
      componentDidMount = Dashboard.prototype.componentDidMount;
      clearInterval = window.clearInterval;

      Dashboard.prototype.render = jest.fn();
      Dashboard.prototype.componentDidMount = jest.fn();
      window.clearInterval = jest.fn();
    });

    afterAll(() => {
      Dashboard.prototype.render = render;
      Dashboard.prototype.componentDidMount = componentDidMount;
      window.clearInterval = clearInterval;
    });

    afterEach(() => {
      window.clearInterval.mockClear();
    });

    describe('when there is a timer property set', () => {
      it('should call window.clearInterval', () => {
        const dashboard = new Dashboard({ ...requiredProps, products: [{ test: 1 }] });
        dashboard.intervalId = 1;

        dashboard.componentWillUnmount();

        expect(dashboard.intervalId).toBeNull();
        expect(window.clearInterval).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there is **NOT** a timer property set', () => {
      it('should do nothing', () => {
        const dashboard = new Dashboard({ ...requiredProps });

        dashboard.componentWillUnmount();

        expect(dashboard.intervalId).toBeNull();
        expect(window.clearInterval).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('render method', () => {
    let componentDidMount;
    beforeAll(() => {
      componentDidMount = Dashboard.prototype.componentDidMount;
      Dashboard.prototype.componentDidMount = jest.fn();
    });

    afterAll(() => {
      Dashboard.prototype.componentDidMount = componentDidMount;
    });
    it('should render the dashboard', () => {
      const wrapper = shallow(<Dashboard {...requiredProps} />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});

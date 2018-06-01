import React from "react";
import { shallow } from "enzyme";

import { Register } from "./";

window.scroll = jest.fn();

describe("<Register/>", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Register />);

    expect(wrapper).toMatchSnapshot();
  });
});

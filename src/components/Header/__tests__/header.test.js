import React from 'react';
import Header from '../header.js';
import { shallow } from 'enzyme';

describe('Header', () => {
  it('header renders without crashing', () => {
    const wrapper = shallow(
      <Header route="/"/>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});




import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

it('renders Navigation component', () => {
  expect(shallow(<App />)).toMatchSnapshot();
});

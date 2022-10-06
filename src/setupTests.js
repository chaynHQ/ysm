/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
// For some reason require works here and not others
// TODO fix this and use better syntax
require('jsdom-global/register');

// See issue about mutation observer
// https://stackoverflow.com/questions/48809753/testing-mutationobserver-with-jest
// Just doesn't support mutation observer so I am just adding a mock
const mutationObserverMock = jest.fn(function MutationObserver(callback) {
  this.observe = jest.fn();
  this.disconnect = jest.fn();
  // Optionally add a trigger() method to manually trigger a change
  this.trigger = (mockedMutationsList) => {
    callback(mockedMutationsList, this);
  };
});
global.MutationObserver = mutationObserverMock;

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });

import ysmApp from '../store/reducers';
// import * as types from '../store/types';

// import themes from './fixtures/themes';
// import resources from './fixtures/resources';

const initialState = { resources: [], themes: [], user: {} };

describe('themes reducer', () => {
  it('should return the initial state', () => {
    expect(ysmApp(undefined, {})).toEqual(initialState);
  });
});

describe('resources reducer', () => {
  it('should return the initial state', () => {
    expect(ysmApp(undefined, {})).toEqual(initialState);
  });
});

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(ysmApp(undefined, {})).toEqual(initialState);
  });
});

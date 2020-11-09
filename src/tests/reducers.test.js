import ysmApp from '../store/reducers';
import * as types from '../store/types';

// import themes from './fixtures/themes';
// import resources from './fixtures/resources';

const initialState = { user: {} };

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(ysmApp(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_USER_SIGNIN', () => {
    const data = {
      xa: 'token',
      otherdata: 'data',
    };
    expect(
      ysmApp({ user: {} }, {
        type: types.SET_USER_SIGNIN,
        data,
      }),
    ).toEqual({
      user: data,
    });
  });

  it('should handle SET_SETTINGS_AUTH', () => {
    const data = {
      xa: 'token',
      otherdata: 'data',
    };
    // already populated reducer
    expect(
      ysmApp({ user: data }, {
        type: types.SET_SETTINGS_AUTH,
        data: true,
      }),
    ).toEqual({
      user: { ...data, settingsAuth: true },
    });

    // empty reducer
    expect(
      ysmApp({ user: {} }, {
        type: types.SET_SETTINGS_AUTH,
        data: false,
      }),
    ).toEqual({
      user: { settingsAuth: false },
    });
  });

  it('should handle SET_PREVIEW_MODE', () => {
    const data = {
      xa: 'token',
      otherdata: 'data',
    };
    // already populated reducer
    expect(
      ysmApp({ user: data }, {
        type: types.SET_PREVIEW_MODE,
        data: true,
      }),
    ).toEqual({
      user: { ...data, previewMode: true },
    });

    // empty reducer
    expect(
      ysmApp({ user: {} }, {
        type: types.SET_PREVIEW_MODE,
        data: false,
      }),
    ).toEqual({
      user: { previewMode: false },
    });
  });

  it('should handle DELETE_BOOKMARK', () => {
    const data = {
      xa: 'token',
      otherdata: 'data',
    };
    // already populated reducer
    expect(
      ysmApp({ user: { ...data, bookmarkedResources: ['bookmarkSlug1', 'bookmarkSlug2'] } }, {
        type: types.DELETE_BOOKMARK,
        data: 'bookmarkSlug1',
      }),
    ).toEqual({
      user: { ...data, bookmarkedResources: ['bookmarkSlug2'] },
    });

    // empty reducer
    expect(
      ysmApp({ user: { bookmarkedResources: [] } }, {
        type: types.DELETE_BOOKMARK,
        data: 'bookmarkSlug1',
      }),
    ).toEqual({
      user: { bookmarkedResources: [] },
    });

    // removing when it doesn't exist
    expect(
      ysmApp({ user: { bookmarkedResources: ['bookmarkSlug2'] } }, {
        type: types.DELETE_BOOKMARK,
        data: 'bookmarkSlug1',
      }),
    ).toEqual({
      user: { bookmarkedResources: ['bookmarkSlug2'] },
    });
  });

  it('should handle SET_BOOKMARK', () => {
    const data = {
      xa: 'token',
      otherdata: 'data',
    };
    // already populated reducer
    expect(
      ysmApp({ user: { ...data, bookmarkedResources: ['bookmarkSlug1', 'bookmarkSlug2'] } }, {
        type: types.SET_BOOKMARK,
        data: 'bookmarkSlug1',
      }),
    ).toEqual({
      user: { ...data, bookmarkedResources: ['bookmarkSlug1', 'bookmarkSlug2'] },
    });

    // empty reducer
    expect(
      ysmApp({ user: { } }, {
        type: types.SET_BOOKMARK,
        data: 'bookmarkSlug1',
      }),
    ).toEqual({
      user: { bookmarkedResources: ['bookmarkSlug1'] },
    });

    // adding when it doesn't exist
    expect(
      ysmApp({ user: { bookmarkedResources: ['bookmarkSlug1'] } }, {
        type: types.SET_BOOKMARK,
        data: 'bookmarkSlug2',
      }),
    ).toEqual({
      user: { bookmarkedResources: ['bookmarkSlug1', 'bookmarkSlug2'] },
    });
  });
});

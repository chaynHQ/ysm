import { useMemo } from 'react';
import { createStore } from 'redux';
import ysmApp from './reducers';

let tempStore;

function initStore(initialState) {
  return createStore(
    ysmApp,
    initialState,
  );
}

export const initializeStore = (preloadedState) => {
  let _store = tempStore ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && tempStore) {
    _store = initStore({
      ...tempStore.getState(),
      ...preloadedState,
    });
    // Reset the current store
    tempStore = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!tempStore) tempStore = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

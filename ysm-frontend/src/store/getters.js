import _isEmpty from 'lodash-es/isEmpty';

export default {
  filterOptionsForField: (state) => (field) => {
    return state.filterOptions?.[field]?.options ?? {};
  },

  filterIsActive: (state) => (field, value) => {
    return state.filters[field]?.includes(value);
  },

  hasAnyFilters: (state) => !_isEmpty(state.filters),

  contentItem: (state) => (id) => {
    return state.resource?.content.find((i) => i.id === id);
  },

  previousContentItem: (state) => (currentId) => {
    if (!state.resource) {
      return null;
    }

    let item = null;
    state.resource.content.forEach((i, ix, arr) => {
      if (i.id === currentId && ix !== 0) {
        item = arr[ix - 1];
      }
    });
    return item;
  },

  nextContentItem: (state) => (currentId) => {
    if (!state.resource) {
      return null;
    }

    let item = null;
    state.resource.content.forEach((i, ix, arr) => {
      if (i.id === currentId && ix !== arr.length - 1) {
        item = arr[ix + 1];
      }
    });
    return item;
  },
};

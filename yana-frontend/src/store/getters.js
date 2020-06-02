import _isEmpty from 'lodash-es/isEmpty';

export default {
  filterOptionsForField: (state) => (field) => {
    return state.filterOptions?.[field]?.options ?? {};
  },

  filterIsActive: (state) => (field, value) => {
    return state.filters[field]?.includes(value);
  },

  hasAnyFilters: (state) => !_isEmpty(state.filters),
};

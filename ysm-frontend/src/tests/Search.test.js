import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { TextField } from '@material-ui/core';
import mockAxios from 'axios';
import Search from '../components/Search';
import resources from './fixtures/resources';
import ResourceCard from '../components/ResourceCard';

describe('Search', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    jest.clearAllMocks();
    shallow = createShallow();
  });

  it('renders with instructional text', () => {
    wrapper = shallow(
      <Search />,
    );
    expect(wrapper.contains('Use the box above to search')).toEqual(true);
  });

  const runAllPromises = () => new Promise(setImmediate);

  it('searches on enter press with searchTerm', async () => {
    jest.mock('../store/axios');
    wrapper = shallow(
      <Search />,
    );

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: resources }));

    wrapper.find(TextField).simulate('change', { target: { value: 'H' } });
    wrapper.update();
    wrapper.find(TextField).simulate('keypress', { key: 'Enter' });
    wrapper.update();

    await runAllPromises();
    wrapper.update();
    expect(wrapper.find(ResourceCard)).toHaveLength(resources.length);
  });

});

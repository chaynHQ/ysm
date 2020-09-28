import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import LinkUi from '@material-ui/core/Link';
import Item from '../components/Item';

import richTextHelper from '../shared/rich-text';

jest.mock('../shared/rich-text');

describe('Item', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with a link when type is external link', () => {
    wrapper = shallow(
      <Item
        item={{ type: 'external_link', title: 'Item title' }}
      />,
    );

    expect(wrapper.find(LinkUi)).toHaveLength(1);
  });

  it('renders the content when type is not external link', () => {
    wrapper = shallow(
      <Item
        item={{
          type: 'note',
          title: 'Item title',
          content: {
            type: 'doc',
            content: [{}, {}],
          },
        }}
      />,
    );
    expect(richTextHelper).toHaveBeenCalledTimes(1);
  });
});

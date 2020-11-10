import {
  Accordion, Button, Card, Checkbox, List, ListItem,
} from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import ReactPlayer from 'react-player';
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

    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('renders the content when type is note', () => {
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
    expect(richTextHelper).toHaveBeenCalledTimes(3);
  });

  it('renders the content when type is plain list', () => {
    const item = {
      type: 'list',
      render_as: 'plain',
      title: 'Item title',
      content: {
        type: 'doc',
        content: [{}, {}],
      },
      items: [{
        title: 'list item 1',
      }, {
        title: 'list item 2',
      },
      ],
    };
    wrapper = shallow(
      <Item
        item={item}
      />,
    );
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(item.items.length);
  });

  it('renders the content when type is cards list', () => {
    const item = {
      type: 'list',
      render_as: 'cards',
      title: 'Item title',
      content: {
        type: 'doc',
        content: [{}, {}],
      },
      items: [{
        title: 'list item 1',
      }, {
        title: 'list item 2',
      },
      ],
    };
    wrapper = shallow(
      <Item
        item={item}
      />,
    );
    expect(wrapper.find(Card)).toHaveLength(item.items.length);
  });

  it('renders the content when type is accordion list', () => {
    const item = {
      type: 'list',
      render_as: 'accordion',
      title: 'Item title',
      content: {
        type: 'doc',
        content: [{}, {}],
      },
      items: [{
        title: 'list item 1',
      }, {
        title: 'list item 2',
      },
      ],
    };
    wrapper = shallow(
      <Item
        item={item}
      />,
    );
    expect(wrapper.find(Accordion)).toHaveLength(item.items.length);
  });

  it('renders the content when type is checklist list', () => {
    const item = {
      type: 'list',
      render_as: 'checklist',
      title: 'Item title',
      content: {
        type: 'doc',
        content: [{}, {}],
      },
      items: [{
        title: 'list item 1',
      }, {
        title: 'list item 2',
      },
      ],
    };
    wrapper = shallow(
      <Item
        item={item}
      />,
    );
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(item.items.length);
    expect(wrapper.find(Checkbox)).toHaveLength(item.items.length);
  });

  it('renders the content when type is audio', () => {
    const item = {
      type: 'audio',
      title: 'Item title',
      url: 'some-url',
    };
    wrapper = shallow(
      <Item
        item={item}
      />,
    );

    expect(wrapper.find(ReactPlayer)).toHaveLength(1);
  });

  it('renders the content when type is video', () => {
    const item = {
      type: 'video',
      title: 'Item title',
      url: 'some-url',
    };
    wrapper = shallow(
      <Item
        item={item}
      />,
    );

    expect(wrapper.find(ReactPlayer)).toHaveLength(1);
  });
});

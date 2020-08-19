import configureMockStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';
import thunk from 'redux-thunk';
import React from 'react';
import Link from '@material-ui/core/Link';
import { Card } from '@material-ui/core';
import Theme from '../components/Theme';
import themes from './fixtures/themes';
import resources from './fixtures/resources';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Theme', () => {
  let wrapper;
  let shallow;
  //   let fetchThemesOnRenderMock;
  //   let fetchResourcesOnRenderMock;

  beforeEach(() => {
    jest.clearAllMocks();
    shallow = createShallow();
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    // fetchThemesOnRenderMock = jest.fn();
    // fetchResourcesOnRenderMock = jest.fn();
  });

  it('renders with correct number of links when theme and resources are both not empty', () => {
    wrapper = shallow(
      <Theme
        store={mockStore({ themes, resources })}
        match={{
          params: {
            themeSlug: themes[0].slug,
          },
        }}
      />,
    ).dive().dive();

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Card)).toHaveLength(themes.length + 1);
  });

  //   it('calls the correct actions and displays no cards when theme does not exist', () => {
  //     wrapper = shallow(
  //         <Theme
  //           store={mockStore({ themes, resources })}
  //           match={{params: {
  //               themeSlug: 'Something something'
  //           }}}
  //           fetchThemesOnRender={fetchThemesOnRenderMock()}
  //           fetchResourcesOnRender={fetchResourcesOnRenderMock()}
  //         />,
  //       ).dive().dive();
  //       expect(fetchThemesOnRenderMock.mock.calls.length).toBe(1);
  //       expect(fetchResourcesOnRenderMock.mock.calls.length).toBe(1);
  //       expect(wrapper.find(Card)).toHaveLength(0);
  //   })

//   it('calls the correct actions and displays only the header card
//  when theme exists, but resources does not', () => {
//     wrapper = shallow(
//         <Theme
//           store={mockStore({ themes, resources: [] })}
//           match={{params: {
//               themeSlug: themes[0].slug
//           }}}
//           fetchThemesOnRender={fetchThemesOnRenderMock()}
//           fetchResourcesOnRender={fetchResourcesOnRenderMock()}
//         />,
//       ).dive().dive();
//       expect(fetchThemesOnRenderMock.mock.calls.length).toBe(0);
//       expect(fetchResourcesOnRenderMock.mock.calls.length).toBe(1);
//       expect(wrapper.find(Card)).toHaveLength(1);
//   })
});

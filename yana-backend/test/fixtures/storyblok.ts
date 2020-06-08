export const storyblokResourcesListFixture = {
  stories: [
    {
      name: 'Mental Health Services',
      created_at: '2020-05-27T10:40:03.868Z',
      published_at: null,
      alternates: [],
      id: 12207237,
      uuid: '4c4c24ae-966b-476f-abd9-b6b3a2e75b92',
      content: {
        _uid: 'f715192a-fe7d-48e7-96cf-2166d03d8526',
        icon: 'link-2-outline',
        subtitle: '',
        component: 'resource',
        countries: ['GB'],
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Here you can find mental health services applicable to you.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
      slug: 'mental-health-services',
      full_slug: 'resources/mental-health-services',
      sort_by_date: null,
      position: -20,
      tag_list: [],
      is_startpage: false,
      parent_id: 11830512,
      meta_data: null,
      group_id: '18745933-b934-4faa-a2f6-d23d5af9366b',
      first_published_at: null,
      release_id: null,
      lang: 'default',
      path: null,
      translated_slugs: [],
    },
    {
      name: 'Another test',
      created_at: '2020-05-26T09:43:23.678Z',
      published_at: null,
      alternates: [],
      id: 12101418,
      uuid: '9f1b48d5-7299-432d-b3ee-29f1855a4363',
      content: {
        _uid: '5f468144-0c14-4b40-b230-2ccd34ada1ed',
        icon: 'file-outline',
        subtitle: '',
        component: 'resource',
        countries: ['GLOBAL', 'GB'],
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'This is yet another test resource for you.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
      slug: 'another-test',
      full_slug: 'resources/another-test',
      sort_by_date: null,
      position: -10,
      tag_list: [],
      is_startpage: false,
      parent_id: 11830512,
      meta_data: null,
      group_id: '92ee0fd3-77b9-4ad5-a98c-ca5dd9acb336',
      first_published_at: null,
      release_id: null,
      lang: 'default',
      path: null,
      translated_slugs: [],
    },
    {
      name: 'Test 1',
      created_at: '2020-05-20T10:44:58.271Z',
      published_at: null,
      alternates: [],
      id: 11839563,
      uuid: '020e96d7-f1d3-4dc2-954e-3988cdd57efa',
      content: {
        _uid: '6eeb71ba-e883-41d2-98be-480a279c7c67',
        icon: 'file-outline',
        subtitle: 'This is a test resource',
        component: 'resource',
        countries: ['GLOBAL'],
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'I like this resource very very much!',
                  type: 'text',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Hello World!',
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      slug: 'test-1',
      full_slug: 'resources/test-1',
      sort_by_date: null,
      position: 0,
      tag_list: [],
      is_startpage: false,
      parent_id: 11830512,
      meta_data: null,
      group_id: '4c7e4729-e314-4a12-a73c-220f737c92e1',
      first_published_at: null,
      release_id: null,
      lang: 'default',
      path: null,
      translated_slugs: [],
    },
  ],
};

export const storyblokSingleResourceFixture = {
  story: {
    name: 'Mental Health Services',
    created_at: '2020-05-27T10:40:03.868Z',
    published_at: null,
    alternates: [],
    id: 12207237,
    uuid: '4c4c24ae-966b-476f-abd9-b6b3a2e75b92',
    content: {
      _uid: 'f715192a-fe7d-48e7-96cf-2166d03d8526',
      icon: 'link-2-outline',
      subtitle: '',
      component: 'resource',
      countries: ['GB'],
      description: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'Here you can find mental health services applicable to you.',
                type: 'text',
              },
            ],
          },
        ],
      },
      content_items: [
        {
          _uid: '4c74945e-9a62-42ac-9e71-fbb8252db29b',
          item: [
            {
              _uid: '48583500-2ece-4188-9c76-1d60f9a50579',
              link:
                'https://www.nhs.uk/using-the-nhs/nhs-services/mental-health-services/how-to-access-mental-health-services/',
              component: 'external_link',
            },
          ],
          title: 'NHS - How to access mental health services',
          component: 'content_item',
        },
      ],
    },
    slug: 'mental-health-services',
    full_slug: 'resources/mental-health-services',
    sort_by_date: null,
    position: -20,
    tag_list: [],
    is_startpage: false,
    parent_id: 11830512,
    meta_data: null,
    group_id: '18745933-b934-4faa-a2f6-d23d5af9366b',
    first_published_at: null,
    release_id: null,
    lang: 'default',
    path: null,
    translated_slugs: [],
  },
};

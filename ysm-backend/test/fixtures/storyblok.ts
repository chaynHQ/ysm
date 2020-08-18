export const storyblokTagsFixture = {
  tags: [
    { name: 'Health', taggings_count: 1 },
    { name: 'Timeline', taggings_count: 0 },
  ],
};

export const storyblokDatasourceEntriesCountriesFixture = {
  datasource_entries: [
    {
      id: 123,
      name: 'Global',
      value: 'GLOBAL',
    },
    {
      id: 234,
      name: 'United Kingdom',
      value: 'GB',
    },
  ],
};

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
        enabled: true,
        featured: false,
        image: 'http://a-storyblok-url-to-the-image-asset',
        themes: ['4a594a9c-424e-4668-a94f-23acc2e9561e'],
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
      tag_list: ['Health'],
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
        enabled: true,
        featured: true,
        image: 'http://a-storyblok-url-to-the-image-asset',
        themes: ['4a594a9c-424e-4668-a94f-23acc2e9561e'],
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
        enabled: true,
        featured: false,
        image: 'http://a-storyblok-url-to-the-image-asset',
        themes: ['4a594a9c-424e-4668-a94f-23acc2e9561e'],
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
                  text: 'This the test 1 resource',
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
      enabled: true,
      featured: false,
      image: 'http://a-storyblok-url-to-the-image-asset',
      themes: ['4a594a9c-424e-4668-a94f-23acc2e9561e'],
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
          description: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    text: 'This is the NHS mental health services link',
                    type: 'text',
                  },
                ],
              },
            ],
          },
        },
        {
          _uid: 'c9fbf48f-d7fa-4b4c-904f-b564433efc67',
          item: [
            {
              _uid: 'dcccc47b-ebb6-4fcb-be08-309ac725ea09',
              content: {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        type: 'text',
                        marks: [
                          {
                            type: 'italic',
                          },
                        ],
                      },
                      {
                        text: 'placerat',
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
              component: 'note',
            },
          ],
          title: 'Day 1 - Breathe',
          component: 'content_item',
          description: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    text: "Today, you'll learn how to breathe to create more space in your life.",
                    type: 'text',
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    slug: 'mental-health-services',
    full_slug: 'resources/mental-health-services',
    sort_by_date: null,
    position: -20,
    tag_list: ['Health'],
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

export const storyblokSingleResourceDisabledFixture = {
  story: {
    name: 'Mental Health Services',
    created_at: '2020-05-27T10:40:03.868Z',
    published_at: null,
    alternates: [],
    id: 12207237,
    uuid: '4c4c24ae-966b-476f-abd9-b6b3a2e75b92',
    content: {
      _uid: 'f715192a-fe7d-48e7-96cf-2166d03d8526',
      enabled: false,
      featured: false,
      image: 'http://a-storyblok-url-to-the-image-asset',
      themes: ['4a594a9c-424e-4668-a94f-23acc2e9561e'],
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
          description: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    text: 'This is the NHS mental health services link',
                    type: 'text',
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    slug: 'mental-health-services-disabled',
    full_slug: 'resources/mental-health-services-disabled',
    sort_by_date: null,
    position: -20,
    tag_list: ['Health'],
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

export const storyblokThemesListFixture = {
  stories: [
    {
      name: 'For Your Mind',
      created_at: '2020-07-13T13:30:46.190Z',
      published_at: null,
      alternates: [],
      id: 15360264,
      uuid: '4a594a9c-424e-4668-a94f-23acc2e9561e',
      content: {
        _uid: '43905e88-93ce-41cf-b029-e7925d758895',
        component: 'theme',
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Focus on your ',
                  type: 'text',
                },
                {
                  text: 'recovery',
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                },
                {
                  text: ' by focusing on your mind.',
                  type: 'text',
                },
              ],
            },
          ],
        },
        image: 'http://a-storyblok-url-to-the-image-asset',
      },
      slug: 'mind',
      full_slug: 'themes/mind',
      default_full_slug: null,
      sort_by_date: null,
      position: 0,
      tag_list: [],
      is_startpage: false,
      parent_id: 15360212,
      meta_data: null,
      group_id: '87ed42ba-c5e6-4a86-aa1a-3e7584a59b29',
      first_published_at: null,
      release_id: null,
      lang: 'default',
      path: null,
      translated_slugs: [],
    },
  ],
};

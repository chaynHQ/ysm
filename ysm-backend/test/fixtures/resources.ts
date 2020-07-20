import { Resource } from 'src/resources/resource.types';

export const resourcesListFixture: Resource[] = [
  {
    id: '4c4c24ae-966b-476f-abd9-b6b3a2e75b92',
    slug: 'mental-health-services',
    title: 'Mental Health Services',
    icon: 'link-2-outline',
    subtitle: null,
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
    themes: ['4a594a9c-424e-4668-a94f-23acc2e9561e'],
    tags: ['Health'],
    countries: ['GB'],
  },
  {
    id: '9f1b48d5-7299-432d-b3ee-29f1855a4363',
    slug: 'another-test',
    title: 'Another test',
    icon: 'file-outline',
    subtitle: null,
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
    themes: ['4a594a9c-424e-4668-a94f-23acc2e9561e'],
    tags: [],
    countries: ['GLOBAL', 'GB'],
  },
  {
    id: '020e96d7-f1d3-4dc2-954e-3988cdd57efa',
    slug: 'test-1',
    title: 'Test 1',
    icon: 'file-outline',
    subtitle: 'This is a test resource',
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
    themes: ['4a594a9c-424e-4668-a94f-23acc2e9561e'],
    tags: [],
    countries: ['GLOBAL'],
  },
];

export const singleResourceFixture: Resource = {
  id: '4c4c24ae-966b-476f-abd9-b6b3a2e75b92',
  slug: 'mental-health-services',
  title: 'Mental Health Services',
  icon: 'link-2-outline',
  subtitle: null,
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
  themes: ['4a594a9c-424e-4668-a94f-23acc2e9561e'],
  tags: ['Health'],
  countries: ['GB'],
  content: [
    {
      type: 'external_link',
      id: '4c74945e-9a62-42ac-9e71-fbb8252db29b',
      title: 'NHS - How to access mental health services',
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
      link:
        'https://www.nhs.uk/using-the-nhs/nhs-services/mental-health-services/how-to-access-mental-health-services/',
    },
    {
      type: 'note',
      id: 'c9fbf48f-d7fa-4b4c-904f-b564433efc67',
      title: 'Day 1 - Breathe',
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
    },
  ],
};

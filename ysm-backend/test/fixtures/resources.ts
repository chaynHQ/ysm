import { Resource } from 'src/resources/resource.types';

export const richTextPlaceholder = 'RICH TEXT PLACEHOLDER';

export const resourcesListFixture: Resource[] = [
  {
    id: '4c4c24ae-966b-476f-abd9-b6b3a2e75b92',
    slug: 'mental-health-services',
    title: 'Mental Health Services',
    icon: 'link-2-outline',
    subtitle: null,
    descriptionHtml: richTextPlaceholder,
    countries: ['GB'],
  },
  {
    id: '9f1b48d5-7299-432d-b3ee-29f1855a4363',
    slug: 'another-test',
    title: 'Another test',
    icon: 'file-outline',
    subtitle: null,
    descriptionHtml: richTextPlaceholder,
    countries: ['GLOBAL', 'GB'],
  },
  {
    id: '020e96d7-f1d3-4dc2-954e-3988cdd57efa',
    slug: 'test-1',
    title: 'Test 1',
    icon: 'file-outline',
    subtitle: 'This is a test resource',
    descriptionHtml: richTextPlaceholder,
    countries: ['GLOBAL'],
  },
];

export const singleResourceFixture: Resource = {
  id: '4c4c24ae-966b-476f-abd9-b6b3a2e75b92',
  slug: 'mental-health-services',
  title: 'Mental Health Services',
  icon: 'link-2-outline',
  subtitle: null,
  descriptionHtml: richTextPlaceholder,
  countries: ['GB'],
  content: [
    {
      type: 'external_link',
      id: '4c74945e-9a62-42ac-9e71-fbb8252db29b',
      title: 'NHS - How to access mental health services',
      descriptionHtml: richTextPlaceholder,
      link:
        'https://www.nhs.uk/using-the-nhs/nhs-services/mental-health-services/how-to-access-mental-health-services/',
    },
  ],
};

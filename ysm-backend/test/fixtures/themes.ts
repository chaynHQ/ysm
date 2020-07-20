import { Theme } from 'src/themes/theme.types';

export const themesListFixture: Theme[] = [
  {
    id: '4a594a9c-424e-4668-a94f-23acc2e9561e',
    slug: 'mind',
    title: 'For Your Mind',
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
  },
];

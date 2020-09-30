const themes = [{
  description: {
    type: 'doc',
    content: [{
      type: 'paragraph',
      content: [{
        type: 'text',
        text: 'Lorum Ipsum',
        marks: [{
          type: 'italic',
        }],
      }],
    }],
  },
  id: '123456',
  slug: 'theme-with-resources',
  title: 'Theme title',
  image: { alt: 'alt text', filename: 'file name' },
},
{
  description: {
    type: 'doc',
    content: [{
      type: 'paragraph',
      content: [{
        type: 'text',
        text: 'Lorum Ipsum',
        marks: [{
          type: 'italic',
        }],
      }],
    }],
  },
  id: '123456',
  slug: 'theme-without-resources',
  title: 'Theme title',
  image: { alt: 'alt text', filename: 'file name' },
}];

export default themes;

import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';

const richTextResolver = new RichTextResolver();

export const richTextMixin = {
  methods: {
    richText(content) {
      return richTextResolver.render(content);
    },
  },
};

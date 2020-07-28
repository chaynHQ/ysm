import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';

const richTextResolver = new RichTextResolver();

export function richTextHelper(content: any): any {
      return richTextResolver.render(content);
};
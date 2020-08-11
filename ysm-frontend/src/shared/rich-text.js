import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';

const richTextResolver = new RichTextResolver();

export default function richTextHelper(content) {
  console.log(content);
  return richTextResolver.render(content);
}

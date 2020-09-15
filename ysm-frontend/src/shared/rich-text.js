import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';
import ReactHtmlParser from 'react-html-parser';

const richTextResolver = new RichTextResolver();

export default function richTextHelper(content, transform) {
  return ReactHtmlParser(
    richTextResolver.render(content), { transform: (node) => transform(node) },
  );
}

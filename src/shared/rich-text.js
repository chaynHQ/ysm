import ReactHtmlParser from 'react-html-parser';
import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';

const richTextResolver = new RichTextResolver();

export default function richTextHelper(content, transform) {
  return ReactHtmlParser(
    richTextResolver.render(content), { transform: transform ? (node) => transform(node) : null },
  );
}

export function richTextHelperPlainHTML(content) {
  return richTextResolver.render(content);
}

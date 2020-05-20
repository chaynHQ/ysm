import { Injectable } from '@nestjs/common';
import _pickBy from 'lodash/pickBy';
import { RichtextInstance, StoryData } from 'storyblok-js-client';

import { ContentItem, Resource } from './resource';

@Injectable()
export class ResourceSerialiserService {
  private IGNORE_CONTENT_ITEM_FIELDS = ['_uid', 'component', '_editable'];

  serialise(story: StoryData, richTextResolver: RichtextInstance): Resource {
    let content: ContentItem[];

    if (story.content.content_items) {
      content = story.content.content_items.map((i) =>
        this.serialiseContentItem(i, richTextResolver),
      );
    }

    return {
      id: story.uuid,
      slug: story.slug,
      title: story.name,
      icon: story.content.icon,
      subtitle: story.content.subtitle || null,
      descriptionHtml: richTextResolver.render(story.content.description),
      content,
    };
  }

  private serialiseContentItem(
    contentItem: {
      [key: string]: any;
    },
    richTextResolver: RichtextInstance,
  ): ContentItem {
    const innerItem = contentItem.item[0];

    const extraFields = _pickBy(innerItem, (v, k) => !this.IGNORE_CONTENT_ITEM_FIELDS.includes(k));

    return {
      id: contentItem._uid,
      type: innerItem.component,
      title: contentItem.title,
      descriptionHtml: richTextResolver.render(contentItem.description),
      ...extraFields,
    };
  }
}

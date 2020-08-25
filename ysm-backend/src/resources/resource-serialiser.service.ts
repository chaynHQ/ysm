import { Injectable } from '@nestjs/common';
import _pickBy from 'lodash/pickBy';
import { StoryData } from 'storyblok-js-client';
import { ContentItem, Resource } from './resource.types';

@Injectable()
export class ResourceSerialiserService {
  private IGNORE_CONTENT_ITEM_FIELDS = ['_uid', 'component', '_editable'];

  serialise(story: StoryData): Resource {
    let content: ContentItem[];

    if (story.content.content_items) {
      content = story.content.content_items.map((i) => this.serialiseContentItem(i));
    }

    return {
      id: story.uuid,
      slug: story.slug,
      featured: !!story.content.featured,
      image: story.content.image,
      title: story.name,
      subtitle: story.content.subtitle || null,
      description: story.content.description,
      themes: story.content.themes,
      tags: story.tag_list,
      countries: story.content.countries,
      languages: story.content.languages,
      content,
    };
  }

  private serialiseContentItem(contentItem: Record<string, any>): ContentItem {
    const innerItem = contentItem.item[0];

    const extraFields = _pickBy(innerItem, (v, k) => !this.IGNORE_CONTENT_ITEM_FIELDS.includes(k));

    return {
      id: contentItem._uid,
      type: innerItem.component,
      title: contentItem.title,
      description: contentItem.description,
      ...extraFields,
    };
  }
}

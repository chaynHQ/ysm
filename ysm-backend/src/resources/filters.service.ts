import { Injectable } from '@nestjs/common';
import _mapValues from 'lodash/mapValues';
import StoryblokClient from 'storyblok-js-client';
import { FilterOptions } from './filters.types';

@Injectable()
export class FiltersService {
  TAGS_FILTER_FIELD = 'tags';

  private DEFAULT_OPERATOR = 'in_array';

  private OPERATOR_OVERRIDE = {};

  async options(storyblok: StoryblokClient): Promise<FilterOptions[]> {
    const tags = this.fromTags(storyblok);

    const countries: Promise<FilterOptions> = this.fromDataSourceEntries(
      storyblok,
      'countries',
      'Countries',
    );

    const languages: Promise<FilterOptions> = this.fromDataSourceEntries(
      storyblok,
      'languages',
      'Languages',
    );

    return Promise.all([tags, countries, languages]);
  }

  // Adds in the intermediate operator required by Storyblok in the `filter_query`.
  //
  // E.g. transforms:
  //    { foo: 'bar', a: 'b' }
  // to:
  //    { foo: { '<op>': 'bar' }, a: { '<op>': 'b' } }
  // where <op> is either the default operator, or the operator override for that specific field.
  mapFilters(filters: Record<string, string>): Record<string, Record<string, string>> {
    if (!filters) {
      return undefined;
    }

    return _mapValues(filters, (v, k) => {
      const op = this.OPERATOR_OVERRIDE[k] || this.DEFAULT_OPERATOR;
      return { [op]: v };
    });
  }

  private async fromTags(storyblok: StoryblokClient): Promise<FilterOptions> {
    return storyblok.get('cdn/tags', { version: 'draft' }).then(
      (response): FilterOptions => {
        const options: Record<string, string> = response.data.tags.reduce((acc, t) => {
          const name: string = t.name;
          acc[name] = name;
          return acc;
        }, {});
        return {
          title: 'Tags',
          field: this.TAGS_FILTER_FIELD,
          options,
        };
      },
    );
  }

  private async fromDataSourceEntries(
    storyblok: StoryblokClient,
    field: string,
    title: string,
  ): Promise<FilterOptions> {
    return storyblok
      .get('cdn/datasource_entries', {
        datasource: field,
      })
      .then((response) => {
        const options: Record<string, string> = response.data.datasource_entries.reduce(
          (acc, e) => {
            const name: string = e.name;
            const value: string = e.value;
            acc[value] = name;
            return acc;
          },
          {},
        );
        return {
          title,
          field,
          options,
        };
      });
  }
}

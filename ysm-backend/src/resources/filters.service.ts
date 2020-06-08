import { Injectable } from '@nestjs/common';
import _mapValues from 'lodash/mapValues';

@Injectable()
export class FiltersService {
  DEFAULT_OPERATOR = 'in';

  OPERATOR_OVERRIDE = {
    countries: 'in_array',
  };

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
}

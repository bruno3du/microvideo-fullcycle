import {
  SearchParamsConstructorProps,
  SortDirection,
} from '../../core/shared/domain/repository/search-params';

export class SearchParamsInput<Filter = string>
  implements SearchParamsConstructorProps<Filter>
{
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: Filter;

  constructor(props: SearchParamsConstructorProps<Filter>) {
    Object.assign(this, props);
  }
}

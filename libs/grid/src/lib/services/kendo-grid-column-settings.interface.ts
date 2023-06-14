import { NestedKeyOf } from './nested-keyof';

export interface KendoGridColumnSettings<T extends object> {
  field: NestedKeyOf<T>;
  title?: string;
  filter?: 'string' | 'numeric' | 'date' | 'boolean';
  format?: string;
  width?: number;
  _width?: number;
  filterable?: boolean;
  sortable?: boolean;
  orderIndex?: number;
  hidden?: boolean;
  autoSize?: boolean;

  /** Custom <zen-grid> column settings */
  custom?: {
    currency?: boolean | 'cents';
    preformatted?: boolean;
    html?: boolean;
    display?: NestedKeyOf<T> | ((item: T) => any);
  };
}

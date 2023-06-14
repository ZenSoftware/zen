import { GroupDescriptor, State } from '@progress/kendo-data-query';

import { KendoGridColumnSettings } from './kendo-grid-column-settings.interface';
import { NestedKeyOf } from './nested-keyof';

export interface SortDescriptor<T extends object> {
  field: NestedKeyOf<T>;
  dir: 'asc' | 'desc';
}

export interface KendoGridSettings<T extends object> {
  columnsConfig: KendoGridColumnSettings<T>[];
  state?: State & { sort?: Array<SortDescriptor<T>> };
  groups?: GroupDescriptor[];
  showGroups?: boolean;
  rowColorStyles?: Array<{ hexColor: string; condition: (item: T) => boolean }>;
  expandedDetailKeys?: any[];
}

import { Injectable } from '@angular/core';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';

import { KendoGridSettings } from './kendo-grid-settings.interface';

@Injectable()
export class KendoToPrismaService {
  evalOperator(filter: FilterDescriptor) {
    const operator: any = {};

    let value;
    if (typeof filter.value === 'string') value = filter.value.toLowerCase();
    else value = filter.value;

    switch (filter.operator) {
      case 'eq':
        operator['equals'] = value;
        break;
      case 'neq':
        operator['not'] = { equals: value };
        break;
      case 'isnull':
        operator['equals'] = null;
        break;
      case 'isnotnull':
        operator['not'] = { equals: null };
        break;
      case 'lt':
        operator['lt'] = value;
        break;
      case 'lte':
        operator['lte'] = value;
        break;
      case 'gt':
        operator['gt'] = value;
        break;
      case 'gte':
        operator['gte'] = value;
        break;
      case 'startswith':
        operator['startsWith'] = value;
        break;
      case 'endswith':
        operator['endsWith'] = value;
        break;
      case 'contains':
        operator['contains'] = value;
        break;
      case 'doesnotcontain':
        operator['not'] = { contains: value };
        break;
      case 'isempty':
        operator['equals'] = '';
        break;
      case 'isnotempty':
        operator['not'] = { equals: '' };
        break;
    }

    return operator;
  }

  evalDescriptor(descriptor: FilterDescriptor) {
    const fieldSplit = (<string>descriptor.field).split('.');
    let next: any = {};
    const root = next;

    for (let i = 0; i < fieldSplit.length; i++) {
      const field = fieldSplit[i];

      if (i === fieldSplit.length - 1) {
        next[field] = this.evalOperator(descriptor);
        if (typeof descriptor.value === 'string') next[field]['mode'] = 'insensitive';
      } else {
        if (fieldSplit.length > 1) {
          next[field] = { is: {} };
          next = next[field]['is'];
        } else {
          next[field] = {};
          next = next[field];
        }
      }
    }

    return root;
  }

  evalWhere(filter: CompositeFilterDescriptor | undefined): any {
    if (filter && filter?.filters) {
      const where = [];

      for (const descriptor of filter.filters) {
        let result;
        if ((<CompositeFilterDescriptor>descriptor).filters) {
          result = this.evalWhere(descriptor as CompositeFilterDescriptor);
        } else {
          result = this.evalDescriptor(descriptor as FilterDescriptor);
        }
        where.push(result);
      }

      if (where.length === 1) {
        return where[0];
      } else if (where.length > 1) {
        if (filter.logic === 'or') return { OR: where };
        else return { AND: where };
      }
    }
  }

  evalOrderBy(settings: KendoGridSettings<any>) {
    const sorts = settings.state?.sort;
    const orderBy = [];

    if (sorts) {
      for (const sort of sorts) {
        if (sort.dir) {
          const fieldSplit = sort.field.split('.');
          let next: any = {};
          const root = next;

          for (let i = 0; i < fieldSplit.length; i++) {
            const field = fieldSplit[i];

            if (i === fieldSplit.length - 1) {
              const columnSettings = settings.columnsConfig.find(x => x.field === sort.field);

              if (columnSettings?.nullable) {
                next[field] = { sort: sort.dir };
              } else {
                next[field] = sort.dir;
              }
            } else {
              next[field] = {};
              next = next[field];
            }
          }

          orderBy.push(root);
        }
      }
    }

    if (orderBy.length) return orderBy;
    else return undefined;
  }

  /**
   * @description Data query adapter that converts a Kendo grid `State` object into a valid Prisma query
   */
  getVariables(settings: KendoGridSettings<any>) {
    return {
      where: this.evalWhere(settings.state?.filter),
      orderBy: this.evalOrderBy(settings),
      skip: settings.state?.skip,
      take: settings.state?.take,
    };
  }
}

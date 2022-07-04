import { Injectable } from '@angular/core';
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  SortDescriptor,
  State,
} from '@progress/kendo-data-query';

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
        next[field] = {};
        next = next[field];
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

  evalOrderBy(sorts: Array<SortDescriptor> | undefined) {
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
              next[field] = sort.dir;
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
   * @description Data query adapter to convert Kendo grid's state into a valid Prisma query
   */
  getVariables(state: State) {
    return {
      where: this.evalWhere(state?.filter),
      orderBy: this.evalOrderBy(state?.sort),
      skip: state?.skip,
      take: state?.take,
    };
  }
}

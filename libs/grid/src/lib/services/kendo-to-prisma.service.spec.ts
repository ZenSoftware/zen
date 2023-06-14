import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

import { KendoToPrismaService } from './kendo-to-prisma.service';

describe('KendoToPrismaService where variables', () => {
  let service: KendoToPrismaService;

  beforeEach(() => {
    service = new KendoToPrismaService();
  });

  it('should flatten', () => {
    const filter: CompositeFilterDescriptor = {
      filters: [
        {
          field: 'published',
          operator: 'eq',
          value: true,
        },
      ],
      logic: 'and',
    };

    const result = service.evalWhere(filter);

    expect(result).toEqual({
      published: {
        equals: true,
      },
    });
  });

  it('should construct OR array', () => {
    const filter: CompositeFilterDescriptor = {
      filters: [
        {
          field: 'published',
          operator: 'eq',
          value: true,
        },
        {
          field: 'text',
          operator: 'contains',
          value: 'sample',
        },
      ],
      logic: 'or',
    };

    const result = service.evalWhere(filter);

    expect(result).toEqual({
      OR: [
        {
          published: {
            equals: true,
          },
        },
        {
          text: {
            contains: 'sample',
            mode: 'insensitive',
          },
        },
      ],
    });
  });

  it('should construct AND array', () => {
    const filter: any = {
      filters: [
        {
          field: 'published',
          operator: 'eq',
          value: true,
        },
        {
          field: 'text',
          operator: 'contains',
          value: 'sample',
        },
      ],
    };

    const result = service.evalWhere(filter);

    expect(result).toEqual({
      AND: [
        {
          published: {
            equals: true,
          },
        },
        {
          text: {
            contains: 'sample',
            mode: 'insensitive',
          },
        },
      ],
    });
  });

  it('should construct nested variables', () => {
    const filter: CompositeFilterDescriptor = {
      filters: [
        {
          field: 'published',
          operator: 'eq',
          value: true,
        },
        {
          filters: [
            {
              field: 'text',
              operator: 'contains',
              value: 'sample1',
            },
            {
              field: 'text',
              operator: 'contains',
              value: 'sample2',
            },
          ],
          logic: 'and',
        },
      ],
      logic: 'or',
    };

    const result = service.evalWhere(filter);

    expect(result).toEqual({
      OR: [
        {
          published: {
            equals: true,
          },
        },
        {
          AND: [
            {
              text: {
                contains: 'sample1',
                mode: 'insensitive',
              },
            },
            {
              text: {
                contains: 'sample2',
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
    });
  });

  it('should flatten nested variables', () => {
    const filter: CompositeFilterDescriptor = {
      filters: [
        {
          field: 'published',
          operator: 'eq',
          value: true,
        },
        {
          filters: [
            {
              field: 'text',
              operator: 'contains',
              value: 'sample',
            },
          ],
          logic: 'and',
        },
      ],
      logic: 'or',
    };

    const result = service.evalWhere(filter);

    expect(result).toEqual({
      OR: [
        {
          published: {
            equals: true,
          },
        },
        {
          text: {
            contains: 'sample',
            mode: 'insensitive',
          },
        },
      ],
    });
  });
});

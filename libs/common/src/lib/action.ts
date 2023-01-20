/**
 * Casl actions available for authorization.
 * This is intended to be extended as business requirements demand.
 */
export const Action = {
  manage: 'manage',
  create: 'create',
  read: 'read',
  update: 'update',
  delete: 'delete',
} as const;

export type Action = (typeof Action)[keyof typeof Action];

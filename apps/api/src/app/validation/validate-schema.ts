import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ZodSchema } from 'zod';

@Injectable()
export class SchemaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const schema = this.reflector.get<string[]>(
      'schema',
      context.getHandler()
    ) as unknown as ZodSchema;
    if (!schema) return true;
    const args = context.getArgs()?.[1];
    console.log('args', args);
    if (!args) return true;
    await schema.parse(args);
    return true;
  }
}

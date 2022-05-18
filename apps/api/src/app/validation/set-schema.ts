import { SetMetadata } from '@nestjs/common';

export const SetSchema = schema => SetMetadata('schema', schema);

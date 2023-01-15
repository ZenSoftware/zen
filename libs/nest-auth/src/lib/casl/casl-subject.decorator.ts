import { SetMetadata } from '@nestjs/common';

export const CASL_SUBJECT_KEY = 'CaslSubject';

export const CaslSubject = (subject: string) => SetMetadata(CASL_SUBJECT_KEY, subject);

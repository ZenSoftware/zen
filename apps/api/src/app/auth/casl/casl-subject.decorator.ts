import { SetMetadata } from '@nestjs/common';

export const SUBJECT_KEY = 'subject';

export const CaslSubject = (subject: string) => SetMetadata(SUBJECT_KEY, subject);

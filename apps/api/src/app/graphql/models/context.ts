import { Request, Response } from 'express';

export class IContext {
  req?: Request;
  res?: Response;
}

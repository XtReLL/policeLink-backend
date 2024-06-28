import { Request, Response } from 'express';

export interface RequestContextDataInterface {
  app: string;
  requestId: string;
  request: Request;
  response: Response;
}

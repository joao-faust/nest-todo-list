import { Request } from 'express';
import { TokenPayload } from '../login/login.types';

declare module 'http' {
  interface IncomingHttpHeaders {
    'x-access-token'?: string;
    'x-api-key'?: string;
  }
}

declare module 'express' {
  interface Request {
    user: TokenPayload;
  }
}

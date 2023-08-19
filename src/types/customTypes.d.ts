import { Request } from 'express';
import { UserRequestObject } from '../models/UserRequestObject';

declare global {
  namespace Express {
    interface Request {
      user: UserRequestObject; 
    }
  }
}

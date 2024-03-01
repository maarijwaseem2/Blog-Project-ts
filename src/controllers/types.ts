import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  userData?: {
    userId: string;
    // Add any other properties related to user data if needed
  };
}

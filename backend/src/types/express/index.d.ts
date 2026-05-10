import "express";

declare global {
  namespace Express {
    interface Request {
      sessionData?: {
        accountId: string;
      };
    }
  }
}

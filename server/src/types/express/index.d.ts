declare global {
  namespace Express {
    interface Request {
      validatedData?: unknown;
      user?: {
        _id: string;
        activeRole: 'client' | 'freelancer';
        iat: number;
        exp: number;
      };
    }
  }
}

export {};

import ValidateResponse from './src/types/ValidateResponse';

declare global {
  namespace Express {
    interface Request {
      user: ValidateResponse;
      files: File;
    }
  }
  interface File {
    data: File;
    cv: File;
    path: string;
    mv(filePath: string);
  }
}

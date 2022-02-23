import ValidateResponse from './src/types/ValidateResponse';

declare global {
    namespace Express {
        interface Request {
            user: ValidateResponse;
        }
    }
}

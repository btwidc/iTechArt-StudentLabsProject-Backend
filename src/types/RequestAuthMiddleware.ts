import { Request } from 'express';
import ValidateResponse from './ValidateResponse';

export interface RequestAuthMiddleware extends Request {
    user: ValidateResponse;
}

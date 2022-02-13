import ApiError from '../errors/ApiError';
import { Request, Response, NextFunction } from 'express';

const ApiErrorFun = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof ApiError) {
        return res
            .status((err as ApiError).status)
            .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Unexpected error' });
};

export default ApiErrorFun;

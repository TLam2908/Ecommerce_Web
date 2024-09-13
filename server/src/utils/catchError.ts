// This function use to catch the error from the controller and pass it to the error handler middleware.
import { Request, Response, NextFunction } from 'express';  


type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchErrors = (controller: AsyncController): AsyncController => 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            next(error);
            // next function will pass the error to the error handler middleware
        }
    }


export default catchErrors; 
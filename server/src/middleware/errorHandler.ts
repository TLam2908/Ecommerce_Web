import { z } from "zod";
import { ErrorRequestHandler, Response } from "express";
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from "../constants/http";
import AppError from "../utils/AppError";
import { clearAuthCookies } from "../utils/cookies";

const handleZodError = (res: Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
    }))
    return res.status(BAD_REQUEST).json({
       errors: errors,
       message: errors.map((err) => err.path + ": " + err.message).join(", ")
    })
}

const handleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    })
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}`, error);

    if (req.path === "/auth/refresh") {
        clearAuthCookies(res);
    }

    if (error instanceof z.ZodError) {
        return handleZodError(res, error);
    }

    if (error instanceof AppError) {
        return handleAppError(res, error);
    }

    res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
}

export default errorHandler
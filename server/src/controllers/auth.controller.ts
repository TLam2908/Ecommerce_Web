import catchErrors from "../utils/catchError";
import { setAuthCookies } from "../utils/cookies";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/http";

import { registerSchema } from "../validation/auth.validation";
import { loginSchema } from "../validation/auth.validation";
// if password and confirm password is not the same, 
// zod will throw an error and catchErrors will catch it and pass it to the error handler middleware.

export const registerHandler = catchErrors (
    async (req, res) => {
        // validate request
        const request = registerSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],
        });

        // call service
        const {safeUser, accessToken, refreshToken} = await createAccount(request);

        // return response
        return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).json(safeUser)
    }
)

export const loginHandler = catchErrors (
    async (req, res) => {
        // validate request
        const request = loginSchema.parse({...req.body, userAgent: req.headers["user-agent"]});
        // call service

        // return response
    }
)
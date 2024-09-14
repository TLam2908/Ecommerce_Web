import {z} from "zod";
import catchErrors from "../utils/catchError";
import { setAuthCookies } from "../utils/cookies";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/http";

const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
    name: z.string().min(1).max(255),
    userAgent: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Password and confirm password must be the same",
    path: ["confirmPassword"],
})

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
        const {user, accessToken, refreshToken} = await createAccount(request);

        // return response
        return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).json(user)
    }
)
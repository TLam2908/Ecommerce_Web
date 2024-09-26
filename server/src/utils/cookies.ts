import { CookieOptions, Response } from 'express';

const secure = process.env.NODE_ENV === "production";

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure
}

type Params = {
    res: Response;
    accessToken: string;
    refreshToken: string;
}

export const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
})

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    path: "/auth/refresh",
})

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions()).cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
    return res
}

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("accessToken").clearCookie("refreshToken", {
        path: "/auth/refresh"
    });
    return res
}
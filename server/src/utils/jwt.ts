import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";

export type RefreshTokenPayload = {
  sessionId: number;
};

export type AccessTokenPayload = {
  sessionId: number;
  user_id: number;
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

const accessTokenOptions: SignOptionsAndSecret = {
  expiresIn: "30m",
  secret: JWT_SECRET,
};

export const refreshTokenOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOptions } = options || accessTokenOptions;
  return jwt.sign(payload, secret, { ...defaults, ...signOptions });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload> (
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
    const { secret = JWT_SECRET, ...verifyOptions } = options || {};
    try {
        const payload = jwt.verify(token, secret, {...defaults, ...verifyOptions}) as TPayload
        return {
            payload
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
};

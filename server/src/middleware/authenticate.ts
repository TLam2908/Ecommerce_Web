import { RequestHandler } from 'express';
import appAssert from '../utils/appAssert';
import { UNAUTHORIZED } from '../constants/http';
import AppErrorCode from '../constants/appErrorCode';
import { verifyToken } from '../utils/jwt';

const authenticate: RequestHandler = (req, res, next) => {
    const accessToken = req.cookies.accessToken as string | undefined;
    appAssert(accessToken, UNAUTHORIZED, 'Not authenticated', AppErrorCode.InvalidAccessToken);

    const { error, payload } = verifyToken(accessToken);
    appAssert(payload, UNAUTHORIZED, error === 'jwt expried' ? 'Token expired' : 'Invalid token', AppErrorCode.InvalidAccessToken);

    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
    // delete session but if accessToken not expired -> authenticated
    // tell the express that the authentication is successful and move to the next middleware
    next()
}

export default authenticate
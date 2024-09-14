import { HttpStatusCode } from "../constants/http"
import AppErrorCode from "../constants/appErrorCode"

class AppError extends Error {
    constructor (
        public statusCode: HttpStatusCode,
        public message: string,
        public errorCode?: AppErrorCode
    ) {
        super(message)
    }
}

new AppError(200, 'msg')

export default AppError
//  Assert a condition and throws an Apperror if it fails
// Assert help thorw an error if a condition is not met
import assert from 'node:assert'
import AppError from './AppError'
import AppErrorCode from '../constants/appErrorCode'   
import { HttpStatusCode } from '../constants/http'

type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode
 ) => asserts condition;

const appAssert: AppAssert = ( condition, httpStatusCode, message, appErrorCode ) => 
    assert(condition, new AppError(httpStatusCode, message, appErrorCode))

export default appAssert
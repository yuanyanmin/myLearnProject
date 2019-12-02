import { BaseHttpException } from '../exception/process.exception'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import * as uuid from 'uuid'
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class TransResult implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    let requestId = uuid.v1()
    let req = context.getArgByIndex(0)
    req.requestId = requestId
    let reqStartTime = Date.now()
    return next.handle().pipe(
      map((val) => {
        return {
          requestId: requestId,
          useTime: Date.now() - reqStartTime,
          status: 'success',
          data: val
        }
      }),
      catchError(err => {
        if (err instanceof BaseHttpException) {
          err.requestId = requestId
          err.useTime = Date.now() - reqStartTime
          return throwError(err)
        } else {
          let msg: string = ''
          if (typeof err.message === 'string') {
            msg = err.message
          } else {
            msg = JSON.stringify(err.message)
          }
          let throwEX = new BaseHttpException(err.message, 200)
          throwEX.requestId = requestId
          throwEX.errorCode = 'OTHER_ERROR'
          throwEX.message = msg
          throwEX.useTime = Date.now() - reqStartTime
          if (err.stack) {
            throwEX.stack = err.stack
          }
          return throwError(throwEX)
        }
      })
    )

  }
}
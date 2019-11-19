import { HttpException } from "@nestjs/common";

export class BaseHttpException extends HttpException {
  public requestId: string
  public errorCode: string
  public useTime: number
  constructor(public message: string, status: number) {
    super(message, status)
  }
  getResponse(): string | object {
    return {
      requestId: this.requestId,
      status: 'fail',
      errorCode: this.errorCode ? this.errorCode : 'NORMAL_ERROR',
      message: this.message,
      useTime: this.useTime
    }
  }
}

// 处理异常，不计入日志
export class ProcessException extends BaseHttpException {
  constructor(message: string, errorCode?: string) {
    super(message, 200)
    this.errorCode = errorCode
  }
}
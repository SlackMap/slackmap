import { ExceptionFilter, Catch, HttpStatus, HttpException, ArgumentsHost } from '@nestjs/common';
import { InternalError } from '../errors';
import { AppConfig } from '../config/app.config';
import { Env } from '../config';

// TODO move this somewhere it belongs
export class ErrorModel {
  name: string;
  message: string;
  statusCode: number;
  title?: string;
  data?: any;
  stack?: string;
  parent?: any;
}

@Catch(InternalError, Error, HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  constructor(private appConfig: AppConfig) {}
  catch(exception: InternalError | Error | HttpException, host: ArgumentsHost) {
    let data: ErrorModel;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    // const status = exception.getStatus();
    // console.error('CATCH');
    // console.dir(exception);
    if (exception instanceof InternalError) {
      data = {
        name: exception.name || 'InternalError',
        title: exception.title || 'Internal Server Error',
        statusCode: exception.statusCode || 500,
        message: exception.message,
        data: exception.data || {},
        stack: exception.stack,
        parent: exception.parent || null
      };
    } else if (exception instanceof HttpException) {
      data = {
        name: exception.constructor.name,
        statusCode: exception.getStatus(),
        message: <string>exception.getResponse()
      };
    } else if (exception instanceof Error) {
      data = {
        name: exception.constructor.name,
        statusCode: 500,
        message: 'Internal Server Error',
        title: exception.message,
        stack: exception.stack,
        parent: exception
      };
    } else {
      data = {
        name: 'Unknown Error',
        statusCode: 500,
        message: 'Internal Server Error'
      };
    }
    // remove private data when on production
    if (!(this.appConfig.NODE_ENV === Env.DEV || this.appConfig.NODE_ENV === Env.TEST)) {
      delete data.message;
      delete data.stack;
      delete data.parent;
    }
    response.status(data.statusCode).json(data);
  }
}

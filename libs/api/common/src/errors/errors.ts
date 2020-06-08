import { HttpStatus } from "@nestjs/common";

export interface ErrorOptions {
  message?: string;
  title?: string;
  data?: any;
  parent?: Error;
}
export class InternalError extends Error {
  message: string;
  name: string;
  stack: string;
  title?: string;
  data?: any;
  parent?: Error;
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(data: ErrorOptions) {
    super(data.message || data.title || 'Upssss...');
    this.data = data.data || {};
    this.title = data.title || '';
    this.parent = data.parent || undefined;
    Error.captureStackTrace(this, this.constructor);
    this.name = (this as any).constructor.name;
  }
}

export class ValidationError extends InternalError {
  statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
}
export class ForbiddenError extends InternalError {
  statusCode = HttpStatus.FORBIDDEN;
}
export class UnauthorizedError extends InternalError {
  statusCode = HttpStatus.UNAUTHORIZED;
}
export class NotFoundError extends InternalError {
  statusCode = HttpStatus.NOT_FOUND;
}

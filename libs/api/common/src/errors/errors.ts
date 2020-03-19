export enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505
}
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

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Check if the exception is an instance of HttpException
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract the response message
    const errorMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    // Define a response object to handle various types of responses
    const responseBody =
      typeof errorMessage === 'string'
        ? { statusCode: status, message: errorMessage }
        : { statusCode: status, ...errorMessage };

    response.status(status).json({
      ...responseBody,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

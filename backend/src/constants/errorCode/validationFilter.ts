import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Check if the exception is a validation exception
    // if (status === HttpStatus.BAD_REQUEST && exceptionResponse && typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
    //   response.status(422).json({
    //     statusCode: 422, // Custom status code
    //     message: 'Validation failed',
    //     errors: exceptionResponse['message'],
    //   });
    // } else {
    //   // Handle other exceptions or use default behavior
    //   response.status(status).json(exceptionResponse);
    // }
  }
}
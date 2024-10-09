import { HttpStatus } from "@nestjs/common";

export function customMessage(status: HttpStatus, message: string) {
    return {
      statusCode: status,
      message,
    };
  }
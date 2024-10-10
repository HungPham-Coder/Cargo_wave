import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  getHello(): string {
    return 'Hello World!';
  }
}

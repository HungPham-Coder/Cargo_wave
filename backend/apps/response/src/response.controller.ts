import { Controller, Get } from '@nestjs/common';
import { ResponseService } from './response.service';

@Controller()
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Get()
  getHello(): string {
    return this.responseService.getHello();
  }
}

import { Controller, Post } from '@nestjs/common';
import { MailsService } from './mails.service';

@Controller('mails')
export class MailsController {
    constructor (private mailService: MailsService){}
    @Post('send')
    send (){
        this.mailService.confirm();
    }
}

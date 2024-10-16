import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('mails')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @MessagePattern('hero.mails.confirm')
    async sendEmail() {
        await this.mailService.sendEmail(
            'dong.nnp12427@sinhvien.hoasen.edu.vn',
            'Test Email',
            'This is a test email sent from NestJS!',
        );
        return { message: 'Email sent successfully!' };
    }
}

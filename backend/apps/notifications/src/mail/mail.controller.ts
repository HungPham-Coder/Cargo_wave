import { Controller, Req, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'apps/demo/src/entities/user.entity';

@Controller('mails')
export class MailController {
    constructor(private readonly mailService: MailService) { }
    
    @MessagePattern('hero.mails.confirm')
    async sendEmail(message) {
        try {
            await this.mailService.sendEmail(
                // 'dong.nnp12427@sinhvien.hoasen.edu.vn',
                // 'Test Email',
                // 'This is a test email sent from NestJS!',
                message
            );
            console.log('Email sent successfully');

            return { 
                "message": 'Email sent successfully!'
             };
        } catch (error) {
            console.error('Error sending email:', error);
            return { message: 'Failed to send email', error: error.message };
        }
    }

    @MessagePattern ('hero.mails.resetPassword')
    async sendResetPasswordLink (to){
        this.mailService.sendResetPasswordLink(to);
    }

}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MailsService } from './mails.service';
import { config } from 'dotenv';
config();
@Controller('mails')
export class MailsController {
    constructor(private mailService: MailsService) { }

    @Post('send')
    async send(@Body() body: { to: string, token: string}) {
        const confirmUrl = `http://localhost:3001/auth/confirm?token=${body.token}`; // Địa chỉ chuyển hướng của bạn
        const mailOptions = {
            from: `"${process.env.MAILER_DEFAULT_NAME}" <${process.env.MAILER_DEFAULT_EMAIL}>`,
            to: body.to,
            subject: 'Xác nhận email',
            html: `
          <h1>Cảm ơn bạn đã đăng ký!</h1>
          <p>Vui lòng xác nhận email của bạn bằng cách nhấn vào nút dưới đây:</p>
          <a href="${confirmUrl}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Xác nhận</a>
            `
        };

        return await this.mailService.confirm(mailOptions);
    }   

    @Post('resetPasswordLink')
    async sendResetPasswordLink(@Body() body: {to: string}){
        return await this.mailService.sendResetPasswordLink(body.to);
    }


    // @Get('send/:email')
    // send(@Param('email') to: string) {
    //     return this.mailService.confirm(to);
    // }
}

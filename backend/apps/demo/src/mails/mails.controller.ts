import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MailsService } from './mails.service';
import { config } from 'dotenv';
config();
@Controller('mails')
export class MailsController {
    constructor(private mailService: MailsService) { }

    @Post('send')
    async send(@Body() body: { to: string}) {
        // const confirmUrl = `http://localhost:3001/auth/confirm?token=${body.token}`; // Địa chỉ chuyển hướng của bạn
        const mailOptions = {
            from: `"${process.env.MAILER_DEFAULT_NAME}" <${process.env.MAILER_DEFAULT_EMAIL}>`,
            to: body.to,
            subject: 'Xác nhận email',
            html: `
          <h1>Đăng nhập thành công!</h1>
          <p>Bạn đã đăng nhập thành công vào hệ thống CargoWave</p>
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

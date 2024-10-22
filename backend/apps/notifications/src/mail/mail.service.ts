import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'apps/demo/src/entities/user.entity';
import { UsersService } from 'apps/demo/src/users/users.service';

import { config } from 'dotenv';
import { createTransport } from 'nodemailer'
config()
@Injectable()
export class MailService {
  private readonly transporter;

  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {
    this.transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      },
      //   host: configService.get<string>('mailer.host', { infer: true }),
      //   port: configService.get<number>('mailer.port', { infer: true }),
      //   secure: configService.get<boolean>('mailer.secure', { infer: true }),
      //   auth: {
      //     user: configService.get<string>('mailer.user', { infer: true }),
      //     pass: configService.get<string>('mailer.password', { infer: true }),
      //   },
      debug: true,
    });
  }


  async sendEmail(message) {
    // console.log(process.env.MAIL_USER);
    // console.log(process.env.MAIL_PASSWORD);
    // console.log (process.env.MAIL_HOST);

    const info = await this.transporter.sendMail(message);
    console.log('Email sent with info messageId: ', info.messageId);
  }

  async sendResetPasswordLink(email): Promise<void> {

    const payload = { email: email.to };
    console.log(payload.email);
    
    const user = await this.userService.findByEmail (payload.email);

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`
    });
    console.log(token);

    await this.userService.updateToken(user.id, token);
    // this.userService.updatePass
    // user.verify_token = token;
    const url = `http://localhost:3000/reset/${user.id}`
    // const url = `http://localhost:3001/auth/reset-password?token=${token}`;
    console.log (url);

    
    try {
      return this.sendEmail({
        from: `"${process.env.MAILER_DEFAULT_NAME}" <${process.env.MAILER_DEFAULT_EMAIL}>`,
        to: payload.email,
        subject: 'Reset password',
        html:  `
        <h1>Hi,</h1>
        <p>To reset your password, click the link below:</p>
        <a href="${url}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>`,
      });
    } catch (error) {
      console.log("Error: " + error);
    }

  }


}

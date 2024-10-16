import { Injectable } from '@nestjs/common';

import { config } from 'dotenv';
import nodemailer from 'nodemailer'
config()
@Injectable()
export class MailService {
    private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
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

  async sendEmail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      from: `"${process.env.MAILER_DEFAULT_NAME}" <${process.env.MAILER_DEFAULT_EMAIL}>`,
      to,
      subject,
      text,
    });
    console.log('Email sent: ', info.messageId);
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { UsersService } from '../users/users.service';
@Injectable()
export class EmailService {
    constructor(private readonly userService: UsersService){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendEmail (userId: string, message: string){
        const user = this.userService.findById(userId)[0];

        if (!user || !user.phone_number){
            throw new NotFoundException ("Not found email");
        }

        const msg = {
            to: user.email,
            from: 'clv@gmail.com',
            subject: 'CLV notification to you',
            text: message
        }
        try {
            const response =await sgMail.send(msg);
            console.log('Successfully sent message:', response);
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Could not send push notification: ' + error.message);
        }
    }
}

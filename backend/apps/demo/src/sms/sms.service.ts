import { Injectable, NotFoundException } from '@nestjs/common';
import * as Twilio from 'twilio'
import { UsersService } from '../users/users.service';
@Injectable()
export class SmsService {
    private readonly client;

    constructor(private readonly userService: UsersService){
        this.client = Twilio (process.env.TWILIO_ACCCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendSms (userId: string, message: string){
        const user = this.userService.findById(userId)[0];
        if (!user || !user.phone_number){
            throw new NotFoundException ('Users with Id ${userID} not have this phone')
        }

        try {
            const response =  await this.client.create (
                {
                    body: message,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: user.phone_number
                }

            )
            console.log('Successfully sent message:', response);
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Could not send push notification: ' + error.message);
        }
    }
}

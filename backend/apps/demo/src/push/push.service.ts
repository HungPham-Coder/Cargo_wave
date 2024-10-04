import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UsersService } from '../users/users.service';
@Injectable()
export class PushService {
    constructor(private readonly userService: UsersService) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            })
        });
    }


    async sendPushNotification(userId: string, message: string) {
        const user = this.userService.findById(userId)[0];
        if (!user || !user.phone_number) {
            throw new NotFoundException('Users with Id ${userID} not have this phone')
        }
        const payload = {
            notification: {
                title: 'CLV Notification to you',
                body: message,
            },
            token: user
        }

        try {
            const response = await admin.messaging().send(payload);
            console.log('Successfully sent message:', response);
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Could not send push notification: ' + error.message);
        }
    }
}

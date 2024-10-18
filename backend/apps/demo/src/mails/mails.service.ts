import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailsService {
    constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka, private jwtService: JwtService) { }

    public async confirm(mailOptions){
        // const message = {
        //     from: mailOptions.from,
        //     to: mailOptions.to,
        //     subject: mailOptions.subject,
        //     html: mailOptions.html,
        // };
        try {
            // Gửi thông điệp tới Kafka
            console.log('Message sent to Kafka:', mailOptions);
            return await this.client.send('hero.mails.confirm', mailOptions);
           
        } catch (error) {
            console.error('Error sending message to Kafka:', error);
            throw new Error('Failed to send message to Kafka');
        }
        
    }

    public async sendResetPasswordLink(to:string){
        return await this.client.send('hero.mails.resetPassword', {to});
    }

    public async decodeConfirmationToken(token: string) {
        try {
          const payload = await this.jwtService.verify(token, {
            secret: process.env.JWT_VERIFICATION_TOKEN_SECRET
          });
          console.log ("Payload received: ", payload)
          console.log("Email from payload: ", payload.email)
          if (typeof payload === 'object' && 'email' in payload) {
            return payload.email;
          }
          throw new BadRequestException();
        } catch (error) {
          if (error?.name === 'TokenExpiredError') {
            throw new BadRequestException(
              'Email confirmation token expired'
            );
          }
          throw new BadRequestException('Bad confirmation token');
        }
      }
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy (Strategy, 'google'){
    constructor(){
        super({
            // muốn sử dụng .env để store clientID và clientSecret thì để .env ở thư mục gốc 
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,

          
            // clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
            // clientSecret: configService.get<string> ("GOOGLE_SECRET"),
            callbackURL: 'http://localhost:3001/auth/google-redirect',
            scope: ['email', 'profile'],
        });
    }
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
      ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
          email: emails[0].value,
          firstName: name.givenName,
          lastName: name.familyName,
          picture: photos[0].value,
          accessToken,
          refreshToken,
        };
        done(null, user);
      }
}
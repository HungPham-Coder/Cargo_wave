import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

//doc link: https://dev.to/imichaelowolabi/how-to-implement-login-with-google-in-nest-js-2aoa
config()

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:3001/auth/redirect',
            scope: ['email', 'profile'],
            grant_type: 'authorization_code',
            code: 'AUTHORIZATION_CODE_RECEIVED',
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            name: name.familyName + " " + name.givenName,
            picture: photos[0].value,
            accessToken,
            refreshToken
        }

        done(null, user);
    }
}
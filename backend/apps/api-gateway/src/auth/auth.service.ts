import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor (@Inject() private readonly client: ClientKafka){}

  async onModuleInit() {
    this.client.subscribeToResponseOf('hero.user');
    await this.client.connect();
  }

  signUp(){
    this.client.send('hero.user', {});
  }
}

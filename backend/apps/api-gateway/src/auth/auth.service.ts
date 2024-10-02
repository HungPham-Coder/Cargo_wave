import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/create-user-request.dto';

@Injectable()
export class AuthService {
  constructor (@Inject('HERO_SERVICE') private readonly client: ClientKafka){}

  async onModuleInit() {
    this.client.subscribeToResponseOf('hero.auth.register');
    this.client.subscribeToResponseOf('hero.auth.login')
    await this.client.connect();
  }

  // signUp(){
  //   this.client.send('hero.user', {});
  // }

  signUp(createUserDto: CreateUserDTO){  
    return this.client.send ('hero.auth.register', createUserDto);
  }

  signIn(){
    return this.client.send ('hero.auth.login', {});
  }
}

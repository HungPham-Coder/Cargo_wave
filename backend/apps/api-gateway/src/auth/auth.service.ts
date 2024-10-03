import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDTO, LoginDTO } from './dto/create-user-request.dto';

@Injectable()
export class AuthService {
  constructor (@Inject('HERO_SERVICE') private readonly client: ClientKafka){}

  async onModuleInit() {
    this.client.subscribeToResponseOf('hero.auth.register');
    this.client.subscribeToResponseOf('hero.auth.login')
    await this.client.connect();
  }

  signUp(createUserDto: CreateUserDTO){  
    return this.client.send ('hero.auth.register', createUserDto);
  }

  signIn(user: LoginDTO){
    return this.client.send ('hero.auth.login', user);
  }
  
  


}

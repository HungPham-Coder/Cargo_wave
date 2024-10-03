import { Injectable, Inject, HttpException, HttpStatus, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDTO } from './create-permission-request.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Permission } from 'apps/demo/src/entities/permission.entity';
import { PaginationDTO } from 'apps/demo/src/users/create-user-request.dto';

@Injectable()
export class PermissionsService {
  constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) { }

  async onModuleInit() {
    this.client.subscribeToResponseOf('hero.permission.findAll');
    await this.client.connect();
}

  findAll() {
    return this.client.send('hero.permission.findAll', {});
  }

}

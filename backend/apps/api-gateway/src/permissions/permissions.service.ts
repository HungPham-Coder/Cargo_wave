import { Injectable, Inject, HttpException, HttpStatus, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDTO } from './create-permission-request.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Permission } from 'apps/demo/src/entities/permission.entity';
import { PaginationDTO } from 'apps/demo/src/users/create-user-request.dto';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsService {
  constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) { }

  findAll() {
    return this.client.send('hero.permission.findAll', {});
  }

  findAllWithPaging(paginationDTO: PaginationDTO): Observable<any> {
    console.log('Pagination DTO received:', paginationDTO);
    try {
      const response = this.client.send('hero.permission.findAllWithPaging', paginationDTO);
      return response;
    } catch (error) {
      console.error('Error in findAllWithPaging:', error);
      throw new HttpException('Error fetching permissions with paging', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

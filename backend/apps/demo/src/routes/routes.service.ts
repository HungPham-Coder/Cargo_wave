import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../entities/routes.entity';
import { Repository } from 'typeorm';
import { CreateRouteDTO } from './routes.dto/create-route-request.dto';

@Injectable()
export class RoutesService {
    
    constructor(@InjectRepository(Route) private routeRepository: Repository<any>){}

    async create (routeDto: CreateRouteDTO): Promise <any>{
        return await this.routeRepository.save (routeDto);
    }
}

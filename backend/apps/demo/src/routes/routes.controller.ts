import { Controller, Post } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDTO } from './routes.dto/create-route-request.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('routes')
export class RoutesController {
    constructor (private readonly routeService: RoutesService){}

    @MessagePattern ("hero.routes.create")
    create(routeDto: CreateRouteDTO){
        return this.routeService.create(routeDto);
    }

}

import { Controller, Post } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDTO } from './routes.dto/create-route-request.dto';

@Controller('routes')
export class RoutesController {
    constructor (private readonly routeService: RoutesService){}

    @Post ('create')
    create(routeDto: CreateRouteDTO){
        return this.routeService.create(routeDto);
    }

}

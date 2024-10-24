import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRouteDto, RouteWithTransportDTO } from './routes.dto/create-route-request.dto';
import { UpdateRouteDto } from './routes.dto/update-route-request.dto';
import { Route } from '../entities/routes.entity';
import { SearchDTO } from '../users/users.dto/create-user-request.dto';
import { RouteStatisticsDto } from './routes.dto/route-statistics.dto';

@Controller('routes')
export class RoutesController {
    constructor(private readonly routeService: RoutesService) { }

    @HttpCode(HttpStatus.OK)
    @Get('findAll')
    async findAll() {
        try {
            return await this.routeService.findAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get('findAllBySearch')
    async findAllBySearch(@Query() searchDTO: SearchDTO): Promise<RouteWithTransportDTO[]> {
        return await this.routeService.findAllBySearch(searchDTO);
    }


    @HttpCode(HttpStatus.OK)
    @Get('findRouteByID/:id')
    async findRouteByID(@Param('id') id: string): Promise<Route> {
        try {
            return await this.routeService.findRouteByID(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error retrieving route:', error);
            throw new Error('Error retrieving route'); // Or a more specific error handling
        }
    }

    // @MessagePattern ("hero.routes.create")
    @Post('create')
    async create(@Body() createRouteDto: CreateRouteDto) {
        console.log('Incoming Route DTO:', createRouteDto); // Log the DTO
        return await this.routeService.create(createRouteDto);
    }

    @HttpCode(HttpStatus.OK)
    @Put('updateRouteByID/:id')
    update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
        return this.routeService.update(id, updateRouteDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.routeService.remove(id);
    }

    @HttpCode(HttpStatus.OK)
    @Get('getRouteStatistics')
    async getStatistics(): Promise<RouteStatisticsDto> {
        return await this.routeService.getRouteStatistics();
    }

    @HttpCode(HttpStatus.OK)
    @Get('getTotalRoutes')
    async getTotalRoutes() {
        const totalRoutes = await this.routeService.getTotalRoutes();
        return { totalRoutes };
    }
}

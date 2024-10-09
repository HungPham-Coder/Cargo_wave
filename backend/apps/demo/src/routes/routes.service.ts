import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../entities/routes.entity';
import { Repository } from 'typeorm';
import { CreateRouteDto, RouteWithTransportDTO } from './routes.dto/create-route-request.dto';
import { UpdateRouteDto } from './routes.dto/update-route-request.dto';
import { PaginationDTO, SearchDTO } from '../users/create-user-request.dto';

export type Routes = any;

@Injectable()
export class RoutesService {

    constructor(@InjectRepository(Route)
    private routeRepository: Repository<Routes>
    ) { }

    async findAll(): Promise<Routes[]> {
        try {
            return await this.routeRepository.find();
        } catch (error) {
            console.error('Error finding all routes: ', error);
            throw new Error('Error finding all routes');
        }
    }

    async findAllBySearch(searchDTO: SearchDTO): Promise<RouteWithTransportDTO[]> {
        const { search = '' } = searchDTO;

        try {
            const query = this.routeRepository.createQueryBuilder('routes')
                .leftJoinAndSelect('routes.transport', 'transport')
                .leftJoinAndSelect('transport.shippingType', 'shippingType')
                .leftJoinAndSelect('routes.departure', 'departure')
                .leftJoinAndSelect('routes.arrival', 'arrival');

            if (search) {
                query.where('LOWER(routes.name) LIKE LOWER(:search)', { search: `%${search.toLowerCase()}%` });
            }

            const data = await query.orderBy('routes.name', 'ASC').getMany();

            return data;
        } catch (error) {
            console.error('Error finding routes: ', error);
            throw new Error('Error finding routes');
        }
    }


    async findRouteByID(id: string): Promise<Routes> {
        try {
            const route = await this.routeRepository.createQueryBuilder('routes')
                .leftJoinAndSelect('routes.transport', 'transport') 
                .leftJoinAndSelect('transport.shippingType', 'shippingType')
                .leftJoinAndSelect('routes.departure', 'departure')
                .leftJoinAndSelect('routes.arrival', 'arrival')
                .where('routes.id = :id', { id })
                .getOne();

            if (!route) {
                throw new NotFoundException(`Route with ID ${id} not found`);
            }

            return route;
        } catch (error) {
            console.error('Error finding route: ', error);
            throw new Error('Error finding route');
        }
    }

    async create(routeDto: CreateRouteDto): Promise<Route> {
        try {
            const route = this.routeRepository.create({
                ...routeDto,
                transport: routeDto.transportID, // Setting transport relation
                departure: routeDto.departureID, // Setting departure relation
                arrival: routeDto.arrivalID, // Setting arrival relation
            });
            const savedRoute = await this.routeRepository.save(route);
            return savedRoute; // Return the saved route
        } catch (error) {
            console.error('Error saving route:', error);
            throw new Error('Failed to create route. Please try again later.');
        }
    }

    async update(id: string, updateRouteDto: UpdateRouteDto): Promise<Route> {
        await this.findRouteByID(id);
        await this.routeRepository.update(id, updateRouteDto);
        return this.findRouteByID(id);
    }

    async remove(id: string): Promise<void> {
        const result = await this.routeRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Route with ID ${id} not found`);
        }
    }
}

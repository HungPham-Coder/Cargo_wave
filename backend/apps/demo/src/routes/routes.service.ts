import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../entities/routes.entity';
import { Repository } from 'typeorm';
import { CreateRouteDto, RouteWithTransportDTO } from './routes.dto/create-route-request.dto';
import { UpdateRouteDto } from './routes.dto/update-route-request.dto';
import { SearchDTO } from '../users/users.dto/create-user-request.dto';
import { RouteStatisticsDto } from './routes.dto/route-statistics.dto';

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
        const { search = '', status } = searchDTO;

        try {
            const query = this.routeRepository.createQueryBuilder('routes')
                .leftJoinAndSelect('routes.transport', 'transport')
                .leftJoinAndSelect('transport.shippingType', 'shippingType')
                .leftJoinAndSelect('routes.departure', 'departure')
                .leftJoinAndSelect('routes.arrival', 'arrival');

            if (search) {
                query.where('LOWER(routes.name) LIKE LOWER(:search)', { search: `%${search.toLowerCase()}%` });
            }

            if (status !== undefined) {
                query.andWhere('routes.status = :status', { status });
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
        try {
            const existingRoute = await this.findRouteByID(id);

            // Create a new route instance with the updated data
            const updatedRoute = this.routeRepository.create({
                ...existingRoute, 
                ...updateRouteDto,
            });
            await this.routeRepository.save(updatedRoute);
            return this.findRouteByID(id);
        } catch (error) {
            console.error('Error updating route:', error);
            throw new Error('Failed to update route.');
        }
    }

    async remove(id: string): Promise<void> {
        const result = await this.routeRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Route with ID ${id} not found`);
        }
    }

    async getRouteStatistics(): Promise<RouteStatisticsDto> {
        try {
            const statuses = await this.routeRepository
                .createQueryBuilder('routes')
                .select('routes.status', 'status')
                .addSelect('COUNT(routes.id)', 'count')
                .groupBy('routes.status')
                .getRawMany();
    
            const statistics: RouteStatisticsDto = {};
    
            statuses.forEach(({ status, count }) => {
                statistics[status] = parseInt(count, 10);
            });
    
            return statistics; // Return the statistics object
        } catch (error) {
            console.error('Error retrieving route statistics:', error);
            throw new Error('Error retrieving route statistics');
        }
    }

    async getTotalRoutes(): Promise<number> {
        try {
            return await this.routeRepository.count();
        } catch (error) {
            console.error('Error getting total routes:', error);
            throw new Error('Error getting total routes');
        }
    }
}

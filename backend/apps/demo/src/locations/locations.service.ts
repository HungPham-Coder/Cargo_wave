import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../entities/location.entity';
import { Repository } from 'typeorm';
import { SearchDTO } from '../users/users.dto/create-user-request.dto';

export type Locations = any;

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
    ) {}

    async findAllBySearch(searchDTO: SearchDTO): Promise<Locations[]> {
        const { search = '' } = searchDTO;

        try {
            const query = this.locationRepository.createQueryBuilder('location');

            if (search) {
                query.where('LOWER(location.name) LIKE :search', { search: `%${search.toLowerCase()}%` });
            }

            const data = await query.orderBy('location.name', 'ASC').getMany();
            return data;
        } catch (error) {
            console.error('Error finding locations: ', error);
            throw new Error('Error finding locations');
        }
    }

    async getTransportNames(search?: string): Promise<string[]> {
        const query = this.locationRepository
            .createQueryBuilder('location')
            .select('location.name');

        if (search) {
            query.where('location.name LIKE :search', { search: `%${search}%` });
        }

        const locations = await query.getMany();
        return locations.map(location => location.name);
    }
}


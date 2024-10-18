import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transport } from '../entities/transport.entity';
import { Repository } from 'typeorm';
import { TransportWithShippingDTO } from './transports.dto/transport-request.dto';
import { SearchDTO } from '../users/users.dto/create-user-request.dto';

@Injectable()
export class TransportsService {
    constructor(@InjectRepository(Transport)
    private transportRepository: Repository<any>
    ) { }

    async findAllBySearch(searchDTO: SearchDTO): Promise<TransportWithShippingDTO[]> {
        const { search = '' } = searchDTO;

        try {
            const query = this.transportRepository.createQueryBuilder('transport')
                .leftJoinAndSelect('transport.shippingType', 'shippingType')

            if (search) {
                query.where('LOWER(transport.name) LIKE LOWER(:search)', { search: `%${search.toLowerCase()}%` });
            }

            const data = await query.orderBy('transport.name', 'ASC').getMany();

            return data;
        } catch (error) {
            console.error('Error finding transports: ', error);
            throw new Error('Error finding transports');
        }
    }

    async getTransportNames(search?: string): Promise<string[]> {
        const query = this.transportRepository
            .createQueryBuilder('transport')
            .select('transport.name');

        if (search) {
            query.where('transport.name LIKE :search', { search: `%${search}%` });
        }

        const transports = await query.getMany();
        return transports.map(transport => transport.name);
    }
}

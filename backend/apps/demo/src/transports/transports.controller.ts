import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { TransportWithShippingDTO } from './transports.dto/transport-request.dto';
import { TransportsService } from './transports.service';
import { SearchDTO } from '../users/users.dto/create-user-request.dto';

@Controller('transports')
export class TransportsController {
    constructor(private readonly transportService: TransportsService) { }

    @HttpCode(HttpStatus.OK)
    @Get('findAllBySearch')
    async findAllBySearch(@Query() searchDTO: SearchDTO): Promise<TransportWithShippingDTO[]> {
        return await this.transportService.findAllBySearch(searchDTO);
    }

    @HttpCode(HttpStatus.OK)
    @Get('findAllByName')
    async getTransportNames(@Query('search') search?: string): Promise<string[]> {
        return this.transportService.getTransportNames(search);
    }
}

import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Locations, LocationsService } from './locations.service';
import { SearchDTO } from '../users/create-user-request.dto';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    @HttpCode(HttpStatus.OK)
    @Get('findAllBySearch')
    async findAll(@Query() searchDTO: SearchDTO): Promise<Locations[]> {
        return this.locationsService.findAllBySearch(searchDTO);
    }

    @HttpCode(HttpStatus.OK)
    @Get('findAllByName')
    async getTransportNames(@Query('search') search?: string): Promise<string[]> {
        return this.locationsService.getTransportNames(search);
    }
}

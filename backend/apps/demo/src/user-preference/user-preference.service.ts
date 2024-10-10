import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreference } from '../entities/userPreference.entity';

@Injectable()
export class UserPreferenceService {
    constructor(
        @InjectRepository (UserPreference)
        private userPreferenceRepository: Repository<any>,
    ){};

    async findById (userId: string): Promise<any>{
        return this.userPreferenceRepository.findOne ({where: {user: {id: userId}}})
    }
}

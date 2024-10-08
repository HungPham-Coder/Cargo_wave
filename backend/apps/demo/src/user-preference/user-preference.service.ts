import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPreference } from '../entities/user-preference.entity';


@Injectable()
export class UserPreferenceService {
    constructor(
        @InjectRepository (UserPreference)
        private userPreferenceRepository: Repository<any>,
    ){};

    async findByUserId (userId: string): Promise<any>{
        return this.userPreferenceRepository.findOne ({where: {user: {id: userId}}})
    }
}

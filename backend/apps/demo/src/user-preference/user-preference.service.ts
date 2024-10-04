import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPreference } from '../entities/user-preference.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserPreferenceService {
    constructor(
        @InjectRepository (UserPreference)
        private userPreferenceRepository: Repository<UserPreference>,
    ){};

    async findByUserId (userId: string): Promise<UserPreference>{
        return this.userPreferenceRepository.findOne ({where: {user: {id: userId}}})
    }
}

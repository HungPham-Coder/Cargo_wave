import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPreference } from '../entities/userPreference.entity';
import { UserPreferenceService } from './user-preference.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserPreference])],
    providers: [UserPreferenceService],
    exports: [UserPreferenceService]
})
export class UserPreferenceModule {}

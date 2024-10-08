import { Module } from '@nestjs/common';
import { UserPreference } from '../entities/user-preference.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([UserPreference])],
    providers: [UserPreference]
})
export class UserPreferenceModule {
   
}

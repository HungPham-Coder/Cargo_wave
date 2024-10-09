import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from '../entities/transport.entity';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Transport])],
    providers: [TransportsService],
    exports: [TransportsService], controllers: [TransportsController],
})
export class TransportsModule {}

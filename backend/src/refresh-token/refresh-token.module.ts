import { Module } from '@nestjs/common';
import { RefreshTokenController } from './refresh-token.controller';

@Module({
  controllers: [RefreshTokenController]
})
export class RefreshTokenModule {}

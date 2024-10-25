import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MailModule } from './mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/demo/src/entities/user.entity';
import { Role } from 'apps/demo/src/entities/role.entity';
import { Permission } from 'apps/demo/src/entities/permission.entity';
import { Route } from 'apps/demo/src/entities/routes.entity';
import { ShippingType } from 'apps/demo/src/entities/shippingType.entity';
import { Transport } from 'apps/demo/src/entities/transport.entity';
import { Location } from 'apps/demo/src/entities/location.entity';


@Module({
  imports: [MailModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '130600',
      database: 'postgres',
      entities: [
        User,
        Role,
        Permission,
        Route,
        ShippingType,
        Location,
        Transport,],
      synchronize: false, // không tự động đồng bộ các entities
    })
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}

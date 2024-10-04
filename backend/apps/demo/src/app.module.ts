import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { Crew } from './entities/crew.entity';
import { Log } from './entities/log.entity';
import { RefreshToken } from './entities/refreshToken.entity';
import { Role } from './entities/role.entity';
import { Route } from './entities/routes.entity';
import { Ship } from './entities/ship.entity';
import { Permission } from './entities/permission.entity';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { VehicleType } from './entities/vehicleType.entity';
import { ShippingType } from './entities/shippingType.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '130600',
      // database: 'CargoWave',
      database: 'postgres',
      entities: [
        User,
        Crew,
        Log,
        RefreshToken,
        Role,
        Permission,
        Route,
        Ship,
        VehicleType,
        ShippingType,
        // UserPreferenceService
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    NotificationModule,

  ],
  controllers: [AppController],
  providers: [AppService, EmailService, SmsService, PushService, UserPreferenceService, NotificationService],
})
export class AppModule { }

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';
import { PushService } from './push/push.service';
import { UserPreferenceService } from './user-preference/user-preference.service';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
// import typeorm from './config/typeorm';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [typeorm]
//     }),
//     TypeOrmModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
//     }),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refreshToken.entity';
import { Role } from './entities/role.entity';
import { Route } from './entities/routes.entity';
import { Permission } from './entities/permission.entity';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ShippingType } from './entities/shippingType.entity';
import { Location } from './entities/location.entity';
import { Transport } from './entities/transport.entity';
import { RoutesModule } from './routes/routes.module';
import { TransportsModule } from './transports/transports.module';
import { LocationsModule } from './locations/locations.module';
import { SeedService } from './seed/seed.service';
import { MailsModule } from './mails/mails.module';
import { KafkaClientModule } from './kafka-client/kafka-client.module';
import { CorsMiddleware } from './cors.middleware';
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
        RefreshToken,
        Role,
        Permission,
        Route,
        ShippingType,
        Location,
        Transport,
      ],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    RoutesModule,
    LocationsModule,
    TransportsModule,
    MailsModule,
    KafkaClientModule
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
    
})
export class AppModule {configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(CorsMiddleware)
    .forRoutes('/auth/*'); // Áp dụng cho các route auth
} }

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
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
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './entities/Custormers';
import { Staffs } from './entities/Staffs';

import { Routes } from './entities/Routes';
import { Bookshippings } from './entities/Bookshippings';
import { TypeStaff } from './entities/TypeStaff';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users } from './entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: '130600',
      database: 'jwat',
      entities: [
        Users, 
        //  Staffs, 
        //  Customers,
        //  Routes, 
        //  TypeStaff, 
        //  Bookshippings
        ],
      synchronize: true,
    }),
    AuthModule, 
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

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
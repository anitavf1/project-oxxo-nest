import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import {ConfigModule} from "@nestjs/config";
import { ProvidersModule } from './providers/providers.module';
import { ManagersResolver } from './managers/managers.resolver';
import { LocationsResolver } from './locations/locations.resolver';
import { RegionsResolver } from './regions/regions.resolver';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
      host: process.env.host,
      port: +process.env.port,
      username: 'postgres',
      password: "TheBestPassword",
      database: process.env.name,
      autoLoadEntities: true,
      synchronize: true,
}),EmployeesModule, ProductsModule, ProvidersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ManagersResolver, LocationsResolver, RegionsResolver],
})
export class AppModule {}

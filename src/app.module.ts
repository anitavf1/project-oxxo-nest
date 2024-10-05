import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import {ConfigModule} from "@nestjs/config";
import { ProvidersModule } from './providers/providers.module';
import { ManagersResolver } from './managers/managers.resolver';
import { LocationsResolver } from './locations/locations.resolver';
import { RegionsResolver } from './regions/regions.resolver';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from './auth/constants/jwt.constants';
import { EXPIRES_IN } from './auth/constants/jwt.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN,
      }
    })
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

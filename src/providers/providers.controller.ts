import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import {UserData} from 'src/auth/decorators/user.decorator';
import {User} from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ApiAuth } from 'src/auth/decorators/api.decorators';
import { ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/auth/constants/roles.constants';

@ApiAuth()
@ApiTags("Providers")

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE)
  @Get()
  findAll(@UserData()user:User) {
    if(user.userRoles.includes("Employee")) throw new UnauthorizedException("No estás autorizado, solo admins y managers");
    return this.providersService.findAll();
  }

  @Get(':name')
  findByName(){
    return this.providersService.findOneByName();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider =  this.providersService.findOne(id);
    if(!provider) throw new NotFoundException()
    return provider
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}

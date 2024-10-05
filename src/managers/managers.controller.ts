import {Body, Controller, Delete, Get, Injectable, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import { CreateManagerDto } from "./dto/create-manager.dto";
import {UpdateManagerDto} from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Auth} from 'src/auth/decorators/auth.decorators';
import { ApiAuth } from 'src/auth/decorators/api.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiAuth()
@ApiTags('Managers')
@Controller('managers')
export class ManagersController{
    constructor(private readonly managersService:ManagersService){}

    @Auth()
    @Post()
    create(@Body() createManagerDto:CreateManagerDto){
        return this.managersService.create(createManagerDto)
    }

    @Auth()
    @Get()
    findAll(){
        return this.managersService.findAll();
    }

    @Auth()
    @Get(':id')
    findOne(@Param('id')id:string){
        return this.managersService.findOne(id);
    }

    @Auth(ROLES.MANAGER)
    @Patch(':id')
    update(@Param('id')id: string, @Body() updateManagerDto: UpdateManagerDto){
        return this.managersService.update(id, updateManagerDto);
    }


    @Auth()
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.managersService.remove(id);
    }
}
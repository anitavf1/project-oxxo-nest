import {Body, Controller, Delete, Get, Injectable, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import { CreateManagerDto } from "./dto/create-manager.dto";
import {UpdateManagerDto} from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('managers')
export class ManagersController{
    constructor(private readonly managersService:ManagersService){}

    @Post()
    create(@Body() createManagerDto:CreateManagerDto){
        return this.managersService.create(createManagerDto)
    }

    @Get()
    findAll(){
        return this.managersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id:string){
        return this.managersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id')id: string, @Body() updateManagerDto: UpdateManagerDto){
        return this.managersService.update(id, updateManagerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.managersService.remove(id);
    }
}
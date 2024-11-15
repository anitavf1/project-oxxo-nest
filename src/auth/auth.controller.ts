import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PassThrough } from 'supertest/lib/test';
import {TOKEN_NAME} from './constants/jwt.constants'

@ApiTags('Auth')

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  @Post("register/:id")
  registerManager(@Query("role") role: string, @Body()createUserDto:CreateUserDto, @Param("id") id:string){
    if(role=== "manager"){
      return this.authService.registerManager(id, createUserDto)
    } else if(role === "employee"){
      return this.authService.registerEmployee(id, createUserDto)
    }
    throw new BadRequestException("Rol inválido")
    
  }

  @Post("login")
  async login(@Body() loginUserDto:loginUserDto, @Res({Passthrough:true}) response: Response, @Cookies() cookies: any){
    const token= await this.authService.loginUser(loginUserDto)
    response.cookie('TOKEN_NAME', token,{
      httpOnly:false,
      secure:true,
      sameSite: 'none',
      maxAge:1000*60*60*24*7
      
    });
    return;
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail:string, @Body() updateUserDto:UpdateUserDto){
    return this.authService.updateUser(userEmail, updateUserDto)
  }

  
}

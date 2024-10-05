import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
  private jwtService: JwtService){}

  registerUser(createUserDto:CreateUserDto){
    createUserDto.userPassword= bcrypt.hashSync(createUserDto.userPassword)
    return this.userRepository.save(createUserDto)
  }

  async loginUser(loginUser:loginUserDto){
    const user= await this.userRepository.findOne({
      where:{
        userEmail: loginUser.userEmail
      }
    })
  }

  async updateUser(userEmail: string, updateUserDto:UpdateUserDto){
    await this.userRepository.preload({
      userEmail,
      ...updateUserDto

    })
    this.userRepository.save(newUserData)
    return newUserData
  }
  
  const match= await bcrypt.compare(
    loginUserDto.userPassword,
    user.userPassword,
  );

  if(!match) throw new UnauthorizedException ("No estás autorizado");
  const payload={
    userEmail: user.userPassword,
    userPassword: user.userPassword
    userRoles: user.userRoles
  }
  const token= this.jwtService.sign(payload);
  return token;


}

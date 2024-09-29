import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  registerUser(createUserDto:CreateUserDto){
    createUserDto.userPassword= bcrypt.hashSync(createUserDto.userPassword)
    return this.userRepository.save(createUserDto)
  }

  async loginUser(createUserDto:CreateUserDto){
    const user= await this.userRepository.findOne({
      where:{
        userEmail: createUserDto.userEmail
      }
    })
  }
  
  const match= await bcrypt.compare(createUserDto.userPassword, user.userPassword)
  if(!match) throw new UnauthorizedException ("No estás autorizado");
  const token= jwt.sign(JSON.stringify(user), "SECRET KEY");
  return token;
}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';


@Injectable()
export class AuthService {
  constructor(
  @InjectRepository(User) private userRepository: Repository<User>,
  @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
  @InjectRepository(Manager) private managerRepository: Repository<Manager>,
  private jwtService: JwtService,
){}

  async registerEmployee(id: string, createUserDto:CreateUserDto){
    const roles= createUserDto.userRoles
    if (roles.includes("Admin") || roles.includes("Manager")){
      throw new BadRequestException("Invalid")
    }
    createUserDto.userPassword= bcrypt.hashSync(createUserDto.userPassword)
    const user= await this.userRepository.save(createUserDto)
    const employee= await this.employeeRepository.preload({
      employeeId: id,
    })
    employee.user=user;
    return this.employeeRepository.save(employee)
  }

  async registerManager(id: string, createUserDto:CreateUserDto){
    createUserDto.userPassword= bcrypt.hashSync(createUserDto.userPassword)
    const user= await this.userRepository.save(createUserDto)
    const manager= await this.managerRepository.preload({
      managerId: id,
    })
    manager.user=user;
    return this.employeeRepository.save(manager)
  }





  async loginUser(loginUser:loginUserDto){
    const user= await this.userRepository.findOne({
      where:{
        userEmail: loginUser.userEmail
      }
    })
  }

  async updateUser(id: string, updateUserDto:UpdateUserDto){
    updateUserDto.userPassword= bcrypt.hashSync(updateUserDto.userPassword, 5);
    const newUserData= await this.userRepository.preload({
      userId: id,
      ...updateUserDto

    })
    this.userRepository.save(newUserData)
    return newUserData
  }
  
  if(!user) throw new UnauthorizedException("No estás autorizado")
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

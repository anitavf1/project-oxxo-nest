import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {Roles} from '../decorators/roles.decorator';
import { User } from '../entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate{
    request: any;
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const roles= this.reflector.get(Roles, context.getHandler());
        if(!roles){
            return true;
        }
    

    const request = context.switchToHttp().getRequest();
    const user: User= this.request.user;
    return this.matchRoles(roles, user.Roles);
}

    matchRoles(roles: string[], userRoles: string[]){
        let access= false;
        userRoles.forEach((userRole)=>{
           if (roles.includes(userRole)) access= true
        })
        return access;
    }

}
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class loginUserDto{
    static userPassword(userPassword: any, userPassword1: any) {
      throw new Error('Method not implemented.');
    }
    @ApiProperty({
        default:"user@gmail.com"
    })
    @IsString()
    @IsEmail()
    userEmail:string;

    @ApiProperty({
        default:"335367338"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
}
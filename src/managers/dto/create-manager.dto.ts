import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Manager } from "../entities/managers.service";
import { IsEmail, IsString, IsNumber, MaxLength} from "class-validator";

@Entity()
export class CreateManagerDto extends Manager {
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
}
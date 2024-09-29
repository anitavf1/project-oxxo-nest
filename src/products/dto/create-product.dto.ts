import { IsInt, IsNumber, IsOptional, isPort, IsString, IsUUID, MaxLength } from "class-validator";
import {Provider} from "src/providers/entities/provider.entity";
import { Product } from "../entities/product.entity";

export class CreateProductDto extends Product{
    @IsUUID("4")
    @IsOptional()
    productId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsString()
    @IsUUID()
    @IsOptional()
    provider: Provider;
}

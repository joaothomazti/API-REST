import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    bio: string;

    @IsString()
    website: string;

    @IsString()
    @IsEmail()
    email: string;
}

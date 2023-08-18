import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from "class-validator";

export class CreateCandidateDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @IsString()
    @ApiProperty()
    bio: string;

    @IsString()
    @ApiProperty()
    phone: string;

    @IsBoolean()
    @ApiProperty()
    open_to_work: boolean;
}

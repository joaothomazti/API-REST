import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'NestJs',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'This company is focused on web development',
  })
  @IsString()
  bio?: string;

  @ApiProperty({
    example: 'website.com.br',
  })
  @IsString()
  website?: string;

  @ApiProperty({
    example: 'test@test.com',
  })
  @IsString()
  @IsEmail()
  email?: string;
}

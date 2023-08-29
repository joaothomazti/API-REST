import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  @ApiProperty({
    example: 'Joao Thomaz',
  })
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'joao@test.com',
  })
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty({
    example: 'dev BackEnd',
  })
  bio?: string;

  @IsString()
  @ApiProperty({
    example: '34948388321',
  })
  phone?: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  open_to_work?: boolean;
}

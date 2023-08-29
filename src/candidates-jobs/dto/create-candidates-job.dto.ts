import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateCandidatesJobDto {
  @IsNumber()
  @ApiProperty({
    example: 'ID candidate:  1',
  })
  candidateId: number;

  @IsNumber()
  @ApiProperty({
    example: 'ID job: 1',
  })
  jobId: number;
}

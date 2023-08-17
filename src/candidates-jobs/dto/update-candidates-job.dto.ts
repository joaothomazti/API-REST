import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidatesJobDto } from './create-candidates-job.dto';

export class UpdateCandidatesJobDto extends PartialType(CreateCandidatesJobDto) {}

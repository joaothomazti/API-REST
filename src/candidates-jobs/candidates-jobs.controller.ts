import { Controller, Post, Body } from '@nestjs/common';
import { CandidatesJobsService } from './candidates-jobs.service';
import { CreateCandidatesJobDto } from './dto/create-candidates-job.dto';
import { CandidatesJob } from './entities/candidates-job.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('candidates-jobs')
@Controller('candidates-jobs')
export class CandidatesJobsController {
  constructor(private readonly candidatesJobsService: CandidatesJobsService) {}

  @Post()
  async addCandidate(
    @Body() createCandidatesJobDto: CreateCandidatesJobDto,
  ): Promise<CandidatesJob> {
    return await this.candidatesJobsService.addCandidateToJob(
      createCandidatesJobDto.candidateId,
      createCandidatesJobDto.jobId,
    );
  }
}

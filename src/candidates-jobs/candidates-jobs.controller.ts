import { Controller, Post, Body } from '@nestjs/common';
import { CandidatesJobsService } from './candidates-jobs.service';
import { CreateCandidatesJobDto } from './dto/create-candidates-job.dto';

@Controller('candidates-jobs')
export class CandidatesJobsController {
  constructor(private readonly candidatesJobsService: CandidatesJobsService) {}

  @Post()
  async addCandidate(@Body() createCandidatesJobDto: CreateCandidatesJobDto){
    return await this.candidatesJobsService.addCandidateToJob(createCandidatesJobDto.candidateId, createCandidatesJobDto.jobId)
  }
}
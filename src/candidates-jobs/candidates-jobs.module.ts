import { Module } from '@nestjs/common';
import { CandidatesJobsService } from './candidates-jobs.service';
import { CandidatesJobsController } from './candidates-jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatesJob } from './entities/candidates-job.entity';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Job } from 'src/jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidatesJob, Candidate, Job])],
  controllers: [CandidatesJobsController],
  providers: [CandidatesJobsService],
  exports: [CandidatesJobsService],
})
export class CandidatesJobsModule {}

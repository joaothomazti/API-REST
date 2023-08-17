import { Injectable } from '@nestjs/common';
import { Job } from 'src/jobs/entities/job.entity';
import { CandidatesJob } from './entities/candidates-job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from 'src/candidates/entities/candidate.entity';


@Injectable()
export class CandidatesJobsService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(CandidatesJob)
    private candidateJobRepository: Repository<CandidatesJob>
  ){}

  async addCandidateToJob(candidateId: number, jobId: number){
    const [candidate, job] = await Promise.all([
      this.candidateRepository.findOneOrFail({
        where: {id: candidateId},
      }),
      this.jobRepository.findOneOrFail({
        where: {id: jobId}
      })
    ]);  
    const candidateJob = await this.candidateJobRepository.create({
      candidateId,
      jobId
    })
    return await this.candidateJobRepository.save(candidateJob)
  }
}

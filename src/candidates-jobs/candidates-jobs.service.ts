import { Injectable, NotFoundException } from '@nestjs/common';
import { Job } from '../jobs/entities/job.entity';
import { CandidatesJob } from './entities/candidates-job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from '../candidates/entities/candidate.entity';
import { CreateCandidatesJobDto } from './dto/create-candidates-job.dto';

@Injectable()
export class CandidatesJobsService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(CandidatesJob)
    private candidateJobRepository: Repository<CandidatesJob>,
  ) {}

  async addCandidate(
    createCandidatesJobDto: CreateCandidatesJobDto,
  ): Promise<CandidatesJob> {
    try {
      const { candidateId, jobId } = createCandidatesJobDto;
      const [candidateExists, jobExists] = await Promise.all([
        this.candidateRepository.findOne({
          where: { id: candidateId },
        }),
        this.jobRepository.findOne({
          where: { id: jobId },
        }),
      ]);

      if (!candidateExists || !jobExists) {
        throw new NotFoundException('Candidate Not Found or Job Not Found');
      }
      const candidateJob = this.candidateJobRepository.create({
        candidateId,
        jobId,
      });
      return await this.candidateJobRepository.save(candidateJob);
    } catch (error) {
      throw error;
    }
  }
}

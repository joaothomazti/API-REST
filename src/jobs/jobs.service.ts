import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    return await this.jobsRepository.save(createJobDto);
  }

  async findAll(): Promise<Job[]> {
    return await this.jobsRepository.find();
  }

  async findOne(id: number): Promise<Job> {
    try {
      const findJob = await this.jobsRepository.findOne({ where: { id } });
      if (!findJob) throw new NotFoundException(`Job with ID ${id} not found`);
      return findJob;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    try {
      const existingJob = await this.jobsRepository.findOne({ where: { id } });
      if (!existingJob)
        throw new NotFoundException(`Job with ID ${id} not found`);
      this.jobsRepository.merge(existingJob, updateJobDto);
      await this.jobsRepository.save(existingJob);
      return existingJob;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const jobToDelete = await this.jobsRepository.delete(id);
      if (jobToDelete.affected === 0) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }

  async findByCompanyId(companyId: number): Promise<Job> {
    try {
      const existingCompany = await this.jobsRepository.findOne({
        where: { companyId },
      });
      if (!existingCompany) {
        throw new NotFoundException('No jobs for the provided Company Id');
      }
      return existingCompany;
    } catch (error) {
      throw error;
    }
  }
}

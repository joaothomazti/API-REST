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
    return this.jobsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const updateJob = await this.jobsRepository.findOne({ where: { id } });
    if (!updateJob) {
      throw new NotFoundException(`Job Not Found`);
    }
    await this.jobsRepository.update({ id: id }, updateJobDto);
    const updatedJob = await this.jobsRepository.findOne({ where: { id } });
    return updatedJob;
  }

  async remove(id: number) {
    const deleteJob = await this.jobsRepository.findOne({ where: { id } });
    if (!deleteJob) {
      throw new NotFoundException(`Job Not Found`);
    }
    await this.jobsRepository.delete(id);
  }

  async findByCompanyId(companyId: number): Promise<Job[]> {
    return this.jobsRepository.find({
      where: { companyId },
    });
  }
}

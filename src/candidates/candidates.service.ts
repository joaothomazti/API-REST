import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    try {
      const { email } = createCandidateDto;
      const emailExists = await this.candidateRepository.findOne({
        where: {
          email: email,
        },
      });

      if (emailExists) {
        throw new BadRequestException('email registered in system');
      }

      return this.candidateRepository.save(createCandidateDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Candidate[]> {
    return await this.candidateRepository.find();
  }

  async findOne(id: number): Promise<Candidate> {
    try {
      const findCandidate = await this.candidateRepository.findOne({
        where: { id },
      });
      if (!findCandidate) {
        throw new NotFoundException(`Candidate with ID ${id} not found`);
      }
      return findCandidate;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    try {
      const existingCandidate = await this.candidateRepository.findOne({
        where: { id },
      });
      if (!existingCandidate) {
        throw new NotFoundException(`Candidate with ID ${id} not found`);
      }
      this.candidateRepository.merge(existingCandidate, updateCandidateDto);
      await this.candidateRepository.save(existingCandidate);
      return existingCandidate;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const candidateToRemove = await this.candidateRepository.delete(id);
      if (candidateToRemove.affected === 0) {
        throw new NotFoundException(`Candidate with ID ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }
}

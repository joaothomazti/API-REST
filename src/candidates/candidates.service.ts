import { Injectable, BadGatewayException, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>
  ){}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const emailExists = await this.candidateRepository.findOne({where: {
      email: createCandidateDto.email
    }})

    if(emailExists){
      throw new BadGatewayException('email registered in system');
    }

    return this.candidateRepository.save(createCandidateDto)
  }

  async findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find();
  }

  async findOne(id: number): Promise<Candidate> {
    return this.candidateRepository.findOne({where: {id}})
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto): Promise<Candidate> {
    const updateCandidate = await this.candidateRepository.findOne({where: {id}})
      if(!updateCandidate) {
        throw new NotFoundException(`Candidate Not Found`)
      }
      await this.candidateRepository.update({id: +id}, updateCandidateDto)

      const updatedCandidate = await this.candidateRepository.findOne({where: {id}})
    return updatedCandidate
  }

  async remove(id: number) {
    const deleteCandidate = await this.candidateRepository.findOne({where: {id}})
    if(!deleteCandidate){
      throw new NotFoundException(`Candidate Not Found`)
    }
    await this.candidateRepository.delete(id)
  }
}

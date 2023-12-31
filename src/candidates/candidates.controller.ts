import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  async create(
    @Body() createCandidateDto: CreateCandidateDto,
  ): Promise<Candidate> {
    return this.candidatesService.create(createCandidateDto);
  }

  @Get()
  async findAll(): Promise<Candidate[]> {
    return this.candidatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Candidate> {
    return this.candidatesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    return this.candidatesService.update(id, updateCandidateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.candidatesService.remove(id);
  }
}

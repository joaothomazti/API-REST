import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companiesRepository.save(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    return this.companiesRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const updateCompany = await this.companiesRepository.findOne({
      where: { id },
    });
    if (!updateCompany) {
      throw new NotFoundException(`Company Not Found`);
    }
    await this.companiesRepository.update({ id: +id }, updateCompanyDto);
    const updatedCompany = await this.companiesRepository.findOne({
      where: { id },
    });
    return updatedCompany;
  }

  async remove(id: number) {
    const deleteCompany = await this.companiesRepository.findOne({
      where: { id },
    });
    if (!deleteCompany) {
      throw new NotFoundException(`Company Not Found`);
    }
    await this.companiesRepository.delete(id);
  }
}

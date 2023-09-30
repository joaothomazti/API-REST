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
    try {
      return await this.companiesRepository.save(createCompanyDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Company[]> {
    return await this.companiesRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    try {
      const findCompany = await this.companiesRepository.findOne({
        where: { id },
      });
      if (!findCompany) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }
      return findCompany;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    try {
      const existingComapny = await this.companiesRepository.findOne({
        where: { id },
      });
      if (!existingComapny) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }
      this.companiesRepository.merge(existingComapny, updateCompanyDto);
      await this.companiesRepository.save(existingComapny);
      return existingComapny;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const companyToRemove = await this.companiesRepository.delete(id);
    if (companyToRemove.affected === 0) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  }
}

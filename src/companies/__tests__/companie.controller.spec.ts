import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from '../companies.controller';
import { CompaniesService } from '../companies.service';
import { companieEntity } from '../__mocks__/companies.mock';
import { createCompanyMock } from '../__mocks__/createCompanie.mock';

describe('ComapnieController', () => {
  let controller: CompaniesController;
  let companieService: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            create: jest.fn().mockResolvedValue(companieEntity),
            findAll: jest.fn().mockResolvedValue([companieEntity]),
            findOne: jest.fn().mockResolvedValue([companieEntity]),
          },
        },
      ],
      controllers: [CompaniesController],
    }).compile();

    (controller = module.get<CompaniesController>(CompaniesController)),
      (companieService = module.get<CompaniesService>(CompaniesService));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(companieService).toBeDefined();
  });

  it('should return company Entity in createCompanyMock', async () => {
    const company = await controller.create(createCompanyMock);

    expect(company).toEqual(companieEntity);
  });

  it('should return ReturnCompany in findAll', async () => {
    const company = await controller.findAll();

    expect(company).toEqual([
      {
        id: companieEntity.id,
        name: companieEntity.name,
        bio: companieEntity.bio,
        email: companieEntity.email,
        website: companieEntity.website,
        createdAt: companieEntity.createdAt,
        updatedAt: companieEntity.updatedAt,
      },
    ]);
  });

  it('should return ReturnCompany in findOne', async () => {
    const company = await controller.findOne(companieEntity.id);

    expect(company).toEqual([
      {
        id: companieEntity.id,
        name: companieEntity.name,
        bio: companieEntity.bio,
        email: companieEntity.email,
        website: companieEntity.website,
        createdAt: companieEntity.createdAt,
        updatedAt: companieEntity.updatedAt,
      },
    ]);
  });
});

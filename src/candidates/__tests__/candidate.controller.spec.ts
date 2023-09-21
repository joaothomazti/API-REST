import { candidateEntity } from '../__mocks__/candidate.mock';
import { createCandidateMock } from '../__mocks__/createCandidate.mock';
import { CandidatesController } from '../candidates.controller';
import { CandidatesService } from '../candidates.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CandidateController', () => {
  let controller: CandidatesController;
  let candidateService: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CandidatesService,
          useValue: {
            create: jest.fn().mockResolvedValue(candidateEntity),
            findOne: jest.fn().mockResolvedValue(candidateEntity),
            findAll: jest.fn().mockResolvedValue([candidateEntity]),
          },
        },
      ],
      controllers: [CandidatesController],
    }).compile();
    controller = module.get<CandidatesController>(CandidatesController);
    candidateService = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(candidateService).toBeDefined();
  });

  it('should return candidate Entity in createCandidate', async () => {
    const candidate = await controller.create(createCandidateMock);

    expect(candidate).toEqual(candidateEntity);
  });

  it('should return ReturnUser in findAll', async () => {
    const candidate = await controller.findAll();
    expect(candidate).toEqual([
      {
        id: candidateEntity.id,
        name: candidateEntity.name,
        email: candidateEntity.email,
        phone: candidateEntity.phone,
        bio: candidateEntity.bio,
        open_to_work: candidateEntity.open_to_work,
        createdAt: candidateEntity.createdAt,
        updatedAt: candidateEntity.updatedAt,
      },
    ]);
  });
});

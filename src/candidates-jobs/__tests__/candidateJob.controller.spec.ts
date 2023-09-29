import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesJobsController } from '../candidates-jobs.controller';
import { CandidatesJobsService } from '../candidates-jobs.service';
import { candidateJobEntity } from '../__mocks__/candidate_job.mock';
import { createCandidateJobMock } from '../__mocks__/create_candidate_job.mock';

describe('CandidateJobController', () => {
  let controller: CandidatesJobsController;
  let candidateJobService: CandidatesJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CandidatesJobsService,
          useValue: {
            addCandidate: jest.fn().mockResolvedValue(candidateJobEntity),
          },
        },
      ],
      controllers: [CandidatesJobsController],
    }).compile();
    controller = module.get<CandidatesJobsController>(CandidatesJobsController);
    candidateJobService = module.get<CandidatesJobsService>(
      CandidatesJobsService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(candidateJobService).toBeDefined();
  });

  it('should return candidateJob Entity in createCandidateJob', async () => {
    const candidateJob = await controller.addCandidate(createCandidateJobMock);

    expect(candidateJob).toEqual(candidateJobEntity);
  });
});

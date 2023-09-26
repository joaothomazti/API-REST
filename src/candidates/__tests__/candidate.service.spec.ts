import { Repository } from "typeorm";
import { CandidatesService } from "../candidates.service"
import { Candidate } from "../entities/candidate.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { candidateEntity } from "../__mocks__/candidate.mock";


describe('CandidateService', () => {
    let service: CandidatesService;
    let CandidateRepository: Repository<Candidate>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CandidatesService,
                {
                    provide: getRepositoryToken(Candidate),
                    useValue: {
                        findAll: jest.fn().mockResolvedValue(candidateEntity),
                        findOne: jest.fn().mockResolvedValue([candidateEntity]),
                    }
                }
            ]
        }).compile()

        service = module.get<CandidatesService>(CandidatesService);
        CandidateRepository = module.get<Repository<Candidate>>(
            getRepositoryToken(Candidate)
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(CandidateRepository).toBeDefined();
    });
})
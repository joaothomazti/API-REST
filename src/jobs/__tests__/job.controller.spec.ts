import { Test, TestingModule } from "@nestjs/testing";
import { JobsController } from "../jobs.controller"
import { JobsService } from "../jobs.service"
import { jobEntity } from "../__mocks__/jobs.mock";
import { createJobMock } from "../__mocks__/createJob.mock";

describe('JobController', () => {
    let controller: JobsController;
    let jobService: JobsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers:[
               {
                provide: JobsService,
                useValue: {
                    create: jest.fn().mockResolvedValue(jobEntity),
                    findOne: jest.fn().mockResolvedValue(jobEntity),
                    findAll: jest.fn().mockResolvedValue(jobEntity)
                }
               }
            ],
            controllers: [JobsController]
        }).compile()

        controller = module.get<JobsController>(JobsController);
        jobService = module.get<JobsService>(JobsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(jobService).toBeDefined(); 
    });

    it('should return Job Entity in CreateJobEntity', async () => {
        const job = await controller.create(createJobMock)

        expect(job).toEqual(jobEntity)
    });

    it('should return returnJob in findAll', async () => {
        const job = await controller.findAll()

        expect(job).toEqual(jobEntity)
    });

    it('should return ReturnJob in findOne', async () => {
        const job = await controller.findOne(jobEntity.id)

        expect(job).toEqual(jobEntity)
    })
})
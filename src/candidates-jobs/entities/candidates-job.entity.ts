import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';
import { Candidate } from '../../candidates/entities/candidate.entity';

@Entity()
export class CandidatesJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  candidateId: number;

  @Column()
  jobId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Candidate, (candidate) => candidate.jobs)
  candidates?: Candidate[];

  @ManyToMany(() => Job, (job) => job.candidates)
  jobs?: Job[];
}

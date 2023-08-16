import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from '../../companies/entities/company.entity'

@Entity({name: 'jobs'})
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @Column()
    companyId: number;
    @ManyToOne(() => Company, (company) => company.jobs)
    company: Company
}

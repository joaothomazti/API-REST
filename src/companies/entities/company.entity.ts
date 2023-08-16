import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Job } from '../../jobs/entities/job.entity'

@Entity({name: 'companies'})
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    bio: string;

    @Column({nullable: true})
    website: string;

    @Column({nullable: true})
    email: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @OneToMany(() => Job, (job) => job.company)
    jobs: Job[]
}

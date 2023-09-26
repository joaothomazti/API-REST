import { Company } from "../entities/company.entity";

export const companieEntity: Company = {
    id: 123,
    name: 'new companie',
    bio: 'bio',
    email: 'newcompanie@test.com',
    website: 'companie.com',
    createdAt: new Date(),
    updatedAt: new Date()
}
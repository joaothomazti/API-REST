import { Module } from '@nestjs/common';
import { CandidatesModule } from './candidates/candidates.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';
import 'dotenv/config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true
    }),
    CandidatesModule,
    CompaniesModule,
    JobsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

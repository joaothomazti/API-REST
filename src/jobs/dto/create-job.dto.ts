import { IsString, IsNotEmpty } from "class-validator";

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    companyId: number;
}

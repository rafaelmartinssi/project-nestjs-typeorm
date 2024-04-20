import { IsString } from 'class-validator';

export class UpdateCourseDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  tags: string[];
}

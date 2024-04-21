import { DataSource } from 'typeorm';
import { dataSourseOptions } from './database.module';
import { CreateCoursesTable1713655928780 } from 'src/migrations/1713655928780-CreateCoursesTable';
import { CreateTagsTable1713657415186 } from 'src/migrations/1713657415186-CreateTagsTable';

export const dataSourse = new DataSource({
  ...dataSourseOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1713655928780, CreateTagsTable1713657415186],
});

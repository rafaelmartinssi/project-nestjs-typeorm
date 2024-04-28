import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCoursesTable1713655928780 } from 'src/migrations/1713655928780-CreateCoursesTable';
import { CreateTagsTable1713657415186 } from 'src/migrations/1713657415186-CreateTagsTable';
import { CreateCoursesTagsTable1713724583823 } from 'src/migrations/1713724583823-CreateCoursesTagsTable';
import { Course } from 'src/courses/entities/course';
import { Tag } from 'src/courses/entities/tag';

export const dataSourseOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

export const dataSourse = new DataSource({
  ...dataSourseOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1713655928780,
    CreateTagsTable1713657415186,
    CreateCoursesTagsTable1713724583823,
  ],
});

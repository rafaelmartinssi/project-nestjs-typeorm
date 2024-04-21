import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course';
import { Tag } from 'src/courses/entities/tag';

export const dataSourseOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'devtraining',
  entities: [Course, Tag],
  synchronize: false,
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourseOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}

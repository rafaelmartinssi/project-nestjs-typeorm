import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCoursesTagsTable1713724583823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses_tags_tags',
        columns: [
          {
            name: 'coursesId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'tagsId',
            type: 'int',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'courses',
            referencedColumnNames: ['id'],
            columnNames: ['coursesId'],
          },
          {
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            columnNames: ['tagsId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('courses_tags_tags');
  }
}

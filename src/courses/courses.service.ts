import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './course';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Fundamentos sobre nestjs',
      tags: ['Typescript', 'Javascript', 'Node'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => course.id === id);
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
    return createCourseDTO;
  }

  update(id: number, updateCourseDTO: any) {
    let course = this.courses.find((course) => course.id === id);

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const index = this.courses.findIndex((course) => course.id === id);
    course = {
      id,
      ...updateCourseDTO,
    };
    this.courses[index] = course;

    return course;
  }

  remove(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}

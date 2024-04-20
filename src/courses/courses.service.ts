import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCourseDTO } from './dto/UpdateCourseDTO';
import { CreateCourseDTO } from './dto/CreateCourseDTO';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const course = this.courseRepository.create(createCourseDTO);
    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO) {
    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.remove(course);
  }
}

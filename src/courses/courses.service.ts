import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCourseDTO } from './dto/UpdateCourseDTO';
import { CreateCourseDTO } from './dto/CreateCourseDTO';
import { Tag } from './entities/tag';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((tag) => this.preloadTagByName(tag)),
    );
    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });
    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO) {
    const tags = await Promise.all(
      updateCourseDTO.tags.map((tag) => this.preloadTagByName(tag)),
    );
    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      tags,
      id,
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { name },
    });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({
      name,
    });
  }
}

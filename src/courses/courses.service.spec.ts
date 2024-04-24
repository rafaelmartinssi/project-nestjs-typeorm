import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/CreateCourseDTO';

describe('CoursesService', () => {
  let service: CoursesService;
  let id: number;
  let createdAt: Date;
  let updatedAt: Date;
  let expectOutputTags: any;
  let expectOutputCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = 1;
    createdAt = new Date();
    updatedAt = new Date();
    expectOutputTags = [
      {
        id,
        name: 'Nestjs',
        createdAt,
        updatedAt,
      },
    ];
    expectOutputCourses = {
      id,
      name: 'Nestjs',
      description: 'Fundamentos Nestjs',
      tags: expectOutputTags,
      createdAt,
      updatedAt,
    };

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    };

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    service['courseRepository'] = mockCourseRepository;
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDTO = {
      name: 'Nestjs',
      description: 'Fundamentos Nestjs',
      tags: ['Nestjs'],
    };

    const newCourse = await service.create(createCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse);
  });

  it('should list all courses', async () => {
    service['courseRepository'] = mockCourseRepository;

    const courses = await service.findAll();

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courses);
  });

  it('should get course by id', async () => {
    service['courseRepository'] = mockCourseRepository;

    const course = await service.findOne(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });

  it('should update a course', async () => {
    service['courseRepository'] = mockCourseRepository;
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDTO = {
      name: 'Nestjs',
      description: 'Fundamentos Nestjs',
      tags: ['Nestjs'],
    };

    const course = await service.update(id, createCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(mockCourseRepository.preload).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });

  it('should remove course by id', async () => {
    service['courseRepository'] = mockCourseRepository;

    const course = await service.remove(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });
});

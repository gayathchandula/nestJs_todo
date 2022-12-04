import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { TodoDocument } from './schemas/todo.schema';
import { TodoService } from './todo.service';

// const mockTask = (title = 'check todo', description = 'testt tasks'): Task => ({
//   title,
//   description,
// });

const mockTask= {
  title: 'check todo',
  description: 'test tasks',
}

describe('TodoService', () => {
  let service: TodoService;
  let model: Model<TodoDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, { provide: getModelToken('Todo'), useValue: { find: jest.fn(), findOne: jest.fn(), update: jest.fn(), create: jest.fn() } }],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<TodoDocument>>(getModelToken('Todo'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all tasks', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockTask),
    } as any);
    const tasks = await service.findAll();
    expect(tasks).toEqual(mockTask);
  });
});

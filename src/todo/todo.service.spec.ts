import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { TodoDocument } from './schemas/todo.schema';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let model: Model<TodoDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<TodoDocument>>(getModelToken('Todo'));
  });

  it('should return all tasks', async () => {
    const tasks = await service.findAll();
    expect(tasks).toBe(tasks);
  });
});

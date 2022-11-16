import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Response } from 'express';
import { CreateTodoDto } from './dto/create-todo.dto';
import { HttpCode } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoDocument } from './schemas/todo.schema';
import { Model } from 'mongoose';

const testTask1 = 'Test Task 1';
const testDescription1 = 'Test Description 1';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;
  let todoModel: Model<TodoDocument>;

  const statusResponseMock = {
    send: jest.fn(x => x),
  };
  const responseMock = {
    status: jest.fn(x => statusResponseMock),
    send: jest.fn(x => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { title: 'testTask', description: 'testDescription' },
              { title: 'testTask1', description: 'testDescription1' },
            ]),
            create: jest.fn().mockImplementation((createTodoDto: CreateTodoDto) => Promise.resolve({ id: 'uuid', ...createTodoDto })),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                title: testTask1,
                description: testDescription1,
                _id: '1',
              }),
            ),
            update: jest.fn().mockImplementation((id: string, updateTodoDto: UpdateTodoDto) => Promise.resolve({ _id: '1', ...updateTodoDto })),
            delete: jest.fn().mockImplementation((id: string) => Promise.resolve(`Task ${id} is deleted`)),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  describe('getTasks', () => {
    it('should return All tasks', async () => {
      return expect(todoController.index()).resolves.toEqual([
        {
          title: 'testTask',
          description: 'testDescription',
        },
        {
          title: 'testTask1',
          description: 'testDescription1',
        },
      ]);
    });

    // it("should return 400 error", async () => {
    //   return expect(todoController.index()).resolves.toEqual(400);
    // });
  });
  describe('getById', () => {
    it('should get a single task', () => {
      expect(todoController.find('1')).resolves.toEqual({
        title: testTask1,
        description: testDescription1,
        _id: '1',
      });
    });
  });
  describe('newTask', () => {
    it('should create a new task', () => {
      const createTodoDto: CreateTodoDto = {
        title: 'new test task',
        description: 'task2',
      };
      expect(todoController.create(createTodoDto)).resolves.toEqual({ id: 'uuid', ...createTodoDto });
    });
  });
  describe('updateTask', () => {
    it('should update a new cat', () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'New Task 1',
        description: 'New Description 1',
        completedAt: new Date(),
      };
      expect(todoController.update('1', updateTodoDto)).resolves.toEqual({
        _id: '1',
        ...updateTodoDto,
      });
    });
  });

  describe('deleteTask', () => {
    it('should return that it deleted a task', () => {
      expect(todoController.delete('a uuid that exists')).resolves.toEqual(`Task ${'a uuid that exists'} is deleted`);
    });
  });
});

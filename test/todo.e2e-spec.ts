import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';

describe('E2E Tests for TODO Endpoints', () => {
  let app: INestApplication;
  var id;
  beforeEach(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a task', async () => {
    const task: CreateTodoDto = {
      title: 'Test task',
      description: 'Test task Description',
    };
    const response = await request(app.getHttpServer()).post('/todos').set('Accept', 'application/json').send(task);
    id = response.body._id;
    expect(HttpStatus.CREATED);
  });


  it('should get all tasks', async () => {
    return await request(app.getHttpServer()).get('/todos').set('Accept', 'application/json').expect(HttpStatus.OK);
  });

  it('should get a task', async () => {
    return await request(app.getHttpServer()).get(`/todos/${id}`).expect(HttpStatus.OK);
  });

  it('should update a task', async () => {
    const task: UpdateTodoDto = {
      title: 'Test Updated task',
      description: 'Test task Updated Description',
      completedAt: new Date(),
    };
    return await request(app.getHttpServer()).put(`/todos/${id}`).set('Accept', 'application/json').send(task).expect(HttpStatus.OK);
  });

  it('should delete a task', async () => {
    return await request(app.getHttpServer()).delete(`/todos/${id}`).set('Accept', 'application/json').expect(HttpStatus.OK);
  });

});

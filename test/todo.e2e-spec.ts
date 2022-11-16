import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';

describe('E2E Tests for TODO Endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a task', () => {
    const task: CreateTodoDto = {
      title: 'Test task',
      description: 'Test task Description',
    };
    return request(app.getHttpServer())
      .post('/todos')
      .set('Accept', 'application/json')
      .send(task)
      .expect(HttpStatus.CREATED);
  });

  it('should update a task', () => {
    const task: UpdateTodoDto = {
      title: 'Test Updated task',
      description: 'Test task Updated Description',
      completedAt: new Date(),
      };
    
    return request(app.getHttpServer())
      .put('/todos/63720328727c735eb68845fe')
      .set('Accept', 'application/json')
      .send(task)
      .expect(HttpStatus.OK);
  });

  it('should get all tasks', () => {
    return request(app.getHttpServer())
      .get('/todos')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });

  it('should get a task', () => {
    return request(app.getHttpServer())
      .get('/todos/63720328727c735eb68845fe')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });
  it('should delete a task', () => {
    return request(app.getHttpServer())
      .delete('/todos/63720328727c735eb68845fe')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });
});
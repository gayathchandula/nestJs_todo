import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, NotFoundException, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@ApiTags('todo')
@Controller('todos')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(@Body() createTodoDto: CreateTodoDto) {
    const data = await this.service.create(createTodoDto);
    return data;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'The data were returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async index() {
    const data = await this.service.findAll();
    if (!data) {
      throw new NotFoundException('No Task found.');
    }
    return data;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'The data were returned successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async find(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    if (!data) {
      throw new NotFoundException('No Task found.');
    }
    return data;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Updated Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async update( @Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const data = await this.service.update(id, updateTodoDto);
    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'The data were successfully deleted' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return `Task ${id} is deleted`;
  }
}

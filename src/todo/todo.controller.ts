import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@ApiTags('todo')
@Controller('todos')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(@Res() res: Response, @Body() createTodoDto: CreateTodoDto) {
    await this.service.create(createTodoDto);
    res.status(HttpStatus.CREATED).send(`Task is created`);
  }

  @Get()
  @ApiOkResponse({ description: 'The data were returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async index(@Res() res: Response) {
    const data = await this.service.findAll();
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The data were returned successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async find(@Res() res: Response, @Param('id') id: string) {
    const data = await this.service.findOne(id);
    res.status(HttpStatus.OK).json(data);
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'Updated Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const data = await this.service.update(id, updateTodoDto);
    res.status(HttpStatus.OK).json(data);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The data were successfully deleted' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async delete(@Res() res: Response, @Param('id') id: string) {
    await this.service.delete(id);
    res.status(HttpStatus.OK).json(`Task ${id} is deleted`);
  }
}

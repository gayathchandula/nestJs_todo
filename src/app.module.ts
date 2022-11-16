import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot(
      'mongodb+srv://gayath:Gayya@cluster0.cxze7.mongodb.net/?retryWrites=true&w=majority',
    ),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './Schemas/user.schema';



@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

      async findOne(username: string): Promise<User> {
        return await this.model.findOne({username:username}).exec();
      }

}

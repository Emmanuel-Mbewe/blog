import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ){}

    //Adding the users to the database
  async createUser(user: User): Promise<User> {
      //hashing the password
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      return await this.usersRepository.save(user);
    }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(user_id: number) {
    return this.usersRepository.findOneBy({user_id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.save(updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}

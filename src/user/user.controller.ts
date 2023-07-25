import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/auth/user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  findCurrentUser(@Users() {user_name}: User){
    return this.userService.findByUsername(user_name);
  }
}

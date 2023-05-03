import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // 모든 유저 조회
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
  // id 일치 유저 조회
  @Get(`:id`)
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error('User not Found!');
    }
    return user;
  }
  // 유저 생성
  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }
  // 유저 수정
  @Put(`:id`)
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }
  // 유저 삭제
  @Delete(':id')
  async delete(@Param(`id`) id: number): Promise<void> {
    // 유저가 없을때 에러 핸들링
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error('User not Found!');
    }

    // 위에서 만들어진 findOne에서 이미 에러핸들링을 하고 있기에 해당 메서드를 호출하여 자동으로 유저가 없을시 에러핸들링이 되게끔 한다.
    // const user = await this.findOne(id);

    // return this.userService.delete(user.id);
    return this.userService.delete(id);
  }
}

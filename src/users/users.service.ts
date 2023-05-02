import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // 모든 유저 조회
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  // id 일치 유저 조회
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
  // 유저 생성
  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  // 유저 수정
  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({ where: { id } });
  }

  // 유저 삭제
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

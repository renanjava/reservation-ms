import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['reservations'],
    });
  }

  findAll() {
    return this.userRepository.find({ relations: ['reservations'] });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}

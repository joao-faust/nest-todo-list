import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    if (await this.getByEmail(dto.email)) {
      throw new BadRequestException('E-mail is already taken');
    }

    const hashed = await hash(dto.password, 10);
    const newUser = this.usersRepository.create({ ...dto, password: hashed });
    return await this.usersRepository.save(newUser);
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}

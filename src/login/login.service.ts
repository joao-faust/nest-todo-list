import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { LoginDto } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createAccessToken(dto: LoginDto) {
    const user = await this.usersService.getByEmail(dto.email);

    if (!user || !(await compare(dto.password, user.password))) {
      throw new BadRequestException('Credentials are invalid');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
    });

    return { accessToken };
  }
}

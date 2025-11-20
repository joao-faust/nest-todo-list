import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { LoginService } from './login.service';
import { LoginDto } from './login.dto';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async createAccessToken(@Body(new ValidationPipe()) dto: LoginDto) {
    return await this.loginService.createAccessToken(dto);
  }
}

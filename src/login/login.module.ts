import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JWT_SECRET } from 'src/lib/env';

@Module({
  imports: [
    UsersModule,

    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}

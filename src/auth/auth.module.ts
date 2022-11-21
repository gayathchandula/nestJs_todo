import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LoginController } from './login/login.controller';

@Module({
  imports: [UsersModule,PassportModule],
  providers: [AuthService,LocalStrategy],
  controllers: [LoginController]
})
export class AuthModule {}

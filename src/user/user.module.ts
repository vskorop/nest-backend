import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DrizzleService } from 'src/db';

@Module({
  providers: [UserService, DrizzleService],
  controllers: [UserController]
})
export class UserModule { }

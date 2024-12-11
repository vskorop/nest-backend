import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserController } from './user/user.controller';
import { DrizzleService } from './db';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    DrizzleModule
  ],
  controllers: [UserController],
  providers: [DrizzleService, UserService],
})
export class AppModule { }
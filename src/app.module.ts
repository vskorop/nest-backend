import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserController } from './user/user.controller';
import { DrizzleService } from './db';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    DrizzleModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [DrizzleService, UserService],
})
export class AppModule { }
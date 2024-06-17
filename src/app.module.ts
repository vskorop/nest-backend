import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, ChatModule, OrderModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
